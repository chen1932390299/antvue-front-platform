import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
       
        defalutKey:'1',
        suiteKey:'1',
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''

    },
    mutations: {
      
        changeLogin (state, user) {
          state.Authorization = user.Authorization;
          localStorage.setItem('Authorization', user.Authorization);
        }
      }
})

export default store