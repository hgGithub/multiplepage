<template>
  <div id="index" class="wb-index">
    <search-item @searchResult="searchResult"></search-item>
    <p class="wb-index-title">服务城市</p>
    <ul class="wb-index-cities" v-if="search">
      <li class="wb-index-city" v-for="(item, index) in cities" :key="index">{{item}}</li>
    </ul>
    <button @click="test">actionsheet</button>
    <actionsheet v-model="show7" :menus="menu7" theme="android" @on-click-menu="menuClick" :close-on-clicking-mask="false"></actionsheet>
      <popup v-model="show" :hide-on-blur="false" height="70%">
        <h1>firt line</h1>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <h2>secd line</h2>
        <input @click="radioClick" type="radio" name="radion-btn">
      </popup>
      <input type="file" name="file-test" accept="image/gif, image/jpeg">
  </div>
</template>
<script>
  import { Loading, Actionsheet, Popup } from 'vux'
  import SearchItem from '@/components/search/SearchItem'
  export default {
    name: 'Index',
    data () {
      return {
        cities: ['安徽', '北京', '东莞', '广东', '海南', '河北',
          '河南', '黑龙江', '湖南', '江苏', '内蒙古', '宁波'],
        search: true,
        entryValue: '',
        isLoading: false,
        show7: false,
        menu7: [{
          label: 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
          type: 'info'
        }, {
          label: 'Primary',
          type: 'primary',
          value: 'this is  a test chengxu!'
        }, {
          label: 'Warn',
          type: 'warn'
        }, {
          label: 'Disabled',
          type: 'disabled'
        }, {
          label: 'Default'
        }],
        show: false
      }
    },
    mounted: function () {

    },
    components: {
      SearchItem,
      Loading,
      Actionsheet,
      Popup
    },
    methods: {
      searchBtn: function (event) {
        this.$vux.alert.show({
          title: 'Vux is Cool',
          content: this.entryValue
        })
      },
      searchResult: function (event) {
        this.searchBtn()
      },
      menuClick: function (event) {
        console.log('this is menu!', event)
      },
      test: function () {
        this.show = true
      },
      radioClick: function () {
        console.log('click this radio btn!')
        this.show = false
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/base/main'
</style>
<style lang="scss" scoped>
  @import '../../assets/styles/components/indexApp'
</style>
<style lang="less">
  @import '~vux/src/styles/reset';
</style>

