import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// you can see more in https://github.com/surmon-china/vue-awesome-swiper

if (process.BROWSER_BUILD) {
  Vue.use(VueAwesomeSwiper)
}
