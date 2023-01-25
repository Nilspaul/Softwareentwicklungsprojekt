import Vue from 'vue';
import VueRouter from 'vue-router';

import loginBase from '../Views/loginBase.vue';
import mainpageBase from '../Views/mainContent.vue';
import toDoMain from '../Views/toDoMain.vue'
Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/login' },
    // Login
    { path: '/login', component: loginBase, name: 'login' },
    //MainPage
    { path: '/mainpage', component: mainpageBase, name: 'mainpage' },

    //ToDos
    { path: '/toDo', component: toDoMain, name: 'toDo' },
];


export const router = new VueRouter({ routes });