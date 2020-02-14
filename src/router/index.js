import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home.vue';
import Category from '../pages/Category.vue';

Vue.use(Router);

const routes = [
    { path: '/', component: Home },
    { path: '/category/:id', component: Category },
    { path: '*', redirect: '/' },
];

export const router = new Router({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
