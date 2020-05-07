import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import Router from './router';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: Router,
  vuetify,
});
