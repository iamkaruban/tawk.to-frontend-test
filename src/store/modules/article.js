// npm packages
import axios from 'axios';

import { baseUrl } from '../../config';

import {
    GET_ARTICLES_BY_CATEGORY,
} from '../actionTypes';

import {
    SET_ARTICLES,
} from '../mutationTypes';

const actions = {
    [GET_ARTICLES_BY_CATEGORY]: ({ commit }, id) => {
        return axios.get(`${baseUrl}/api/category/${id}`)
            .then(({ data }) => {
                commit(SET_ARTICLES, data);
            });
    },
};
const getters = {
    articles: state => state.articles,
};
const mutations = {
    [SET_ARTICLES]: (state, articles) => {
        articles = articles.filter(c => c.status === 'published');
        state.articles = articles;
    },
};
const state = {
    articles: [],
};

export default {
    actions,
    getters,
    mutations,
    state,
}
