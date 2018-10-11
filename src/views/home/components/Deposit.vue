<template>
    <div @keyup.enter="withdraw">
        <el-form @submit.prevent.native :model="form">
            <el-form-item class="input-with-button">
                <slot name="label">
                    <div class="label-text label">
                        Send
                        <span class="bold uppercase">
                            {{$R.path(['byTokenData', 'amount'], airpay)}}
                            {{$R.path(['byTokenData', 'currency'], airpay)}}
                        </span>
                        to this address
                    </div>
                </slot>
                <el-input class="bold" :readonly="true" v-model="airpay.byTokenData.address">
                    <el-button
                        v-clipboard:copy="airpay.byTokenData.address"
                        v-clipboard:success="copySuccess"
                        class="input-button bold"
                        slot="append"
                        type="text">Copy</el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <div class="info-tooltip">
                    <span class="uppercase bold">Attention</span> Be aware that you send BTC to correct address with correct
                    fees amount to quickest execution
                </div>
            </el-form-item>
            <el-form-item class="pledge-sum">
                <el-row class="transaction-info">
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase label">Time for transaction</div></slot>
                        <div class="timer">
                            <CountDownTimer :minute="1" />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase gray label">QR code</div></slot>
                        <div class="qr-code">
                            <qriously v-model="form.address" :size="100" />
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-button
                :disabled="loading"
                class="button" type="primary"
                @click="withdraw">
                Done! Go to withdraw tokens
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { path } from 'ramda'

import CountDownTimer from '@/components/CountDownTimer'
import { WITHDRAW_TOKENS_MUTATION } from '../../../graphql/airpay/mutations'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'

export default {
  name: 'Deposit',
  data: function () {
    return {
      loading: false,
      form: {
        address: ''
      }
    }
  },
  methods: {
    copySuccess: function () {
      this.$message({
        message: 'Successfully copied',
        type: 'success'
      })
    },
    withdraw: function () {
      this.loading = true
      this.$apollo.mutate({
        mutation: WITHDRAW_TOKENS_MUTATION,
        variables: {
          address: path(['byTokenData', 'address'], this.airpay)
        }
      }).then(response => {
        /* let data = path(['data', 'buyTokens'], response)
        self.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
          ...self.$store.state.airpay,
          byTokenData: data
        }) */
        this.$store.commit(SET_GENERAL_DATA, 'VEthereum')
        this.loading = false
      }).catch(response => {
        this.loading = false
      })
    }
  },
  computed: {
    ...mapState([
      'airpay'
    ])
  },
  components: {
    CountDownTimer
  }
}
</script>

<style lang="sass" scoped>
    .label-text
        color: #000
        font-size: 18px
    .transaction-info
        .label
            margin-bottom: 15px
        .timer, .qr-code
            text-align: center
        .qr-code
            padding-top: 10px
</style>
