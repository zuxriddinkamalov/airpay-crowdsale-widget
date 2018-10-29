<template>
  <el-container
    class="main-container"
    element-loading-spinner="el-icon-loading"
      element-loading-background="#ebeef4"
    v-loading.fullscreen="airpay.loading">
    <el-main
      class="home"
      v-if="!airpay.loading">
      <v-container v-if="airpay.settings" :settings="airpay" />
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src

import { mapState } from 'vuex'
import VContainer from './components/Container'

export default {
  name: 'home',
  computed: {
    ...mapState(['airpay'])
  },
  components: {
    VContainer
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
  width: 100%;
}
.home {
  padding: 10px;
}
</style>
