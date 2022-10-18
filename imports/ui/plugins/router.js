import Vue from 'vue';
import VueRouter from 'vue-router';

import loginBase from '../components/login/loginBase'
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  // Login
  {path: '/login', component: loginBase, name: 'login'},
 
];

export const router = new VueRouter({routes});

