<template>
    <div>
        <el-form :model="form" ref="ethForm">
            <el-form-item
                prop="ethAddress"
                :rules="[
              { required: true, message: 'Ethereum address required', trigger: 'blur' }
            ]">
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
import { prepareValidateErrors } from '../../../helpers/general'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'

export default {
  name: 'Ethereum',
  data: function () {
    return {
      loading: false,
      form: {
        ethAddress: ''
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
