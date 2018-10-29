<template>
    <div @keyup.enter="submit('indicatorForm')">
        <el-form :validateOnRuleChange="false" @submit.prevent.native ref="indicatorForm" :rules="indicatorFormRules" :model="form">
            <el-form-item class="pledge input-with-button">
                <slot name="label"><div class="uppercase label">Crowdsales starts in</div></slot>
                <VCountDownDate :date="indicatorDate"/>
            </el-form-item>
            <div class="divider"></div>
            <el-form-item class="pledge input-with-button"
              prop="pledge">
                <slot name="label"><div class="uppercase label">How much you plan pladge?</div></slot>
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

            <div class="">
                <el-button
                    class="button" type="primary"
                    @click="submit('indicatorForm')">
                    Join our white list!
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { map, propEq, find, nth, path, prop } from 'ramda'
import { mapState } from 'vuex'
import moment from 'moment'
import VCountDownDate from '@/components/CountDownDate'
import { SET_ACTIVE_TAB } from '../../../store/modules/general/mutation-types'
import { prepareValidateErrors } from '../../../helpers/general'

export default {
  name: 'StartIndicator',
  data: function () {
    return {
      form: {
        pledge: null,
        currency: null
      }
    }
  },
  mounted () {
    this.form.currency = path(['asset', 'symbol'], nth(0, this.airpay.settings.assetAccept))
  },
  methods: {
    submit: function (formName) {
      if (this.loading) {
        return
      }
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.$store.commit(SET_ACTIVE_TAB, 'VEthereum')
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
    indicatorDate: function () {
      let startDate = this.airpay.settings.startDate
      return moment(startDate, 'DD/MM/YYYY').toDate()
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
    indicatorFormRules: function () {
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
    VCountDownDate
  }
}
</script>

<style lang="sass">
    .pledge
        & input, .currency
            font-weight: 600
            color: #313131
    .pledge
        .currency
            width: 90px
</style>
