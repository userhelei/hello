import Vue from 'vue'
import App from './App'

// 公共自定义头部
import cuTabBar from './components/custom/cu-tabBar.vue'
Vue.component('cu-tabBar',cuTabBar)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
