// npm packages
import axios from 'axios';

import { baseUrl } from '../../config';

import {
    GET_ARTICLES_BY_CATEGORY,
    SEARCH_ARTICLES,
} from '../actionTypes';

import {
    SET_ARTICLES,
    SET_SEARCHED_ARTICLES,
} from '../mutationTypes';

const actions = {
    [GET_ARTICLES_BY_CATEGORY]: ({ commit }, id) => {
        return axios.get(`${baseUrl}/api/category/${id}`)
            .then(({ data }) => {
                commit(SET_ARTICLES, data);
            });
    },
    [SEARCH_ARTICLES]: ({ commit }, query) => {
        return axios.get(`${baseUrl}/api/search/${query}`)
            .then(({ data }) => {
                commit(SET_SEARCHED_ARTICLES, data.filter(d => d.title.toLowerCase().includes(query)));
            });
    }
};
const getters = {
    articles: state => state.articles,
};
const mutations = {
    [SET_ARTICLES]: (state, articles) => {
        articles = articles.filter(c => c.status === 'published');
        state.articles = articles;
    },
    [SET_SEARCHED_ARTICLES]: (state, articles) => {
        articles = articles.filter(c => c.status === 'published' || c.status === 'archived');
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
