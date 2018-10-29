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
import { SET_COLOR } from './store/modules/general/mutation-types'
import { BASE_COLOR, getRGB, hexToRGBA, hexToRGBCSS } from './helpers/colors'

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
  },
  mounted () {
    let baseColor =
      hexToRGBA(path(['route', 'query', 'color'], this.$store.state), 1) ||
      BASE_COLOR
    let bgColor =
      hexToRGBA(path(['route', 'query', 'bgColor'], this.$store.state), 0.1) ||
      getRGB(baseColor, 0.1)
    let cssRGB = hexToRGBCSS(baseColor)
    document.documentElement.style.setProperty(
      '--primary-color',
      `${baseColor}`
    )
    document.documentElement.style.setProperty(
      '--rgb-primary-color',
      `${cssRGB}`
    )
    document.body.style.background = bgColor
    this.$store.commit(SET_COLOR, baseColor)
    sessionStorage.removeItem('token')
  }
}
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
