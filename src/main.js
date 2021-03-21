import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VeuRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform.js';

Vue.use(VueResource);
Vue.use(VeuRouter);

const router = new VeuRouter({ 
  routes,
  mode: 'history'
 });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
