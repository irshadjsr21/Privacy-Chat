import VueRouter from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ './pages/Home');
const Join = () => import(/* webpackChunkName: "join" */ './pages/Join');
const Chat = () => import(/* webpackChunkName: "chat" */ './pages/Chat');

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/join',
      component: Join,
    },
    {
      path: '/chat/:id',
      component: Chat,
    },
    {
      path: '*',
      component: { template: '<h2 class="text-medium">Page not found.</h2>' },
    },
  ],
});
