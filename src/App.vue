<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
import { obj } from './scripts/eventBus/index'

export default {
  name: 'app',
  data () {
    return {
      isLoading: obj.isLoading
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="scss">
  @import './styles/main'
</style>
<style lang="less">
  @import '~vux/src/styles/reset';
</style>
