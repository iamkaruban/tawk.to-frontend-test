// npm packages
import Vue from 'vue';
import Vuex from 'vuex';

// our packages
import category from './modules/category';
import article from './modules/article';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        category,
        article,
    }
});
