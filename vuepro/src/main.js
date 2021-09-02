import Vue from 'vue';
import App from './App';
import router from './router';
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios';
import { message } from 'ant-design-vue';
import qs from 'qs';
import JsonViewer from 'vue-json-viewer';
import CodeEditor from 'bin-code-editor';
import VCharts from 'v-charts';
import jm from 'vue-jsmind'
import store from './store'
import VueCookies from 'vue-cookies';
import Cookies from 'js-cookie'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import jsonlint from 'jsonlint' 
window.jsonlint = jsonlint 
Vue.use(VueCodemirror)
Vue.use(VueCookies)
Vue.use(jm)
Vue.prototype.$axios=axios;
Vue.prototype.$message = message;
Vue.prototype.qs=qs;
// 后端服务和端口http://192.168.96.55:8000/
axios.defaults.baseURL=process.env.API_ROOT
axios.defaults.withCredentials = true;
axios.defaults.timeout = 8000;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (Cookies.get("token")) { 
      config.headers.token = Cookies.get("token");  
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(JsonViewer);
Vue.use(CodeEditor);
Vue.use(VCharts)

new Vue({
    el: '#app',
    router,
    store, 
    components:{App,Antd},
    template:'<App/>'
} );
