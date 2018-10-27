<template>
    <div>
        <div class="agreement" @scroll="readAgreement">
            {{ $R.path(['settings', 'agreement'], airpay) }}
        </div>
        <el-button
            :loading="loading"
            class="button" type="primary"
            @click="buyTokens">
            Yes, I'm agree with this terms
        </el-button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { path } from 'ramda'
import { PERFORM_BUYING_MUTATION } from '../../../graphql/airpay/mutations'
import { SET_AIRPAY_DATA } from '../../../store/modules/airpay/mutation-types'
import { SET_ACTIVE_TAB, SET_STEP } from '../../../store/modules/general/mutation-types'

export default {
  name: 'Agreement',
  data: function () {
    return {
      loading: false
    }
  },
  methods: {
    readAgreement: function (e) {
      // console.warn(e.target.scrollTop)
      // console.warn(e)
      // scrollHeight
      // clientHeight
    },
    buyTokens: function () {
      this.loading = true
      this.$apollo.mutate({
        mutation: PERFORM_BUYING_MUTATION,
        variables: {
          amount: path(['byTokenForm', 'pledge'], this.forms),
          currency: path(['byTokenForm', 'currency'], this.forms),
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
    .agreement
        padding: 10px 15px
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        background: #EBEEF4
        max-height: 180px
        overflow-y: auto
        margin-bottom: 20px
        line-height: 1.4
        &::-webkit-scrollbar-track
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
            margin: 5px 2px
            padding: 5px 2px
            background-color: #F8F9FB
        &::-webkit-scrollbar
            width: 5px
            background-color: #CAD0DA
        &::-webkit-scrollbar-thumb
            margin: 5px 2px
            border-radius: 10px
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
            background-color: #CAD0DA
</style>
