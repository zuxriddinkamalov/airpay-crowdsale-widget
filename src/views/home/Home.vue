<template>
  <el-container
    class="main-container"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
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

import { mapState } from 'vuex';
import VContainer from './components/Container';

export default {
  name: 'home',
  computed: {
    ...mapState(['airpay'])
  },
  components: {
    VContainer
  }
};
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
