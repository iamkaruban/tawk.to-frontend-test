<template>
    <div class="main-wrapper">
        <div class="container">
            <b-breadcrumb>
                <b-breadcrumb :items="items"></b-breadcrumb>
            </b-breadcrumb>
            <!-- TODO: move to a component -->

            <h3 class="text-center">Showing results for "<span class="highlight">{{ query }}</span>"</h3>

            <b-list-group class="px-md-3 pt-sm-3 pt-md-0">
                <b-list-group-item v-for="article in articles" :key="article.id" class="mt-3">
                    <section class="row">
                        <div class="col-auto pl-4">
                            <i class="fas" :class="{ ['fa-' + article.icon]: true }"></i>
                        </div>
                        <div class="col">
                            <h5>{{ article.title }}</h5>
                            <p class="last-update">{{ article.content }}</p>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </section>
                </b-list-group-item>
            </b-list-group>

            <div v-if="!articles.length" class="mt-5">
                <img src="../assets/images/empty-search.svg" alt="">
                <h3 class="text-center">No search results</h3>
                <p class="text-center">Please, try again or <span class="highlight">Submit a ticket</span></p>
            </div>
        </div>
        <hr>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { mapActions, mapGetters, mapMutations } from 'vuex';
    import _ from 'lodash';
    import moment from 'moment';

    import { Carousel, Slide } from 'vue-carousel'
    import { BBreadcrumb, BListGroup } from 'bootstrap-vue'

    import {
        GET_CATEGORIES,
        GET_ARTICLES_BY_CATEGORY,
        SEARCH_ARTICLES,
    } from "../store/actionTypes";

    import { SET_CATEGORY } from "../store/mutationTypes";

    Vue.filter('formatDate', function(value) {
        if (value) {
            return moment(String(value)).format('ll');
        }
    });

    export default {
        created () {
            this.setupBreadcrumbs();
            this.search();
        },

        data: () => ({
            query: null,
        }),

        watch: {
            $route(to, from) {
                if (to.path.includes('result')) {
                    this.search();
                }
            },
        },

        components: {
            Carousel,
            Slide,
            BBreadcrumb,
            BListGroup,
        },

        computed: {
            ...mapGetters([
                'category',
                'categories',
                'articles',
            ]),
        },

        methods: {
            ...mapActions([
                GET_CATEGORIES,
                GET_ARTICLES_BY_CATEGORY,
                SEARCH_ARTICLES,
            ]),

            ...mapMutations([
                SET_CATEGORY,
            ]),

            search () {
                this.query = this.$route.query.text;
                this.SEARCH_ARTICLES(this.query);
            },

            setupBreadcrumbs () {
                this.items = [
                    {
                        text: 'All categories',
                        href: '/#/home'
                    },
                    {
                        text: 'Search results',
                        href: '/'
                    },
                ];
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '../scss/_variables.scss';
    .main-wrapper {
        background-color: #FAFAFA;
        font-family: $font-family;

        span.highlight {
            color: $green;
        }

        button:focus,
        select:focus {
            outline: none !important;
        }

        .last-update {
            color: $text-gray;
            line-height: 1;
        }

        .breadcrumb {
            background-color: transparent !important;
            margin-bottom: 0;
            padding-left: 0;
            padding-right: 0;
            a {
                color: $green;
            }
            ol {
                margin-bottom: 0;
                padding: 0;
            }
        }

        .list-group-item {
            margin-bottom: 16px;
            border: 1px solid #EEE;
            border-radius: 4px;
            background-color: white;
            padding-top: 16px;
            padding-bottom: 16px;
            i {
                color: $green;
                line-height: 3.1;
            }
        }

        p {
            margin: 0;
            font-size: 12px;
        }

        .container {
            margin: 0 auto;
            height: 100%;
        }
    }
</style>
