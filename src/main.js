// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import $ from 'jquery'

//富文本组件
import VueQuillEditor from 'vue-quill-editor'

//裁剪组件
import Croppa from 'vue-croppa'


import * as custom from './common/filters/custom'
import store from './store/store'
import * as types from './store/types'

Vue.use(Vuex)
Vue.use(echarts)
Vue.use(ElementUI)
Vue.use(require('vue-wechat-title'))
Vue.use(VueQuillEditor)
Vue.use(Croppa)



Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

import AMap from 'vue-amap'
Vue.use(AMap)
AMap.initAMapApiLoader({
	key: '1fdd6c968bc0747775e79c0d9346db4c', //自己申请
	plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
		'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
		'AMap.CircleEditor',
		'AMap.Geolocation'
	]
})
//引入封装请求
//// 页面样式初始化 - css
import './assets/css/animate.css';
//import './assets/css/style.css';
import './assets/css/colors/blue.css';
import 'element-ui/lib/theme-default/index.css'
import './assets/css/common.css';
//import './assets/css/skin.css';
window.Hls = require('hls.js');
console.log('aasdasdsadsa',window.Hls)



//require('video.js/dist/video-js.css')
//require('vue-video-player/src/custom-theme.css')
//import VideoPlayer from 'vue-video-player'
//Vue.use(VideoPlayer);
//require('videojs-contrib-hls/dist/videojs-contrib-hls');




//引入样式
import 'vue-croppa/dist/vue-croppa.css';

if(window.sessionStorage.getItem('xtoken')){
	store.commit(types.TOKEN,JSON.parse(window.sessionStorage.getItem('xtoken')).token)
}

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/'
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
    if (store.state.token) {
//      config.headers.Authorization = `Token ${store.state.token}`;
        config.url+="?token="+store.state.token;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});


// http response 拦截器
axios.interceptors.response.use(
response => {
    return response;
},
error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
            // 返回 401 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT);
            router.replace({
                path: '/'
            })
        }
    }
//  return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  template: '<App/>',
  components: { App }
})
