import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import HomePage from "./views/HomePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";

Vue.use(Router);

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/auth/login',
      component: LoginPage
    },
    {
      path: '/auth/signup',
      component: SignupPage
    },



    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    {
      path: '/user/dashboard',
      component: () => import(/* webpackChunkName: "user" */ './views/DashboardPage.vue')
    },
    {
      path: '/user/note/add',
      component: () => import(/* webpackChunkName: "user" */ './views/AddNotePage.vue')
    },
    {
      path: '/user/note/:id/edit',
      component: () => import(/* webpackChunkName: "user" */ './views/EditNotePage.vue')
    }
  ]
});



router.beforeEach((to, from, next) => {

  console.log(to, from, store, store.auth);

  //going from unsecured to secured route?
  if (to && to.path.startsWith('/user/')) {
    if (store && !store.state.auth.isAuthenticated) {
      return next({ path: '/auth/login', replace: true });
    }
  }


  //going to unsecured route?
  if (to && to.path.startsWith('/auth/')) {
    if (store && store.state.auth.isAuthenticated) {
      return next({ path: '/auth/dashboard', replace: true });
    }
  }

  //user can proceed
  next();
});



export default router;