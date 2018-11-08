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
import { VERIFICATION_CHANGES_SUBSCRIBTION } from '../../../graphql/airpay/subscriptions'
import { SET_ACTIVE_TAB, SET_STEP } from '../../../store/modules/general/mutation-types'

export default {
  name: 'WaitDocument',
  mounted () {
    let self = this
    setTimeout(function () {
      self.$store.commit(SET_STEP, 3)
      self.$store.commit(SET_ACTIVE_TAB, 'VEthereum')
    }, 3000)
    this.$apollo.subscribe({
      query: VERIFICATION_CHANGES_SUBSCRIBTION,
      variables: function () {
        return {
          verificationHash: this.airpay.verificationHash
        }
      },
      result (data) {
        let status = path(['verificationChanges'], data)
        if (status) {
          self.$store.commit(SET_STEP, 3)
          self.$store.commit(SET_ACTIVE_TAB, 'VEthereum')
        } else {
          self.$store.commit(SET_ACTIVE_TAB, 'VError')
        }
      }
    })
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
