import Vue from '@/assets/scripts/global/global'
import ProdsList from './ProdsListApp'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<ProdsList/>',
  components: { ProdsList }
})
