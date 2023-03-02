import Vue from 'vue';
import VueRouter from 'vue-router';

import loginBase from '../Views/loginBase.vue';
import mainpageBase from '../Views/mainContentNew.vue';
import toDoMain from '../Views/toDoMain.vue';
import resetPassword from '../Views/resetPassword.vue'
Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/login' },
    // Login
    { path: '/login', component: loginBase, name: 'login' },
    //MainPage
    { path: '/mainpage', component: mainpageBase, name: 'mainpage' },
    //ToDos
    { path: '/toDo', component: toDoMain, name: 'toDo' },
    //ResetPassword
    { path: '/reset-password/:token', name: 'resetPassword', component: resetPassword,}
];


export const router = new VueRouter({ mode: 'history', routes });