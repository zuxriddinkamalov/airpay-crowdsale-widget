<template>
    <div @keyup.enter="submit('buyTokenForm')">
        <div class="info-tooltip tooltip-slider">
            <vue-swimlane
                :scale="0.5"
                :transitionDelay="2000"
                :circular="true"
                :words="sliderText"></vue-swimlane>
        </div>
        <el-form :validateOnRuleChange="false" @submit.prevent.native ref="buyTokenForm" :rules="rulesByToken" :model="form">
            <el-form-item class="pledge input-with-button" prop="pledge">
                <slot name="label"><div class="uppercase label">You pledge</div></slot>
                <el-input autofocus="true" type="number" v-model="form.pledge">
                    <el-select :default-first-option="true" class="currency" v-model="form.currency" slot="append">
                       <el-option
                            v-for="currency in currencies"
                            :key="currency.symbol"
                            :label="currency.symbol"
                            :value="currency.symbol"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item class="pledge-sum">
                <el-row>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase label">You get</div></slot>
                        <div class="currency-info bold">
                            <span class="summ">
                                {{ getSum | money }}
                            </span>
                            <span class="uppercase">{{$R.path(['settings', 'asset', 'symbol'], airpay)}}</span>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase gray label">Current rate</div></slot>
                        <div class="currency-info">
                            <div class="bold rate uppercase">
                                1 {{ form.currency }} =
                                <span>
                                    {{ $R.prop('rate', $R.find($R.propEq('symbol', form.currency), currencies)) }}
                                </span>
                                <span class="uppercase">
                                    {{$R.path(['settings', 'asset', 'symbol'], airpay)}}
                                </span>
                            </div>
                            <div v-if="$R.path(['settings', 'bonus'], airpay)" class="bonus uppercase">
                                Include bonus <span class="percent bold">+{{$R.path(['settings', 'bonus'], airpay)}}%</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>

            <div class="">
                <el-button
                    class="button" type="primary"
                    @click="submit('buyTokenForm')">
                    Buy tokens
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { map, propEq, find, nth, path, prop } from 'ramda'
import { mapState } from 'vuex'
import '@/plugins/vue-swimline'
import { SET_ACTIVE_TAB, SET_STEP } from '../../../store/modules/general/mutation-types'
import { prepareValidateErrors } from '../../../helpers/general'
import { SET_FORM_DATA } from '../../../store/modules/forms/mutation-types'
import CountDownTimer from '@/components/CountDownTimer'

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
    return {
      form: {
        pledge: null,
        currency: null
      },
      time: 0.3
    }
  },
  mounted () {
    this.form.currency = path(['asset', 'symbol'], nth(0, this.airpay.settings.assetAccept))
  },
  filters: {
    money: function (price) {
      if (price) {
        let val = parseInt(price)
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return '0'
    }
  },
  methods: {
    submit: function (formName) {
      if (this.loading) {
        return
      }
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.$store.commit(`forms/${SET_FORM_DATA}`, {
            ...this.$store.state.form,
            byTokenForm: this.form
          })
          this.$store.commit(SET_ACTIVE_TAB, 'VAuthorization')
          this.$store.commit(SET_STEP, 2)
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
    ...mapState(['airpay']),
    sliderText: function () {
      return map(
        item =>
          `<img class="flag" src="${item.flag}" alt="" />
        User from <span class="bold">${
  item.country
}</span> pledge <span class="bold">${item.sum} ${item.currency}</span>`,
        SLIDER
      )
    },
    currencies: function () {
      let assetAccept = this.airpay.settings.assetAccept
      return map(currency => {
        return {
          symbol: currency.asset.symbol,
          rate: currency.rate,
          min: currency.minAmount
        }
      }, assetAccept)
    },
    rulesByToken: function () {
      let currentCurrency = find(propEq('symbol', this.form.currency), this.currencies)
      let checkZero = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Amount is required'))
        } else if (value < currentCurrency.min) {
          callback(new Error(`Amount can not be less then ${currentCurrency.min}`))
        } else {
          callback()
        }
      }
      return {
        pledge: [
          {
            validator: checkZero,
            trigger: ['submit', 'blur']
          }
        ]
      }
    },
    getSum: function () {
      let rate = prop('rate', find(propEq('symbol', this.form.currency), this.currencies))
      return parseFloat(rate) * parseFloat(this.form.pledge)
    }
  },
  components: {
    CountDownTimer
  }
}
</script>

<style lang="sass">
    $BASE_COLOR: #565656
    .time-over
        background-color: #FEF5E7!important
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
    .tooltip-slider ul li
        text-align: left
    .pledge-sum
        color: #313131
        word-break: break-word
        .rate
            font-size: 18px
        & .currency-info, .summ
            color: #000
            line-height: 1
            letter-spacing: 2px
            font-size: 22px
        .bonus
            font-size: 11px
            letter-spacing: 1px
            display: inline-block
            padding: 5px
            border-radius: 3px
            border: 1px solid #889EC7
            color: #889EC7
</style>
