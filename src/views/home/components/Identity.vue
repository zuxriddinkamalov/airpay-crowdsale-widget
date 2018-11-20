<template>
    <div @keyup.enter="submit('identityForm')">
        <el-form @submit.prevent.native :model="form" ref="identityForm">
            <h3 class="big-title bold">Identity verification</h3>
            <el-form-item
                prop="docType">
                <slot name="label"><div class="uppercase label">Select document type</div></slot>
                <el-select class="document-type" v-model="form.docType">
                    <el-option
                        label="ID Card"
                        value="id_card">
                    </el-option>
                    <el-option
                        label="Driver license"
                        value="driver_license">
                    </el-option>
                    <el-option
                        label="International passport"
                        value="international_passport">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                prop="documentNumber"
                :rules="[
                    { required: true, message: 'Please enter document number', trigger: 'blur' },
                ]">
                <slot name="label"><div class="uppercase label">Document number</div></slot>
                <el-input placeholder="Please enter document number" type="number" v-model="form.documentNumber"></el-input>
            </el-form-item>
            <el-row type="flex" :gutter="15">
                <el-col :xs="24" :md="12">
                    <el-form-item
                        prop="firstName"
                        :rules="[
                        { required: true, message: 'Please enter first name', trigger: 'blur' },
                    ]">
                        <slot name="label"><div class="uppercase label">First name</div></slot>
                        <el-input placeholder="Please enter first name" type="email" v-model="form.firstName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12">
                    <el-form-item
                        prop="lastName"
                        :rules="[
                            { required: true, message: 'Please enter last name', trigger: 'blur' },
                        ]">
                        <slot name="label"><div class="uppercase label">Last name</div></slot>
                        <el-input placeholder="Please enter last name" type="email" v-model="form.lastName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item
                prop="nationality"
                :rules="[
                    { required: true, message: 'Please enter nationality', trigger: 'blur' },
                ]">
                <slot name="label"><div class="uppercase label">Nationality</div></slot>
                <el-select placeholder="Select nationality" v-model="form.nationality">
                    <el-option
                        v-for="country in countryList"
                        :label="country.name"
                        :key="country.country_code"
                        :value="country.alpha_3">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-row type="flex" :gutter="15">
                <el-col :xs="24" :md="12">
                    <el-form-item
                        prop="sex"
                        :rules="[
                            { required: true, message: 'Please select gender', trigger: 'blur' },
                        ]">
                        <slot name="label"><div class="uppercase label">Sex</div></slot>
                        <el-select placeholder="Select gender" v-model="form.sex">
                            <el-option
                                label="Male"
                                value="male">
                            </el-option>
                            <el-option
                                label="Female"
                                value="female">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :md="12">
                    <el-form-item
                        label="Date of birth"
                        prop="birth"
                        :rules="[
                            { required: true, message: 'Please enter birth date', trigger: 'blur' },
                        ]">
                        <el-date-picker
                            placeholder="Date of birth"
                            format="dd/MM/yyyy"
                            :editable="false"
                            v-model="form.birth"
                            type="date">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

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
                            { required: true, message: 'Please select selfie file', trigger: 'change' },
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
                                        type="primary"
                                        v-if="!form.selfie"
                                        slot="trigger"
                                        size="small" round>
                                        <span class="icon"><i class="el-icon-plus"></i></span> Selfie photo
                                    </el-button>
                                    <el-button
                                        class="clear-file"
                                        type="primary"
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
                            { required: true, message: 'Please select front file', trigger: 'change' },
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
                                        type="primary"
                                        size="small" round>
                                        <span class="icon"><i class="el-icon-plus"></i></span> Front photo
                                    </el-button>
                                    <el-button
                                        class="clear-file"
                                        type="primary"
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
            <div v-if="$R.equals('USA', form.nationality)">
                <el-form-item>
                    <div>
                        <span class="big-title bold">Accreditation confirmation</span>
                        <span class="bold accreditation-title">(for USA nation only)</span>
                    </div>
                    <div class="info-tooltip">
                        <span class="uppercase bold">Requirements</span>
                        Please provide as W2 form, or your lawyer document thats confirm your yearly income more than 200K USD
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-upload
                        action="#"
                        :limit="2"
                        multiple
                        :show-file-list="true"
                        :on-change="(file, fileList) => selectFiles(file, fileList, 'wTwoForm')"
                        :auto-upload="false">
                        <el-button
                            class="upload-button"
                            slot="trigger"
                            type="primary"
                            size="small" round>
                            <span class="icon"><i class="el-icon-plus"></i></span> Upload (1-2 photos)
                        </el-button>
                    </el-upload>
                </el-form-item>
            </div>
            <el-button
                :loading="loading"
                class="button" type="primary"
                @click="submit('identityForm')">
                Submit application
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { prop, forEach, path, equals } from 'ramda';
import { prepareValidateErrors } from '../../../helpers/general';
import {
  SET_ACTIVE_TAB,
  SET_STEP
} from '../../../store/modules/general/mutation-types';
import { UPLOAD_DOC_MUTATION } from '../../../graphql/airpay/mutations';
import { SET_AIRPAY_STATE } from '../../../store/modules/airpay/mutation-types';

export default {
  name: 'Identity',
  data: function() {
    return {
      loading: false,
      countryList: require('@/constant/country-list.json'),
      form: {
        docType: 'id_card',
        selfie: null,
        front: null,
        documentNumber: '',
        firstName: '',
        lastName: '',
        nationality: '',
        sex: '',
        birth: '',
        wTwoForm: []
      }
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid, error) => {
        if (valid) {
          let uploadData = {
            selfie: this.form.selfie,
            front: this.form.front,
            docType: this.form.docType,
            input: {
              documentNumber: this.form.documentNumber,
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              nationality: this.form.nationality,
              sex: this.form.sex,
              birth: this.form.birth
            }
          };
          if (equals('USA', this.form.nationality)) {
            [uploadData.usaDocOne, uploadData.usaDocTwo] = this.form.wTwoForm;
          }
          this.loading = true;
          this.$apollo
            .mutate({
              mutation: UPLOAD_DOC_MUTATION,
              variables: uploadData
            })
            .then(response => {
              let verificationHash = path(['data', 'uploadDocs'], response);
              if (verificationHash) {
                this.$store.commit(SET_ACTIVE_TAB, 'VWaitDocument');
                this.$store.commit(`airpay/${SET_AIRPAY_STATE}`, {
                  key: 'verificationHash',
                  value: verificationHash
                });
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
    selectFiles: function(file, fileList, key) {
      this.form[key] = [];
      forEach(fileRaw => {
        let file = prop('raw', fileRaw);
        this.form[key].push(file);
      }, fileList);
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
    .document-type *
        font-weight: bold
        font-size: 20px
    .accreditation-title
        font-size: 18px
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
            padding: 3px 15px
            color: #fff
            font-size: 16px
            .icon
                font-size: 20px
                i
                    vertical-align: middle
        & > div
            position: relative
        .el-upload
            text-align: left
            width: 100%
        button
            text-align: left
            margin: 15px auto
        .clear-file
            width: 100%
            color: #fff
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
