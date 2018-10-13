<template>
    <div @keyup.enter="submit('identityForm')">
        <el-form @submit.prevent.native :model="form" ref="identityForm">
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
            <el-form-item>
                <div class="info-tooltip">
                    <span class="uppercase bold">Requirements</span> Please upload only high quality photos for
                    quickest and lightness identity verification proccess
                </div>
            </el-form-item>
            <div class="photos">
                <el-row :gutter="15">
                    <el-col class="id-card" :xs="24" :sm="12">
                        <el-form-item
                            prop="selfie"
                            :rules="[
                            { required: true, message: 'Please select selfie file', trigger: 'blur' },
                        ]">
                            <div class="upload" :style="{
                                backgroundImage: 'url(images/pass.png)'
                            }">
                                <el-upload
                                    action="#"
                                    ref="selfie"
                                    :limit="1"
                                    :show-file-list="false"
                                    :on-change="(file, fileList) => selectFile(file, fileList, 'selfie')"
                                    :auto-upload="false">
                                    <el-button
                                        class="upload-button"
                                        v-if="!form.selfie"
                                        slot="trigger"
                                        size="small" round>
                                        <span class="icon"><i class="el-icon-plus"></i></span> Selfie photo
                                    </el-button>
                                    <el-button
                                        class="clear-file"
                                        @click.prevent="clearFile('selfie')"
                                        v-else slot="tip"
                                        size="small" round>
                                        <span class="icon"><i class="el-icon-check"></i></span>
                                        {{ $R.prop('name', form.selfie) }}
                                        <span class="icon"><i class="el-icon-close"></i></span>
                                    </el-button>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col class="id-card-detail" :xs="24" :sm="12">
                        <el-form-item
                            prop="front"
                            :rules="[
                            { required: true, message: 'Please select front file', trigger: 'blur' },
                        ]">
                            <div class="upload" :style="{
                                backgroundImage: 'url(images/inhand.png)'
                            }">
                                <el-upload
                                    action="#"
                                    ref="front"
                                    :limit="1"
                                    :show-file-list="false"
                                    :on-change="(file, fileList) => selectFile(file, fileList, 'front')"
                                    :auto-upload="false">
                                    <el-button
                                        class="upload-button"
                                        v-if="!form.front"
                                        slot="trigger"
                                        size="small" round>
                                        <span class="icon"><i class="el-icon-plus"></i></span> Selfie photo
                                    </el-button>
                                    <el-button
                                        class="clear-file"
                                        @click.prevent="clearFile('front')"
                                        v-else slot="tip"
                                        size="small" round>
                                        <span class="icon"><i class="el-icon-check"></i></span>
                                        {{ $R.prop('name', form.front) }}
                                        <span class="icon"><i class="el-icon-close"></i></span>
                                    </el-button>
                                </el-upload>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
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
import { prop, path } from 'ramda';
import { prepareValidateErrors } from '../../../helpers/general';
import { SET_GENERAL_DATA } from '../../../store/modules/general/mutation-types';
import { UPLOAD_DOC_MUTATION } from '../../../graphql/airpay/mutations';

export default {
  name: 'Identity',
  data: function() {
    return {
      loading: false,
      form: {
        docType: 'idCard',
        selfie: null,
        front: null
      }
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          this.loading = true;
          this.$apollo
            .mutate({
              mutation: UPLOAD_DOC_MUTATION,
              variables: {
                selfie: prop('selfie', this.form),
                front: prop('front', this.form),
                docType: prop('docType', this.form)
              }
            })
            .then(response => {
              /* let data = path(['data', 'buyTokens'], response)
            self.$store.commit(`airpay/${SET_AIRPAY_DATA}`, {
              ...self.$store.state.airpay,
              byTokenData: data
            }) */
              console.log(response);
              let status = path(['data', 'uploadDocs'], response);
              if (status) {
                this.$store.commit(SET_GENERAL_DATA, 'VFinish');
              } else {
                this.$message.error('Can`t upload files');
              }
              this.loading = false;
            })
            .catch(response => {
              this.loading = false;
            });
        } else {
          let message = prepareValidateErrors(error);
          this.$message({
            dangerouslyUseHTMLString: true,
            type: 'error',
            message: message
          });
          return false;
        }
      });
    },
    clearFile: function(ref) {
      this.form[ref] = null;
      this.$refs[ref].clearFiles();
    },
    selectFile: function(file, fileList, key) {
      this.form[key] = prop('raw', file);
    }
  }
};
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
        padding: 10px
        .upload-button
            padding: 5px 15px
            font-size: 16px
            .icon
                font-size: 20px
                i
                    vertical-align: middle
        &>div
            position: relative
        .el-upload
            text-align: left
            width: 100%
        button
            text-align: left
            background: transparent
            border: 1px solid #387EFE
            color: #4686FE
            margin: 15px auto
        .clear-file
            width: 100%
            color: #fff
            background-color: #377DFE
            position: absolute
            left: 0
            .icon
                vertical-align: middle
            .icon:first-child
                margin-right: 10px
                float: left
            .icon:last-child
                margin-left: 10px
                float: right
</style>
