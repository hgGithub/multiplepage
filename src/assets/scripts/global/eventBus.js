/**
 * 创建事件总线，管理全局的状态，兄弟组件状态等，
 * 当项目较大，单向数据流之外的通信较多时，
 * 请统一用vuex进行状态管理。
 */
import Vue from 'vue'
let bus = new Vue()

/**
 * [obj 全局状态，控制路由加载时，loading状态是否显示]
 * @type {Object}
 * @param {loading} true: loading, flase: unloading
 */
let obj = {
  isLoading: false
}

bus.$on('loading', function (flag) {
  if (flag) {
    obj.isLoading = true
  } else {
    obj.isLoading = false
  }
})

export {
  bus,
  obj
}
