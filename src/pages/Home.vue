<template>
    <div class="main-wrapper">
        <div class="container">
            <div class="list">
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
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';

    import { GET_CATEGORIES } from "../store/actionTypes";

    export default {
        created () {
            this.GET_CATEGORIES();
        },

        computed: {
            ...mapGetters([
                'categories',
            ]),
        },

        methods: {
            ...mapActions([
                GET_CATEGORIES,
            ]),
        },
    }
</script>
<style lang="scss" scoped>
    @import '../scss/_variables.scss';
    .main-wrapper {
        p {
            margin: 0;
            font-size: 12px;
        }
        background-color: #FAFAFA;
        font-family: $font-family;

        .list {
            /*max-width: 1200px;*/
            margin: 0 auto;
            padding: 150px 30px;
            height: 100%;

            .category-container {
                border: 1px solid #EEE;
                border-radius: 4px;
                background-color: white;
                display: block;
                cursor: pointer;
                text-decoration: none;
                i {
                    text-align: center;
                    display: block;
                    font-size: 72px;
                    margin-bottom: 24px;
                    color: $green;
                }

                h5 {
                    font-weight: bold;
                    color: $text-black;
                    margin-bottom: 16px !important;
                }

                .article-count {
                    color: $green;
                }

                .last-update {
                    color: $text-gray;
                    line-height: 1;
                }
            }
        }
    }
</style>
