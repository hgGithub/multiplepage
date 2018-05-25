/**
 *该文件主要是做一些关于vue的全局处理，
 *供所有页面使用,如果是有部分页面用到
 *的初始化，请在页面中单独处理，不要添
 *加到该文件中。
 */
import {AlertPlugin, LoadingPlugin} from 'vux'
import Vue from 'vue'
import FastClick from 'fastclick'

// 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/**
 *全局注册AlertPlugin, LoadingPlugin,这样就
 *不需要每个页面都import alert
 */
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)

// 解决click点击300毫秒延时问题
FastClick.attach(document.body)

export default Vue
