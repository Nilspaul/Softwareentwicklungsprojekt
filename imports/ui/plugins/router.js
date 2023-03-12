import Vue from 'vue';
import VueRouter from 'vue-router';

import loginBase from '../Views/loginBase.vue';
import mainpageBase from '../Views/mainContentNew.vue';
import resetPassword from '../Views/resetPassword.vue';
import calendar from '../Views/calendar.vue'
import landingPage from '../Views/landingpage.vue'
import moduleManagement from '../Views/moduleManagement.vue'
Vue.use(VueRouter);

const routes = [
    { path: '*', redirect: '/login' },
    // Login
    { path: '/login', component: loginBase, name: 'login' },
    //Landingpage
    {path: '/landingpage', component: landingPage, name: 'landingpage'},
    //Landingpagen
    {path: '/moduleManagement', component: moduleManagement, name: 'moduleManagement'},
    //MainContent
    { path: '/mainpage/:moduleName', component: mainpageBase, name: 'mainpage' },
    //ResetPassword
    { path: '/reset-password/:token', name: 'resetPassword', component: resetPassword},
    //calendar
    {path: '/calendar', component: calendar, name: 'calendar'}
];

export const router = new VueRouter({ mode: 'history', routes });

router.beforeEach((to, from, next) => {
    const isLoggedIn = Meteor.user() !== null;
    if (to.name !== 'login' && !isLoggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  });