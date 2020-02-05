// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitterSquare, faGithubSquare, faItchIo } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

import Lightbox from 'vue-easy-lightbox'

import VueCodeHighlight from 'vue-code-highlight';
import 'prism-es6/components/prism-markup-templating';
import 'prism-es6/components/prism-java';
import 'prism-es6/components/prism-c';

import './prism-monokai.css'

import { CardPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

library.add(
  faTwitterSquare,
  faGithubSquare,
  faItchIo
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

Vue.use(Lightbox);
Vue.use(VueCodeHighlight);
Vue.use(CardPlugin);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
