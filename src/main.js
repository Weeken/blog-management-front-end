import 'babel-polyfill'
require('es6-promise').polyfill()
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import 'css/reset.css'
import API from 'api/api'
import {Alert} from 'lib/alert'
import Storage from 'lib/local_storage'
import Validation from 'vuelidate'
import VueCropper from 'vue-cropper-simple'
import VueWangeditor from 'vue-wangeditor-simple'
// import 'prismcss'
// import Prism from 'prismjs/prism'
// import 'prismless'
import './filters/filter'

Vue.use(Router)
Vue.use(Validation)
Vue.use(VueCropper)
Vue.use(VueWangeditor)

Vue.config.productionTip = false

Vue.prototype.$http = API
Vue.prototype.$storage = Storage
// Vue.prototype.$prism = Prism
Vue.prototype.Alert = new Alert()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new Router(routes),
  template: '<App/>',
  components: { App }
})
