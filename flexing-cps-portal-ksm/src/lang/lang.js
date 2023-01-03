import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { createI18n } from 'vue-i18n-composable'

Vue.use(VueI18n)

const DEFAULT_LANG = 'ko'

const locales = {
  en: require('./i18n/en.json'),
  ko: require('./i18n/ko.json')
}
const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
})
const i18nComposable = createI18n({
  locale: DEFAULT_LANG,
  messages: locales
})

export { i18n, i18nComposable }
