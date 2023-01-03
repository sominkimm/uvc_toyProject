export const notifier = {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        showMessage (format) {
          if (typeof format === 'object' && format.content && format.color) {
            this.$store.commit('snackbar/showMessage', format)
          } else if (typeof format === 'string') {
            this.$store.commit('snackbar/showMessage', { content: format, color: 'secondary' })
          } else {
            throw new Error('Usage: showMessage(string | { (content) [key: string]: string, (color) [key: string]: string })')
          }
        }
      }
    })
  }
}
export default notifier
