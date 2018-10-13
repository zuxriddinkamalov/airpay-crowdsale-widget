<template>
    <div @keyup.enter="submit">
        <el-form @submit.prevent.native :model="form" :rules="rulesEthereum" ref="recForm">
            <!--
            0xBff22763a7D6e15Bd744422bb00961683F771595
            -->
            <el-form-item
                prop="withDrawAddress">
                <slot name="label"><div class="uppercase label">Please enter your recipient address:</div></slot>
                <el-input class="receipter" placeholder="Please enter recipient address" v-model="form.withDrawAddress"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="info-tooltip">
                    <span class="uppercase bold">Attention</span> Be aware that you send BTC to correct address with correct
                    fees amount to quickest execution
                </div>
            </el-form-item>
            <el-form-item
                class="email"
                prop="email">
                <slot name="label"><div class="uppercase label">Please enter your email</div></slot>
                <el-input placeholder="Please enter email" type="email" v-model="form.email"></el-input>
            </el-form-item>
            <el-button
                v-if="!$R.prop('hash', airpay)"
                :disabled="loading"
                class="button" type="primary"
                @click="enterToSystem('recForm')">
                Proceed
            </el-button>
        </el-form>
        <div v-if="$R.prop('hash', airpay)" class="verification">
            <el-form @submit.prevent.native ref="verificateForm" :model="form">
                <el-form-item
                    class="code input-with-button"
                    prop="code"
                    :rules="[
                    { required: true, message: 'Please enter verification code 4 digits', trigger: 'blur' },
                ]">
                    <slot name="label">
                        <div class="uppercase label">Check your email and enter code</div>
                    </slot>
                    <el-input pattern="\d*" type="number" placeholder="Verification code" v-model="form.code">
                        <el-button
                            @click="enterToSystem('recForm')"
                            class="input-button"
                            slot="append"
                            type="text">Resend</el-button>
                    </el-input>
                </el-form-item>
                <el-button
                    :disabled="loading"
                    class="button" type="primary"
                    @click="verificate('verificateForm')">
                    Authorization
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { path, prop } from 'ramda'
import { isAddress } from 'ethereum-address'
import { prepareValidateErrors } from '../../../helpers/general'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'
import {
  AUTHORIZATION_MUTATION,
  ENTER_MUTATION
} from '../../../graphql/airpay/mutations'
import { SET_AIRPAY_DATA } from '../../../store/modules/airpay/mutation-types'
import { SET_FORM_DATA } from '../../../store/modules/forms/mutation-types'

export default {
  name: 'Ethereum',
  data: function () {
    let checkEthereum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Ethereum address required'))
      } else if (!isAddress(value)) {
        callback(new Error('Please enter valid ethereum address'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        withDrawAddress: '',
        email: '',
        code: ''
      },
      rulesEthereum: {
        withDrawAddress: [{ validator: checkEthereum, trigger: 'blur' }],
        email: [
          { required: true, message: 'Email required', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please enter valid email',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      if (prop('hash', this.airpay)) {
        this.verificate('verificateForm')
      } else {
        this.enterToSystem('recForm')
      }
    },
    enterToSystem (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.$apollo
            .mutate({
              mutation: ENTER_MUTATION,
              variables: {
                email: this.form.email,
                businessId: this.$store.state.airpay.settings.businessId
              }
            })
            .then(response => {
              this.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
                ...this.$store.state.airpay,
                hash: path(['data', 'enter'], response)
              })
              this.loading = false
            })
            .catch(response => {
              this.$message.error(response)
              this.loading = false
            })
        } else {
          let message = prepareValidateErrors(error)
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: message
          })
          return false
        }
      })
    },
    verificate (formName) {
      let self = this
      let enter = new Promise(function (resolve, reject) {
        self.$refs['recForm'].validate((valid, error) => {
          if (valid) {
            resolve()
          } else {
            let message = prepareValidateErrors(error)
            self.$message({
              dangerouslyUseHTMLString: true,
              type: 'error',
              message: message
            })
          }
        })
      })
      let verification = new Promise(function (resolve, reject) {
        self.$refs[formName].validate((valid, error) => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([enter, verification]).then(function () {
        self.loading = true
        self.$apollo
          .mutate({
            mutation: AUTHORIZATION_MUTATION,
            variables: {
              hash: prop('hash', self.airpay),
              code: prop('code', self.form)
            }
          })
          .then(response => {
            let data = path(['data', 'auth'], response)
            sessionStorage.setItem('token', prop('authorization', data))
            self.$store.commit(`forms/${SET_FORM_DATA}`, {
              ...self.$store.state.forms,
              recipientForm: self.form
            })
            self.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
              ...self.$store.state.airpay,
              authData: data
            })
            self.$store.commit(SET_GENERAL_DATA, 'VAgree')
            self.loading = false
          })
          .catch(response => {
            self.loading = false
          })
      })
    }
  },
  computed: {
    ...mapState(['airpay'])
  }
}
</script>

<style lang="sass" scoped>
    .eth-address
        font-size: 20px
        color: #000
        margin-bottom: 5px
    .receipter
        color: #888888
</style>
