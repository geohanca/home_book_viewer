import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStepForward, faStepBackward, faPlay, faPause, faAlignLeft, faAlignJustify } from '@fortawesome/free-solid-svg-icons'

Vue.component("font-awesome-icon", FontAwesomeIcon);

library.add(faStepForward, faStepBackward, faPlay, faPause, faAlignLeft, faAlignJustify)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
