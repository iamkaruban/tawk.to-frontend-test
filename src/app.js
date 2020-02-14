import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import VueTimeago from 'vue-timeago'
import VueCarousel from 'vue-carousel'
import { BootstrapVue } from 'bootstrap-vue'

Vue.use(VueTimeago, {
	name: 'Timeago',
	locale: 'en',
});
Vue.use(VueCarousel);
Vue.use(BootstrapVue);

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App),
});

