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
                        <el-option label="BTC" value="btc"></el-option>
                        <el-option label="ETH" value="eth"></el-option>
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
                            &nbsp;<span class="uppercase">{{$R.path(['settings', 'name'], airpay)}}</span>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase gray label">Bonuses</div></slot>
                        <div class="currency-info">
                            <div class="bold rate uppercase">
                                1 {{ form.currency }} =
                                <span v-if="$R.equals(form.currency, 'eth')">
                                    {{ $R.path(['settings', 'rateETH'], airpay) }}
                                </span>
                                <span v-if="$R.equals(form.currency, 'btc')">
                                    {{ $R.path(['settings', 'rateBTC'], airpay) | money }}
                                </span>
                                {{ $R.path(['settings', 'name'], airpay) }}
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
<<<<<<< HEAD
import { prop, path, map } from 'ramda';
import { mapState } from 'vuex';

import VTextSlider from '@/components/TextSlider';
import {
  BY_TOKENS_MUTATION,
  PERFORM_BUYING_MUTATION
} from '../../../graphql/airpay/mutations';
import { SET_AIRPAY_DATA } from '../../../store/modules/airpay/mutation-types';
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types';
import { prepareValidateErrors } from '../../../helpers/general';
=======
import { path, map } from 'ramda'
import { mapState } from 'vuex'

import '@/plugins/vue-swimline'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'
import { prepareValidateErrors } from '../../../helpers/general'
import { SET_FORM_DATA } from '../../../store/modules/forms/mutation-types'
>>>>>>> b2e8870eb208538e6fde3cb175dd077657c5f8fe

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
<<<<<<< HEAD
      loading: false,
      sliderText: map(
        item =>
          `<img class="flag" src="${item.flag}" alt="" />
        User from <span class="bold">${
          item.country
        }</span> pledge <span class="bold">${item.sum} ${item.currency}</span>`,
        SLIDER
      ),
=======
>>>>>>> b2e8870eb208538e6fde3cb175dd077657c5f8fe
      form: {
        pledge: null,
        currency: 'btc'
      },
      rulesByToken: {
        pledge: [
<<<<<<< HEAD
          {
            validator: checkZero,
            message: 'Amount can not be less then one',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: 'Email required', trigger: 'blur' },
          {
            type: 'email',
            message: 'Please enter valid email',
            trigger: 'blur'
          }
=======
          { validator: checkZero, message: 'Amount can not be less then one', trigger: 'blur' }
>>>>>>> b2e8870eb208538e6fde3cb175dd077657c5f8fe
        ]
      }
    };
  },
<<<<<<< HEAD
  created() {
    // console.warn(this.$store.state)
  },
  methods: {
    getSumm: function(rate) {
      let price = parseFloat(prop('pledge', this.form)) * rate;
      if (price) {
        let val = price.toFixed(0);
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      return '0';
    },
    getRate: function(rate) {
      return rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    submit: function() {
      if (prop('hash', this.airpay)) {
        this.verificate('verificateForm');
      } else {
        this.buyTokens('buyTokenForm');
      }
    },
    buyTokens(formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true;
          this.$apollo
            .mutate({
              mutation: BY_TOKENS_MUTATION,
              variables: {
                email: this.form.email
              }
            })
            .then(response => {
              this.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
                ...this.$store.state.airpay,
                hash: path(['data', 'enter'], response)
              });
              this.loading = false;
            })
            .catch(response => {
              this.loading = false;
            });
=======
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
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.$store.commit(`forms/${SET_FORM_DATA}`, {
            ...this.$store.state.form,
            byTokenForm: this.form
          })
          this.$store.commit(SET_GENERAL_DATA, 'VEthereum')
>>>>>>> b2e8870eb208538e6fde3cb175dd077657c5f8fe
        } else {
          let message = prepareValidateErrors(error);
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: message
          });
          return false;
        }
<<<<<<< HEAD
      });
    },
    verificate(formName) {
      let self = this;
      let enter = new Promise(function(resolve, reject) {
        self.$refs['buyTokenForm'].validate((valid, error) => {
          if (valid) {
            resolve();
          } else {
            let message = prepareValidateErrors(error);
            self.$message({
              dangerouslyUseHTMLString: true,
              type: 'error',
              message: message
            });
          }
        });
      });
      let verification = new Promise(function(resolve, reject) {
        self.$refs[formName].validate((valid, error) => {
          if (valid) {
            resolve();
          }
        });
      });
      Promise.all([enter, verification]).then(function() {
        self.loading = true;
        self.$apollo
          .mutate({
            mutation: PERFORM_BUYING_MUTATION,
            variables: {
              hash: prop('hash', self.airpay),
              code: '1111',
              amount: self.form.pledge,
              currency: self.form.currency
            }
          })
          .then(response => {
            let data = path(['data', 'buyTokens'], response);
            self.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
              ...self.$store.state.airpay,
              byTokenData: data
            });
            sessionStorage.setItem('token', prop('authorization', data));
            self.$store.commit(SET_GENERAL_DATA, 'VDeposit');
            self.loading = false;
          })
          .catch(response => {
            self.loading = false;
          });
      });
    }
  },
  computed: {
    ...mapState(['airpay'])
  },
  components: {
    VTextSlider
=======
      })
    }
  },
  computed: {
    ...mapState([
      'airpay'
    ]),
    sliderText: function () {
      return map(item =>
        `<img class="flag" src="${item.flag}" alt="" />
        User from <span class="bold">${item.country}</span> pledge <span class="bold">${item.sum} ${item.currency}</span>`
        , SLIDER)
    },
    getSum: function () {
      let rate
      switch (this.form.currency) {
        case 'btc':
          rate = path(['settings', 'rateBTC'], this.airpay)
          break
        case 'eth':
          rate = path(['settings', 'rateETH'], this.airpay)
          break
      }
      return parseFloat(rate) * parseFloat(this.form.pledge)
    }
>>>>>>> b2e8870eb208538e6fde3cb175dd077657c5f8fe
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
            border: 1px solid #889EC7
            color: #889EC7
</style>
