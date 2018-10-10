<template>
    <div>
        <el-form :model="form" :rules="rulesEthereum" ref="ethForm">
            <!--
            0xBff22763a7D6e15Bd744422bb00961683F771595
            -->
            <el-form-item
                prop="ethAddress">
                <slot name="label"><div class="eth-address bold">Enter your Ethereum address to receipt tokens:</div></slot>
                <el-input class="receipter" placeholder="Please enter ethereum address" v-model="form.ethAddress"></el-input>
            </el-form-item>
            <el-form-item>
                <div class="info-tooltip">
                    <span class="uppercase bold">Attention</span> Be aware that you send BTC to correct address with correct
                    fees amount to quickest execution
                </div>
            </el-form-item>
            <el-button
                    :disabled="loading"
                    class="button" type="primary"
                    @click="withdraw('ethForm')">
                Withdraw tokens
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { isAddress } from 'ethereum-address'
import { prepareValidateErrors } from '../../../helpers/general'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'

export default {
  name: 'Ethereum',
  data: function () {
    let checkEthereum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Ethereum address required'))
      } else if (!isAddress(value)) {
        callback(new Error('Please enter valid ethereum address'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        ethAddress: ''
      },
      rulesEthereum: {
        ethAddress: [
          { validator: checkEthereum, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    withdraw (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.$store.commit(SET_GENERAL_DATA, 'VIdentity')
        } else {
          let message = prepareValidateErrors(error)
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: message
          })
          return false
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
    .eth-address
        font-size: 20px
        color: #000
        margin-bottom: 5px
    .receipter
        color: #888888
</style>
