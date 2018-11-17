<template>
    <div>
        <div class="success-finish">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h2 class="success-title">Wait confirmation</h2>
        <div class="label center finish-description">Verification proccess make take up to 24 hours and you will notify about status</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { path } from 'ramda'
import moment from 'moment'
import { VERIFICATION_CHANGES_SUBSCRIPTION } from '../../../graphql/airpay/subscriptions'
import { TEST_SET_VERIFY_STATUS } from '../../../graphql/airpay/mutations'
import { SET_ACTIVE_TAB } from '../../../store/modules/general/mutation-types'

export default {
  name: 'WaitDocument',
  apollo: {
    $subscribe: {
      verificationStatus: {
        query: VERIFICATION_CHANGES_SUBSCRIPTION,
        variables: function () {
          return {
            verifiedHash: this.airpay.verificationHash
          }
        },
        result (response) {
          let status = path(['data', 'requestStatusChanges'], response)

          switch (status) {
            case 'WHITELISTED':
              let startDate = moment(this.airpay.settings.startDate, 'DD/MM/YYYY')
              if (startDate.diff(moment()) > 0) {
                this.$store.commit(SET_ACTIVE_TAB, 'VFinish')
              } else {
                this.$store.commit(SET_ACTIVE_TAB, 'VEthereum')
              }
              break
            case 'LONGTIME':
              this.$store.commit(SET_ACTIVE_TAB, 'VWait')
              break
            default:
              this.$store.commit(SET_ACTIVE_TAB, 'VError')
              break
          }
        }
      }
    }
  },
  mounted () {
    let self = this
    setTimeout(() => {
      this.$apollo
        .mutate({
          mutation: TEST_SET_VERIFY_STATUS,
          variables: {
            verifiedHash: self.airpay.verificationHash,
            status: 'WHITELISTED'
          }
        })
        .then(response => {
        })
        .catch(response => {
          console.warn('error')
        })
    }, 4000)
  },
  computed: {
    ...mapState(['airpay'])
  }
}
</script>

<style lang="sass" scoped>
    .success-finish
        max-width: 200px
        box-sizing: border-box
        font-weight: bold
        text-align: center
        margin: 35px auto 20px
        padding: 10px 0
        & span
            width: 30px
            height: 30px
            -webkit-border-radius: 50%
            -moz-border-radius: 50%
            border-radius: 50%
            margin: 15px
            display: inline-block
        & span:first-child
            background: rgba(var(--rgb-primary-color), 1)
        & span:nth-child(2)
            background: rgba(var(--rgb-primary-color), 0.6)
        & span:last-child
            background: rgba(var(--rgb-primary-color), 0.3)
    .success-title
        font-size: 26px
        font-weight: bold
        text-align: center
    .finish-description
        font-size: 14px
        letter-spacing: 0.5px
        line-height: 1.4
        margin: 20px auto
        max-width: 400px

</style>
