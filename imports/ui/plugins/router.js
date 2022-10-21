import Vue from 'vue';
import VueRouter from 'vue-router';

import loginBase from '../components/login/loginBase';
import mainpageBase from '../components/mainpage/mainpageBase';
import loginForm from '../components/login/loginForm'
Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/login'},
  // Login
  {path: '/login', component: loginForm, name: 'login'},
  //MainPage
  {path:'/mainpage', component: mainpageBase, name: 'mainpage'},
 
];

export const router = new VueRouter({routes});

