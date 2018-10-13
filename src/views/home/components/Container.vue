<template>
    <div class="body">
        <el-container class="container">
            <v-header
                :logo="$R.path(['settings', 'logo'], settings)"
                :title="$R.path(['settings', 'name'], settings)"
            />
            <el-main class="main">
                <el-steps :active="getStep" class="step">
                    <el-step></el-step>
                    <el-step></el-step>
                    <el-step></el-step>
                </el-steps>
                <component :is="component"></component>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { path, forEach, range, findIndex } from 'ramda'
import { mapState, mapGetters } from 'vuex'

import { hexToRGBA } from '../../../helpers/colors'
import VHeader from './Header'

import ByTokens from './ByTokens'
import VEthereum from './Ethereum'
import VAgree from './Agreement'
import VDeposit from './Deposit'
import VIdentity from './Identity'
import VFinish from './Finish'

import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'
import {
  prepareGraphQLErrors,
  prepareNetworkErrors
} from '../../../helpers/general'

const STEPS = ['ByTokens', 'VEthereum', 'VDeposit']

export default {
  name: 'Container',
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  mounted () {
    sessionStorage.removeItem('token')
    this.$store.commit(SET_GENERAL_DATA, 'ByTokens')
  },
  updated () {
    let baseColor = path(['route', 'query', 'color'], this.$store.state)
    let bgColor = path(['route', 'query', 'bgColor'], this.$store.state)
    document.body.style.background = hexToRGBA(bgColor, 0.1)
    let buttons = document.getElementsByClassName('button')
    forEach(index => {
      buttons.item(index).style.boxShadow =
        '0 4px 7px 0 ' + hexToRGBA(baseColor, 0.47)
    }, range(0, buttons.length))
  },
  computed: {
    ...mapState(['component']),
    ...mapGetters(['networkError', 'graphQLError']),
    getStep () {
      let active = this.component
      let index = findIndex(step => step === active, STEPS) + 1
      return index || 3
    }
  },
  watch: {
    networkError (newValue, oldValue) {
      let message = prepareNetworkErrors(newValue)
      this.$message({
        dangerouslyUseHTMLString: true,
        type: 'error',
        message: message
      })
    },
    graphQLError (newValue, oldValue) {
      let message = prepareGraphQLErrors(newValue)
      this.$message({
        dangerouslyUseHTMLString: true,
        type: 'error',
        message: message
      })
    }
  },
  components: {
    VHeader,
    ByTokens,
    VEthereum,
    VAgree,
    VDeposit,
    VIdentity,
    VFinish
  }
}
</script>

<style lang="sass">
    $BASE_COLOR: #565656
    .center
        text-align: center
    .info-tooltip
        line-height: 1.4
        color: #777777
        background-color: #F3F5F7
        padding: 10px
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        margin-bottom: 5px
    .button
        width: 100%
        font-family: SourceSansPro-Semibold, sans-serif
        font-size: 17px
        letter-spacing: 0.46px
    .gray
        color: $BASE_COLOR
    .uppercase
        text-transform: uppercase
    .bold
        font-weight: 600
    input[type="text"]
        background: #FFFFFF
        border: 1px solid #D9D9D9
        border-radius: 5px
        font-family: SourceSansPro-Regular, sans-serif
        font-size: 17px
        color: #313131
        letter-spacing: 0.76px
    .label
        font-family: SourceSansPro-Regular, sans-serif
        font-size: 14px
        color: #777777
        letter-spacing: 1.33px
    .input-button
        padding: 0 10px
        color: #377DFE!important
    .input-with-button
        & input
            font-family: SourceSansPro-Regular, sans-serif
            color: #313131
            letter-spacing: 0.76px
            font-size: 17px
        & input:focus ~ .el-input-group__append
            border: 1px solid #377DFE
            border-left: none
        .el-input-group__append, .el-input-group__prepend
            background: transparent
        .el-input-group--append .el-input__inner
            border-right: none
    .input-with-button.is-error
        & input:focus ~ .el-input-group__append, .el-input-group__append
            border-color: #f56c6c
    .input-with-button.is-success
        & input:focus ~ .el-input-group__append, .el-input-group__append
            border-color: #67c23a
    .body
        display: flex
        align-items: center
        align-content: center
        justify-content: center
        height: 100%
        width: 100%
        .container
            max-width: 500px
            margin: auto
            background: #fff
            box-shadow: 0 4px 14px 0 rgba(0,0,0,0.12)
            border-radius: 5px
            flex-wrap: wrap
            .main
                .step
                    margin-bottom: 30px
                    .el-step.is-horizontal .el-step__line
                        height: 5px
                        top: 9px
                        background-color: #E4EAF0
                    .el-step__line-inner
                        border-width: 3px!important
                    .el-step__icon.is-text
                        border-color: #E4EAF0
                        color: #AFC0D0
                    .is-finish
                        .el-step__icon.is-text
                            color: #377DFE
                            border-color: #377DFE

</style>
