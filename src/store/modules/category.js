// npm packages
import axios from 'axios';

import { baseUrl } from '../../config';

import {
    GET_CATEGORIES,
} from '../actionTypes';

import {
    SET_CATEGORY,
    SET_CATEGORIES,
} from '../mutationTypes';

const actions = {
    [GET_CATEGORIES]: ({ commit }) => {
        return axios.get(`${baseUrl}/api/categories`)
            .then(({ data }) => {
                commit(SET_CATEGORIES, data);
            });
    },
};
const getters = {
    category: state => state.category,
    categories: state => state.categories,
};
const mutations = {
    [SET_CATEGORY]: (state, category) => {
        state.category = category;
    },
    [SET_CATEGORIES]: (state, categories) => {
        categories = categories.filter(c => c.enabled);
        state.categories = categories.sort(function (a, b) {  return a.order - b.order;  });
    },
};
const state = {
    category: null,
    categories: [],
};

export default {
    actions,
    getters,
    mutations,
    state,
}
