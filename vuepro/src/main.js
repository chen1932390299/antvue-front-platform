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
import VCharts from 'v-charts'
Vue.prototype.$axios=axios;
Vue.prototype.$message = message;
Vue.prototype.qs=qs;
axios.defaults.baseURL='http://192.168.96.55:8000/'
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(JsonViewer);
Vue.use(CodeEditor);
Vue.use(VCharts)
new Vue({
    el: '#app',
    router,
    components:{App,Antd},
    template:'<App/>'
} );
