import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home.vue';
import Category from '../pages/Category.vue';
import Result from '../pages/Results.vue';

Vue.use(Router);

const routes = [
    { path: '/', component: Home },
    { path: '/category/:id', component: Category },
    { path: '/result', component: Result },
    { path: '*', redirect: '/' },
];

export const router = new Router({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
