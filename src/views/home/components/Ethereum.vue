<template>
    <div @keyup.enter="ethereumSubmit">
        <el-form @submit.prevent.native :model="form" :rules="rulesEthereum" ref="recForm">
            <div class="bold big-title">Your token hold wallet</div>
            <el-form-item
                prop="withDrawAddress">
                <slot name="label"><div class="uppercase label">Please enter your recipient address:</div></slot>
                <el-input autofocus="true" class="receipter" placeholder="Please enter recipient address" v-model="form.withDrawAddress"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="info-tooltip">
                    <span class="uppercase bold">Attention</span> Be aware that you send BTC to correct address with correct
                    fees amount to quickest execution
                </div>
            </el-form-item>
            <el-button
                :loading="loading"
                class="button" type="primary"
                @click="ethereumSubmit('recForm')">
                Get tokens to this address
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { path } from 'ramda'
import { mapState } from 'vuex'
import { isAddress } from 'ethereum-address'
import { prepareValidateErrors } from '../../../helpers/general'
import { SET_ACTIVE_TAB, SET_STEP } from '../../../store/modules/general/mutation-types'

import { SET_FORM_DATA } from '../../../store/modules/forms/mutation-types'
import { PERFORM_BUYING_MUTATION } from '../../../graphql/airpay/mutations'
import { SET_AIRPAY_DATA } from '../../../store/modules/airpay/mutation-types'

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
        withDrawAddress: ''
      },
      rulesEthereum: {
        withDrawAddress: [{ validator: checkEthereum, trigger: 'blur' }]
      }
    }
  },
  methods: {
    ethereumSubmit (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.$store.commit(`forms/${SET_FORM_DATA}`, {
            ...this.$store.state.forms,
            recipientForm: this.form
          })
          this.$apollo.mutate({
            mutation: PERFORM_BUYING_MUTATION,
            variables: {
              amount: path(['byTokenForm', 'pledge'], this.forms),
              asset: path(['byTokenForm', 'currency'], this.forms),
              withdrawAddress: path(['recipientForm', 'withDrawAddress'], this.forms),
              crowdsale: path(['query', 'crowdsale'], this.route)
            }
          }).then(response => {
            let data = path(['data', 'buyTokens'], response)
            this.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
              ...this.$store.state.airpay,
              byTokenData: data
            })
            this.$store.commit(SET_STEP, 3)
            this.$store.commit(SET_ACTIVE_TAB, 'VDeposit')
            this.loading = false
          }).catch(response => {
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
    }
  },
  computed: {
    ...mapState([
      'airpay',
      'forms',
      'route'
    ])
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
