import VueRouter from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ './pages/Home');
const About = () => import(/* webpackChunkName: "about" */ './pages/About');

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '*',
      component: { template: '<h2 class="text-medium">Page not found.</h2>' },
    },
  ],
});
