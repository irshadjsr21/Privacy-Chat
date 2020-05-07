import Vue from 'vue';
import VueRouter from 'vue-router';
import Router from './router';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: Router,
  mounted() {
    
    console.log(this.$route);
    console.log(this);
  },
});
