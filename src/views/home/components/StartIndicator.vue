<template>
    <div @keyup.enter="submit('indicatorForm')">
        <el-form :validateOnRuleChange="false" @submit.prevent.native ref="indicatorForm" :model="form">
            <el-form-item class="pledge input-with-button">
                <slot name="label"><div class="uppercase label bold">Crowdsale starts in</div></slot>
                <VCountDownDate :date="indicatorDate"/>
            </el-form-item>
            <div class="divider"></div>
            <el-form-item
                :rules="[
                    { required: true, message: 'Please enter pladge amount', trigger: 'blur' },
                ]"
                class="pledge input-with-button" prop="pledge">
                <slot name="label"><div class="uppercase label bold">How much you plan pladge?</div></slot>
                <el-input autofocus="true" type="number" v-model="form.pledge">
                    <div class="currency-prefix bold" slot="prefix">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                </el-input>
            </el-form-item>

            <div class="">
                <el-button
                    class="button" type="primary"
                    @click="submit('indicatorForm')">
                    Join to our whitelist
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import { nth, path } from 'ramda'
import { mapState } from 'vuex'
import moment from 'moment'
import VCountDownDate from '@/components/CountDownDate'
import { SET_ACTIVE_TAB, SET_STEP } from '../../../store/modules/general/mutation-types'
import { prepareValidateErrors } from '../../../helpers/general'

export default {
  name: 'StartIndicator',
  data: function () {
    return {
      form: {
        pledge: null,
        currency: null
      }
    }
  },
  mounted () {
    this.form.currency = path(
      ['asset', 'symbol'],
      nth(0, this.airpay.settings.assetAccept)
    )
  },
  methods: {
    submit: function (formName) {
      if (this.loading) {
        return
      }
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.$store.commit(SET_STEP, 2)
          this.$store.commit(SET_ACTIVE_TAB, 'VAuthorization')
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
  },
  computed: {
    ...mapState(['airpay']),
    indicatorDate: function () {
      let startDate = this.airpay.settings.startDate
      return moment(startDate, 'DD/MM/YYYY').toDate()
    }
  },
  components: {
    VCountDownDate
  }
}
</script>

<style lang="sass">
    .pledge
        & input, .currency
            font-weight: 600
            color: #000

    .pledge

        .currency
            width: 90px
    .currency-prefix
        height: 100%
        font-size: 14px
        color: #000
        padding: 5px 10px

</style>
