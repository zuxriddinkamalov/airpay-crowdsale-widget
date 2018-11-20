<template>
    <div>
        <h3 class="big-title bold">Agreement</h3>
        <div class="agreement" @scroll="readAgreement">
            {{ $R.path(['settings', 'agreement'], airpay) }}
        </div>
        <el-button
            :loading="loading"
            class="button" type="primary"
            @click="imAgree">
            Yes, I'm agree with this terms
        </el-button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { path } from 'ramda';
import {
  SET_ACTIVE_TAB,
  SET_STEP
} from '../../../store/modules/general/mutation-types';

export default {
  name: 'Agreement',
  data: function() {
    return {
      loading: false
    };
  },
  methods: {
    readAgreement: function(e) {
      // console.warn(e.target.scrollTop)
      // console.warn(e)
      // scrollHeight
      // clientHeight
    },
    imAgree: function() {
      let isWhitelisted = path(['authData', 'isWhitelisted'], this.airpay);
      if (isWhitelisted) {
        this.$store.commit(SET_STEP, 3);
        this.$store.commit(SET_ACTIVE_TAB, 'VEthereum');
      } else {
        this.$store.commit(SET_STEP, 2);
        this.$store.commit(SET_ACTIVE_TAB, 'VIdentity');
      }
    }
  },
  computed: {
    ...mapState(['airpay'])
  }
};
</script>

<style lang="sass" scoped>
    .agreement
        padding: 10px 15px
        -webkit-border-radius: 5px
        -moz-border-radius: 5px
        border-radius: 5px
        background: #EBEEF4
        max-height: 180px
        overflow-y: auto
        margin-bottom: 20px
        line-height: 1.4
        &::-webkit-scrollbar-track
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
            margin: 5px 2px
            padding: 5px 2px
            background-color: #F8F9FB
        &::-webkit-scrollbar
            width: 5px
            background-color: #CAD0DA
        &::-webkit-scrollbar-thumb
            margin: 5px 2px
            border-radius: 10px
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
            background-color: #CAD0DA
</style>
