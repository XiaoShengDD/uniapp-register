import Vue from 'vue'
import App from './App'

// uview
import uView from "uview-ui";
import 'uview-ui/theme.scss';
Vue.use(uView);


// 公共方法
import utils from "@/common/utils.js";
Vue.prototype.$utils = utils


// 是否连接网络
import lib from "@/common/lib.js";
Vue.prototype.$lib = lib


// 国际化方法
import i18n from '@/common/i18n.js'
Vue.prototype._i18n = i18n;

// 请求
import {
	AppServices
} from "@/services";
Vue.prototype.$appserve = AppServices;

// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
	  i18n,
    app
  }
}
// #endif