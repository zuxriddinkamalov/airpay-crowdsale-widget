<template>
    <div @keyup.enter="submit">
        <div class="info-tooltip">
            <VTextSlider :data='sliderText' :interval="3" :timer="2" :infinite="true" filter="bottom-top" />
        </div>
        <el-form @submit.prevent.native ref="buyTokenForm" :rules="rulesByToken" :model="form">
            <el-form-item class="pledge input-with-button"
              prop="pledge">
                <slot name="label"><div class="uppercase label">You pladge</div></slot>
                <el-input min="1" type="number" v-model="form.pledge">
                    <el-select class="currency" v-model="form.currency" slot="append">
                        <el-option label="BTC" value="btc"></el-option>
                        <el-option label="ETH" value="eth"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item class="pledge-sum">
                <el-row>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase label">You get</div></slot>
                        <h3 class="bold">
                            <span class="summ">{{getSumm($R.path(['settings', 'rate'], airpay))}}</span>
                            &nbsp;<span class="uppercase">{{$R.path(['settings', 'name'], airpay)}}</span>
                        </h3>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase gray label">Bonuses</div></slot>
                        <h3>
                            <span class="bold">+{{$R.path(['settings', 'bonus'], airpay)}}%</span>
                            <!--&nbsp;<span class="period uppercase">Ends in 21 days</span>-->
                        </h3>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item
              class="email"
              prop="email">
                <slot name="label"><div class="uppercase label">Please enter your email</div></slot>
                <el-input placeholder="Please enter email" type="email" v-model="form.email"></el-input>
            </el-form-item>

            <div v-if="!$R.prop('hash', airpay)" class="">
                <el-button
                    :disabled="loading"
                    class="button" type="primary"
                    @click="buyTokens('buyTokenForm')">
                    Buy tokens
                </el-button>
            </div>
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
                    <el-input placeholder="Verification code" v-model="form.code">
                        <el-button
                           @click="buyTokens('buyTokenForm')"
                           class="input-button"
                           slot="append"
                           type="text">Resend</el-button>
                    </el-input>
                </el-form-item>
                <el-button
                    :disabled="loading"
                    class="button" type="primary"
                    @click="verificate('verificateForm')">
                    Buy tokens
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { prop, path, map } from 'ramda'
import { mapState } from 'vuex'

import VTextSlider from '@/components/TextSlider'
import { BY_TOKENS_MUTATION, PERFORM_BUYING_MUTATION } from '../../../graphql/airpay/mutations'
import { SET_AIRPAY_DATA } from '../../../store/modules/airpay/mutation-types'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'
import { prepareValidateErrors } from '../../../helpers/general'

const SLIDER = [
  {
    flag: 'images/flag-usa.png',
    country: 'USA',
    sum: 3.45,
    currency: 'ETH'
  },
  {
    flag: 'images/flag-usa.png',
    country: 'England',
    sum: 2.34,
    currency: 'BTC'
  },
  {
    flag: 'images/flag-usa.png',
    country: 'Brazil',
    sum: 45.4,
    currency: 'ETH'
  },
  {
    flag: 'images/flag-usa.png',
    country: 'France',
    sum: 4.9,
    currency: 'BTC'
  }
]

export default {
  name: 'ByTokens',
  data: function () {
    let checkZero = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Amount is required'))
      } else if (value < 1) {
        callback(new Error('Amount can not be less then one'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      sliderText: map(item =>
        `<img class="flag" src="${item.flag}" alt="" />
        User from <span class="bold">${item.country}</span> pledge <span class="bold">${item.sum} ${item.currency}</span>`
        , SLIDER),
      form: {
        pledge: null,
        email: '',
        verificationCode: '',
        currency: 'btc',
        hash: ''
      },
      rulesByToken: {
        pledge: [
          { validator: checkZero, message: 'Amount can not be less then one', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Email required', trigger: 'blur' },
          { type: 'email', message: 'Please enter valid email', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // console.warn(this.$store.state)
  },
  methods: {
    getSumm: function (rate) {
      let price = parseFloat(prop('pledge', this.form)) * rate
      if (price) {
        let val = (price).toFixed(0)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return '0'
    },
    submit: function () {
      if (prop('hash', this.airpay)) {
        this.verificate('verificateForm')
      } else {
        this.buyTokens('buyTokenForm')
      }
    },
    buyTokens (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.$apollo.mutate({
            mutation: BY_TOKENS_MUTATION,
            variables: {
              email: this.form.email
            }
          }).then(response => {
            this.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
              ...this.$store.state.airpay,
              hash: path(['data', 'enter'], response)
            })
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
    },
    verificate (formName) {
      let self = this
      let enter = new Promise(function (resolve, reject) {
        self.$refs['buyTokenForm'].validate(
          (valid, error) => {
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
          }
        )
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
        self.$apollo.mutate({
          mutation: PERFORM_BUYING_MUTATION,
          variables: {
            hash: prop('hash', self.airpay),
            code: '1111',
            amount: self.form.pledge,
            currency: self.form.currency
          }
        }).then(response => {
          let data = path(['data', 'buyTokens'], response)
          self.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
            ...self.$store.state.airpay,
            byTokenData: data
          })
          sessionStorage.setItem('token', prop('authorization', data))
          self.$store.commit(SET_GENERAL_DATA, 'VDeposit')
          self.loading = false
        }).catch(response => {
          self.loading = false
        })
      })
    }
  },
  computed: {
    ...mapState([
      'airpay'
    ])
  },
  components: {
    VTextSlider
  }
}
</script>

<style lang="sass">
    $BASE_COLOR: #565656
    .flag
        max-width: 20px
        margin-right: 10px
        vertical-align: middle
    .text-slider-root
        min-height: 23px
    .pledge
        & input, .currency
            font-weight: 600
            color: #313131
    .pledge, .verification, .email
        .currency
            width: 90px
    .pledge-sum
        color: #313131
        word-break: break-word
        & h3, .summ
            color: #000
            line-height: 1
            letter-spacing: 2px
            font-size: 22px
        .period
            vertical-align: middle
            font-size: 11px
            padding: 5px
            border: 1px solid #CDD6E9
            color: #CDD6E9
</style>
