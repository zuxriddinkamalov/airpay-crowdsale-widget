<template>
    <div>
        <el-form :model="form">
            <el-form-item class="code input-with-button"
              prop="address"
              :rules="[
              { required: true, message: 'Address is required', trigger: 'blur' },
            ]">
                <slot name="label">
                    <div class="uppercase label">Deposit <span class="bold"></span> to this address</div>
                </slot>
                <el-input v-model="form.address">
                    <el-button
                        @click="copy()"
                        class="input-button"
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
                <el-row>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase label">Time for transaction</div></slot>
                        <div>
                            <el-progress type="circle" :percentage="0"></el-progress>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <slot name="label"><div class="uppercase gray label">QR code</div></slot>
                        <div>
                            <qriously v-model="form.address" :size="100" />
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-button
                    :disabled="loading"
                    class="button" type="primary"
                    @click="withdraw">
                Withdraw tokens
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Deposit',
  data: function () {
    return {
      loading: false,
      form: {
        address: ''
      }
    }
  },
  methods: {
    copy: function () {
      console.warn('Copied')
    },
    withdraw: function () {
      console.warn('Submited')
    }
  },
  computed: {
    ...mapState([
      'airpay'
    ])
  }
}
</script>

<style scoped>

</style>
