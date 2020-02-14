<template>
    <div class="main-wrapper">
        <div class="container">
            <b-breadcrumb>
                <b-breadcrumb :items="items"></b-breadcrumb>
            </b-breadcrumb>
            <!-- TODO: move to a component -->
            <div class="row">
                <div class="col-sm-auto">
                    <div v-if="category" class="left-category-container pt-5 pb-4 px-4">
                        <section class="article-count">
                            <p><i class="fas fa-file-alt info"></i>&nbsp;&nbsp;&nbsp;<span>{{ category.totalArticle }}</span></p>
                        </section>
                        <i class="fas" :class="{ ['fa-' + category.icon]: true }"></i>
                        <h5 class="text-center title">{{ category.title }}</h5>
                        <p class="text-center last-update">Updated <timeago :datetime="category.updatedOn"></timeago></p>
                        <hr>
                        <section class="px-3">
                            <i class="fas fa-info-circle info"></i>
                            <p class="text-center description">{{ category.description }}</p>
                        </section>
                    </div>
                </div>
                <div class="col">
                    <b-list-group class="px-md-3 pt-sm-3 pt-md-0">
                        <b-list-group-item v-for="article in articles" :key="article.id">
                                <section class="row">
                                    <div class="col-auto pl-4">
                                        <i class="fas" :class="{ ['fa-' + article.icon]: true }"></i>
                                    </div>
                                    <div class="col">
                                        <h5>{{ article.title }}</h5>
                                        <p class="last-update">Updated {{article.updatedOn | formatDate}}</p>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </section>
                        </b-list-group-item>
                    </b-list-group>
                </div>
            </div>
        </div>
        <hr>
        <div class="container">
            <h5 class="text-center mt-5 mb-4">Other categories</h5>
            <carousel
                    class="pb-5"
                    :navigationPrevLabel='"<span style=\"margin-right: 16px; border-radius: 50%; background-color: white; padding: 16px 20px\"><i class=\"fas fa-chevron-left\" style=\"color: #9C9AA6\"></i></span>"'
                    :navigationNextLabel='"<span style=\"margin-left: 16px; border-radius: 50%; background-color: white; padding: 16px 20px\"><i class=\"fas fa-chevron-right\" style=\"color: #9C9AA6\"></i></span>"'
                    :navigationEnabled="true"
                    :mouse-drag="false"
                    :paginationEnabled="false"
                    :per-page="1">
                <slide v-for="(categories, idx) in chunkedCategories" :key="idx">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-xs-12" v-for="category in categories">
                            <a :href="'/#/category/' + category.id" class="category-container my-3 py-5 px-4">
                                <i class="fas" :class="{ ['fa-' + category.icon]: true }"></i>
                                <h5 class="text-center title">{{ category.title }}</h5>
                                <p class="text-center article-count">{{ category.totalArticle || 'No ' }} article{{ category.totalArticle > 1 ? 's' : '' }}</p>
                                <p class="text-center last-update">Last update <timeago :datetime="category.updatedOn"></timeago></p>
                            </a>
                        </div>
                    </div>
                </slide>
            </carousel>
        </div>
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
        GET_ARTICLES_BY_CATEGORY
    } from "../store/actionTypes";

    import { SET_CATEGORY } from "../store/mutationTypes";

    Vue.filter('formatDate', function(value) {
        if (value) {
            return moment(String(value)).format('ll');
        }
    });

    export default {
        created () {
            const { id } = this.$route.params;
            this.init(id);
        },

        data: () => ({
           items: [],
            chunkedCategories: [],
        }),

        watch: {
            $route(to, from) {
                this.init(to.params.id);
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
            ]),

            ...mapMutations([
                SET_CATEGORY,
            ]),

            init (id) {
                if (this.categories.length) {
                    this.chunkedCategories = _.chunk(this.categories.filter(c => c.id !== id), 3);
                    this.SET_CATEGORY(this.categories.find(c => c.id === id));
                    this.setupBreadcrumbs();
                } else {

                    this.GET_CATEGORIES()
                        .then(() => {
                            this.chunkedCategories = _.chunk(this.categories.filter(c => c.id !== id), 3);
                            this.SET_CATEGORY(this.categories.find(c => c.id === id));
                            this.setupBreadcrumbs();
                        });
                }
                this.GET_ARTICLES_BY_CATEGORY(id);
                this.$forceUpdate();
            },

            setupBreadcrumbs () {
                this.items = [
                    {
                        text: 'All categories',
                        href: '/#/home'
                    },
                    {
                        text: this.category && this.category.title,
                        href: '/#/category'
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

            .category-container, .left-category-container {
                border: 1px solid #EEE;
                border-radius: 4px;
                background-color: white;
                display: block;
                cursor: pointer;
                text-decoration: none;
                color: $text-black;

                i {
                    text-align: center;
                    display: block;
                    font-size: 72px;
                    margin-bottom: 24px;
                    color: $green !important;
                }

                h4 {
                    font-weight: bold;
                    color: $text-black;
                    margin-bottom: 16px !important;
                }

                .article-count {
                    color: $green;
                }
            }
            .left-category-container {
                width: 360px;
                padding-left: 0 !important;
                padding-right: 0 !important;
                position: relative;

                .article-count {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                    p {
                        display: inline-flex;
                        span {
                            color: $text-gray;
                        }
                    }
                }

                .info {
                    font-size: 18px;
                    margin-bottom: 16px;
                }

                .description {
                    color: $text-gray;
                }
            }
        }
    }
</style>
