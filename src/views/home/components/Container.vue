<template>
    <div class="body">
        <el-container class="container">
            <v-header
                :logo="$R.path(['settings', 'logo'], settings)"
                :title="$R.path(['settings', 'name'], settings)"
            />
            <el-main class="main">
                <el-steps v-if="getStep!=1" :active="getStep" class="step">
                    <el-step></el-step>
                    <el-step></el-step>
                    <el-step></el-step>
                </el-steps>
                <component :is="component"></component>
            </el-main>
           <!-- Hello world
            {{$apollo.queries}}
            {{settings}}-->
        </el-container>
    </div>
</template>

<script>
import {
  path,
  forEach,
  range,
  findIndex,
  isNil } from 'ramda'
import { mapState } from 'vuex'

import { getRGB } from '../../../helpers/colors'
import VHeader from './Header'

import ByTokens from './ByTokens'
import VDeposit from './Deposit'

import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'

const STEPS = ['ByTokens', 'VDeposit', '']

export default {
  name: 'Container',
  props: {
    settings: {
      type: Object,
      required: true
    }
  },
  mounted () {
    document.body.style.background = getRGB(path(['settings', 'color'], this.settings), 0.1)
    let self = this
    let buttons = document.getElementsByClassName('button')
    forEach(index => {
      buttons.item(index).style.boxShadow = '0 4px 7px 0 ' + getRGB(path(['settings', 'color'], self.settings), 0.47)
    }, range(0, buttons.length))
    this.$store.commit(SET_GENERAL_DATA, 'ByTokens')
  },
  updated () {
    console.warn('UPDATED')
  },
  computed: {
    ...mapState([
      'component'
    ]),
    getStep () {
      let active = this.component
      let index = findIndex(step => step === active, STEPS)
      if (isNil(index)) {
        return 3
      }
      return index + 1
    }
  },
  components: {
    VHeader,
    ByTokens,
    VDeposit
  }
}
</script>

<style lang="sass">
    $BASE_COLOR: #565656
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
    .body
        display: flex
        align-items: center
        align-content: center
        justify-content: center
        height: 100%
        width: 100%
        .container
            max-width: 500px
            background: #fff
            box-shadow: 0 4px 14px 0 rgba(0,0,0,0.06)
            border-radius: 5px
            flex-wrap: wrap
            .main
                .step
                    margin-bottom: 30px
                    .el-step.is-horizontal .el-step__line
                        height: 5px
                        top: 9px
                    .el-step__line-inner
                        border-width: 3px!important

</style>
