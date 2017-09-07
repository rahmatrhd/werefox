// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import axios from 'axios'
import App from './App'
import router from './router'
import './assets/master.css'
import * as firebase from 'firebase'

Vue.use(VueFire)

const config = {
  apiKey: 'AIzaSyCShzi9wGw1mgOoe4hdZBeU1ynr_rz3zG4',
  authDomain: 'werefox-hacktiv8.firebaseapp.com',
  databaseURL: 'https://werefox-hacktiv8.firebaseio.com',
  projectId: 'werefox-hacktiv8',
  storageBucket: '',
  messagingSenderId: '31733613921'
}
const firebaseApp = firebase.initializeApp(config)

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: `http://loclhost:3000`
})
Vue.prototype.$db = firebaseApp.database()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
