/* global Vue */
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

// eslint-disable-next-line import/prefer-default-export
export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
