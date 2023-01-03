import Vue from 'vue'
import axios from 'axios'
import App from '@/App.vue'
import '@/assets/styles/sass/app.scss'
import '@/assets/styles/sass/themes/uvc.scss'
import '@/assets/styles/uvc-scss/uvc-app.scss'
import router from '@/routes/router'
import GullKit from '@/plugins/gull.kit'
import VueCompositionApi, { provide } from '@vue/composition-api'
import notifier from '@/plugins/notifier'
import store from '@/store'
import Breadcumb from '@/components/breadcumb'
import Header from '@/components/page-header'
import { i18n, i18nComposable } from '@/lang/lang'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'devextreme/dist/css/dx.light.compact.css'
import 'font-awesome/css/font-awesome.min.css'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import InstantSearch from 'vue-instantsearch'
import Datepicker2 from 'vue2-datepicker'
import toast from '@/components/toast'
import { MultiSelectPlugin } from '@syncfusion/ej2-vue-dropdowns'
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns'
import { BootstrapVueIcons } from 'bootstrap-vue'
import { FontAwesomeIcon, FontawesomeIcon } from '@fortawesome/vue-fontawesome'
import ButtonInstaller from 'vue-elder-button'
import Vs from 'd3-vs'
import Vue2Filters from 'vue2-filters'
import vue2Dropzone from 'vue2-dropzone'
import naver from 'vue-naver-maps'
import VueFriendlyIframe from 'vue-friendly-iframe'
import VueFullscreen from 'vue-fullscreen'
import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'
import VueDraggable from 'vue-draggable'

MultiSelect.Inject(CheckBoxSelection)

Vue.use(naver, {
  clientID: '78pbimsjou',
  useGovAPI: false, // 공공 클라우드 API 사용 (선택)
  subModules: '' // 서브모듈 (선택)
})

Vue.component('CustomToast', toast)
Vue.component('VueSlider', VueSlider)
Vue.component('Datepicker2', Datepicker2)

// defined as global component
Vue.component('Breadcumb', Breadcumb)
Vue.component('Pageheader', Header)
Vue.component('VueDropzone', vue2Dropzone)
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

Vue.use(Vs)
Vue.use(ButtonInstaller)
Vue.use(MultiSelectPlugin)
Vue.use(InstantSearch)
Vue.use(GullKit)
Vue.use(VueCompositionApi)
Vue.use(BootstrapVueIcons)
Vue.use(Vue2Filters)
Vue.use(VueFriendlyIframe)
Vue.use(VueFullscreen)
Vue.use(mdiVue, { icons: mdijs })
Vue.use(VueDraggable)

Vue.config.productionTip = false

export function isErrorStates (object) {
  if (!object) object = { ERROR_CODE: -1, ERROR_MSG: 'undefined results' }
  return object ? 'ERROR_CODE' in object && 'ERROR_MSG' in object : true
}

Vue.use(notifier)

new Vue({
  setup () {
    provide('vuex-store', store)
  },
  store,
  router,
  i18n,
  i18nComposable,
  axios,
  render: h => h(App)
}).$mount('#app')
