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

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {
            next({
                name: 'login'
            })
        } else {
            next()
        }
    }
    if (to.matched.some(record => record.meta.admin)) {
        if (store.getters.loggedUser.type !== 'admin') {
            next({
                name: 'mainpage'
            })
        } else {
            next()
        }
    }
    next()
});


export const router = new VueRouter({ routes });