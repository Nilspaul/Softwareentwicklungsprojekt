import Vue from 'vue';
import VueRouter from 'vue-router';

import loginBase from '../components/login/loginBase';
import mainpageBase from '../components/mainpage/mainpageBase';
import toDoBase from '../components/mainpage/ToDos/toDoBase.vue'
Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/login' },
    // Login
    { path: '/login', component: loginBase, name: 'login' },
    //MainPage
    { path: '/mainpage', component: mainpageBase, name: 'mainpage' },

    //ToDos
    { path: '/toDos', component: toDoBase, name: 'toDo' }
];

export const router = new VueRouter({ routes });