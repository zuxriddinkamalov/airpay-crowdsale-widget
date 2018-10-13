<template>
    <div @keyup.enter="submit('buyTokenForm')">
        <div class="info-tooltip tooltip-slider">
            <vue-swimlane
                :scale="0.5"
                :transitionDelay="2000"
                :circular="true"
                :words="sliderText"></vue-swimlane>
        </div>
        <el-form @submit.prevent.native ref="buyTokenForm" :rules="rulesByToken" :model="form">
            <el-form-item class="pledge input-with-button"
              prop="pledge">
                <slot name="label"><div class="uppercase label">You pledge</div></slot>
                <el-input min="1" type="number" v-model="form.pledge">
                    <el-select class="currency" v-model="form.currency" slot="append">
                       <el-option label="ETH" value="eth"></el-option>
                        <el-option label="BTC" value="btc"></el-option>

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
                            &nbsp;<span class="uppercase">{{$R.path(['settings', 'symbol'], airpay)}}</span>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase gray label">Current rate</div></slot>
                        <div class="currency-info">
                            <div class="bold rate uppercase">
                                1 {{ form.currency }} =
                                <span v-if="$R.equals(form.currency, 'eth')">
                                    {{ $R.path(['settings', 'rateETH'], airpay) }}
                                </span>
                                <span v-if="$R.equals(form.currency, 'btc')">
                                    {{ $R.path(['settings', 'rateBTC'], airpay) | money }}
                                </span>
                                {{ $R.path(['settings', 'symbol'], airpay) }}
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
import { path, map } from 'ramda';
import { mapState } from 'vuex';
import '@/plugins/vue-swimline';
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types';
import { prepareValidateErrors } from '../../../helpers/general';
import { SET_FORM_DATA } from '../../../store/modules/forms/mutation-types';
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
];
export default {
  name: 'ByTokens',
  data: function() {
    let checkZero = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Amount is required'));
      } else if (value < 1) {
        callback(new Error('Amount can not be less then one'));
      } else {
        callback();
      }
    };
    return {
      form: {
        pledge: null,
        currency: 'eth'
      },
      rulesByToken: {
        pledge: [
          {
            validator: checkZero,
            message: 'Amount can not be less then one',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  filters: {
    money: function(price) {
      if (price) {
        let val = parseInt(price);
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return '0';
    }
  },
  methods: {
    submit: function(formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.$store.commit(`forms/${SET_FORM_DATA}`, {
            ...this.$store.state.form,
            byTokenForm: this.form
          });
          this.$store.commit(SET_GENERAL_DATA, 'VEthereum');
        } else {
          let message = prepareValidateErrors(error);
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: message
          });
          return false;
        }
      });
    }
  },
  computed: {
    ...mapState(['airpay']),
    sliderText: function() {
      return map(
        item =>
          `<img class="flag" src="${item.flag}" alt="" />
        User from <span class="bold">${
          item.country
        }</span> pledge <span class="bold">${item.sum} ${item.currency}</span>`,
        SLIDER
      );
    },
    getSum: function() {
      let rate;
      switch (this.form.currency) {
        case 'btc':
          rate = path(['settings', 'rateBTC'], this.airpay);
          break;
        case 'eth':
          rate = path(['settings', 'rateETH'], this.airpay);
          break;
      }
      return parseFloat(rate) * parseFloat(this.form.pledge);
    }
  }
};
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
