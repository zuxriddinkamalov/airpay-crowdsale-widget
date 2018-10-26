<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">

</style>

<script>
import { SETTINGS_MUTATION } from '@/graphql/airpay/mutations'
import { SET_AIRPAY_DATA } from '@/store/modules/airpay/mutation-types'
import { prop, path } from 'ramda'

export default {
  name: 'App',
  apollo: {
    settings: {
      query: SETTINGS_MUTATION,
      variables () {
        return {
          crowdsale: path(['route', 'query', 'crowdsale'], this.$store.state)
        }
      },
      update (response) {
        const data = prop('getCrowdsale', response)
        this.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
          ...this.$store.state.airpay,
          settings: data,
          loading: false
        })
      },
      error (error) {
        this.$notify.error({
          title: 'Error',
          message: error.message,
          showClose: false
        })
      },
      watchLoading (isLoading, countModifier) {
        this.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
          ...this.$store.state.airpay,
          loading: isLoading
        })
      }
    }
  }
}
</script>

<style>
  html, body, #app {
    width: 100%;
    height: 100%;
  }
</style>
