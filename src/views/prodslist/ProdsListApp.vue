<template>
  <div id="index" class="wb-index">
    <search-item @searchResult="searchResult"></search-item>
    <p class="wb-index-title">服务城市</p>
    <ul class="wb-index-cities" v-if="search">
      <li class="wb-index-city" v-for="(item, index) in cities" :key="index">{{item}}</li>
    </ul>
    <div class="wb-index-board">
      <section id="wb-index-paint" class="wb-index-paint" @touchmove="move"></section>
      <button class="wb-index-paint-btn wb-index-dele" @click="clearPaint">取消</button>
      <button class="wb-index-paint-btn wb-index-save" @click="savePaint">保存</button>
    </div>
    <actionsheet v-model="show7" :menus="menu7" :close-on-clicking-mask="false" theme="android" @on-click-menu="popClick"></actionsheet>
    <button class="test-btn" type="button" @click="test">api测试</button>
    <loading v-model="isLoading"></loading>
  </div>
</template>
<script>
  import { Loading, Actionsheet } from 'vux'
  import SearchItem from '@/components/search/SearchItem'
  import $ from 'jquery'
  require('jq-signature')
  export default {
    name: 'ProdsList',
    data () {
      return {
        cities: ['安徽', '北京', '东莞', '广东', '海南', '河北',
          '河南', '黑龙江', '湖南', '江苏', '内蒙古', '宁波'],
        search: true,
        entryValue: '',
        isLoading: false,
        show7: false,
        menu7: [{
          label: 'Actionsheet header',
          type: 'info'
        },
        {
          label: 'Primary',
          type: 'primary',
          value: 'hello',
          otherProp: 'hey'
        },
        {
          label: 'Warn',
          type: 'warn'
        },
        {
          label: 'Disabled',
          type: 'disabled'
        },
        {
          label: 'Default'
        }]
      }
    },
    mounted: function () {
      // 初始化jq-signature h5 数字签名
      $('.wb-index-paint').jqSignature({
        autoFit: true,
        height: '98'
      })
    },
    components: {
      SearchItem,
      Loading,
      Actionsheet
    },
    methods: {
      searchBtn: function (event) {
        this.$vux.alert.show({
          title: 'Vux is Cool',
          content: this.entryValue
        })
      },
      searchResult: function () {
        // this.$vux.alert.show({
        //   title: 'Vux is Cool',
        //   content: this.entryValue
        // })
        this.show7 = true
      },
      clearPaint: function () {
        $('.wb-index-paint').jqSignature('clearCanvas')
      },
      savePaint: function () {
        var dataUrl = $('.wb-index-paint').jqSignature('getDataURL')
        console.log('dataUrl: ', dataUrl)
      },
      move: function (e) {
        e.preventDefault()
        return false
      },
      popClick: function (menuKey, menuItem) {
        console.log(menuKey, menuItem, 'hh')
      },
      test: function () {
        const data = { 'uuid': 'test' }
        var url = '/wtb/main/test'
        $.ajax({
          url: url,
          type: 'GET',
          datatype: 'json',
          data: data,
          success: function (data) {
            console.log('data: ', data)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/base/main';
  @import '../../assets/styles/pages/prodslist';
</style>
<style lang="less">
  @import '~vux/src/styles/reset';
</style>

