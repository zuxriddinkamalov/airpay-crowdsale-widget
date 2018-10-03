<template>
    <div>
        <div class="info-tooltip">
            <img class="flag" src="images/flag-usa.png" alt="" />
            User from <span class="bold">USA</span> pledge <span class="bold">3.45 ETH</span>
        </div>
        <el-form ref="buyTokenForm" :model="form">
            <el-form-item class="pledge"
              prop="pledge"
              :rules="[
              { required: true, message: 'Amount is required', trigger: 'blur' },
            ]">
                <slot name="label"><div class="uppercase label">You pladge</div></slot>
                <el-input type="number" v-model="form.pledge">
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
                        <h3>
                            <span class="summ">{{getSumm($R.path(['settings', 'rate'], airpay))}}</span>
                            &nbsp;<span class="uppercase bold">{{$R.path(['settings', 'name'], airpay)}}</span>
                        </h3>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase gray label">Bonuses</div></slot>
                        <h3>
                            <span class="bold">{{$R.path(['settings', 'bonus'], airpay)}}%</span>
                            &nbsp;<span class="period uppercase">Ends in 21 days</span>
                        </h3>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item
              class="email"
              prop="email"
              :rules="[
                  { required: true, message: 'Email required', trigger: 'blur' },
                  { type: 'email', message: 'Please enter valid email', trigger: 'blur' }
                ]">
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
            <el-form ref="verificateForm" :model="form">
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
import { prop, forEach, map, path } from 'ramda'
import { mapState } from 'vuex'
import { BY_TOKENS_MUTATION, PERFORM_BUYING_MUTATION } from '../../../graphql/airpay/mutations'
import { SET_AIRPAY_DATA } from '../../../store/modules/airpay/mutation-types'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'

export default {
  name: 'ByTokens',
  data: function () {
    return {
      loading: false,
      form: {
        pledge: 0,
        email: '',
        verificationCode: '',
        currency: 'btc',
        hash: ''
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
        let val = (price).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
      return '0.00'
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
          let message = '<p>Error in validating</p>'
          map((item, index) => {
            forEach(msg => {
              message += `<p>${msg.message}</p>`
            }, item)
          }, error)
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
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true
          this.$apollo.mutate({
            mutation: PERFORM_BUYING_MUTATION,
            variables: {
              hash: prop('hash', this.airpay),
              code: '1111',
              amount: this.form.pledge,
              currency: this.form.currency
            }
          }).then(response => {
            let data = path(['data', 'buyTokens'], response)
            console.warn(response)
            this.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
              ...this.$store.state.airpay,
              byTokenData: data
            })
            this.$store.commit(SET_GENERAL_DATA, 'VDeposit')
            this.loading = false
          }).catch(response => {
            this.loading = false
          })
        }
      })
    }
  },
  computed: {
    ...mapState([
      'airpay'
    ])
  }
}
</script>

<style lang="sass">
    $BASE_COLOR: #565656
    .flag
        max-width: 20px
        margin-right: 10px
        vertical-align: middle
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
            line-height: 1
            font-size: 22px
        .period
            vertical-align: middle
            font-size: 11px
            padding: 5px
            border: 1px solid #CDD6E9
            color: #CDD6E9
    .code.is-error
        & input:focus ~ .el-input-group__append, .el-input-group__append
            border-color: #f56c6c
    .code.is-success
        & input:focus ~ .el-input-group__append, .el-input-group__append
            border-color: #67c23a
</style>
