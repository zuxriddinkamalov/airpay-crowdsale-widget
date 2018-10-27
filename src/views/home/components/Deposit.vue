<template>
    <div @keyup.enter="paymentDone">
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
                            <CountDownTimer :color="proccessColor" :minute="5" />
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
                class="button" type="primary"
                @click="paymentDone">
                Payment done!
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import CountDownTimer from '@/components/CountDownTimer'
import { SET_ACTIVE_TAB } from '../../../store/modules/general/mutation-types'

export default {
  name: 'Deposit',
  data: function () {
    return {
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
    paymentDone: function () {
      this.$store.commit(SET_ACTIVE_TAB, 'VFinish')
      // let isWhitelisted = path(['authData', 'isWhitelisted'], this.airpay)
      // if (isWhitelisted) {
      //   this.$store.commit(SET_ACTIVE_TAB, 'VFinish')
      // } else {
      //   this.$store.commit(SET_ACTIVE_TAB, 'VIdentity')
      // }
    }
  },
  computed: {
    ...mapState([
      'airpay',
      'color'
    ]),
    proccessColor: function () {
      return this.color
    }
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
