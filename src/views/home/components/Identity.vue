<template>
    <div>
        <el-form :model="form" ref="identityForm">
            <h3 class="identity-title bold">Identity verification</h3>
            <el-form-item
                class="docType"
                prop="docType">
                <slot name="label"><div class="uppercase label">Select document type</div></slot>
                <el-select class="document-type" v-model="form.docType">
                    <el-option
                        label="ID Card"
                        value="idCard">
                    </el-option>
                    <el-option
                        label="Passport"
                        value="passport">
                    </el-option>
                </el-select>
            </el-form-item>
            <div>
                <h3 class="label uppercase">Please take end upload photos with your id card</h3>
                <div class="photos">
                    <el-row :gutter="15">
                        <el-col class="id-card" :xs="24" :sm="12">
                            <div class="upload" :style="{
                                backgroundImage: 'url(images/pass.png)'
                            }">
                                <el-upload
                                    action="#"
                                    :auto-upload="false">
                                    <el-button slot="trigger" size="small" round>Upload selfie with your ID Card</el-button>
                                </el-upload>
                            </div>
                        </el-col>
                        <el-col class="id-card-detail" :xs="24" :sm="12">
                            <div class="upload" :style="{
                                backgroundImage: 'url(images/inhand.png)'
                            }">
                                <el-upload
                                    action="#"
                                    :auto-upload="false">
                                    <el-button size="small" round>Upload your ID Card in detail view</el-button>
                                </el-upload>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-form-item>
                <div class="info-tooltip">
                    <span class="uppercase bold">Requirements</span> Please upload only high quality photos for
                    quickest and lightness identity verification proccess
                </div>
            </el-form-item>
            <el-button
                :disabled="loading"
                class="button" type="primary"
                @click="submit('identityForm')">
                Submit application
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { prepareValidateErrors } from '../../../helpers/general'
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types'

export default {
  name: 'Identity',
  data: function () {
    return {
      loading: false,
      form: {
        docType: 'idCard',
        idCard: null,
        idCardDetail: null
      }
    }
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.$store.commit(SET_GENERAL_DATA, 'VFinish')
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

<style lang="sass">
    .el-select
        width: 100%
    .identity-title
        font-size: 24px
        margin-bottom: 15px
    .document-type *
        font-weight: bold
        font-size: 20px
    .photos
        margin: 20px 0
    .upload
        -webkit-background-size: 100% auto
        background-size: 100% auto
        background-position: center center
        background-repeat: no-repeat
        height: 160px
        text-align: center
        button
            background: transparent
            border-width: 2px
            border-color: #387EFE
            color: #4686FE
            margin: 15px auto
</style>
