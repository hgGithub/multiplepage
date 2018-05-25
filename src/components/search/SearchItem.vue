<template>
  <header class="wb-100percen wb-search-wrap">
    <div class="wb-search-box">
      <div class="wb-search-sbox">
        <i class="iconfont wb-search-icon" @click="searchBtn">&#xe618;</i>
        <input type="text" v-model.trim="entryValue" class="wb-search-institution" name="institution" id="institution" placeholder="请输入姓名/机构">
      </div>
      <div class="wb-search-text"><span @click="searchBtn">搜索</span></div>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'SearchItem',
    data () {
      return {
        entryValue: '',
        seaRes: {
          'state': 0, // 搜索成功与否
          'msg': '',  // 搜索失败相关提示信息
          'data': {}  // 搜索成功锁对应的结果数据
        }
      }
    },
    mounted: function () {

    },
    methods: {
      searchBtn: function (event) {
        this.$emit('searchResult', this.seaRes)
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/base/fonticon';
</style>
<style lang="scss" scoped>
  @import '../../assets/styles/components/searchItem';
</style>
