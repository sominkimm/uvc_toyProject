<template />
<script>
import store from '@/store'

export default {
  name: 'Toast',
  computed: {
    checkToast () {
      return store.getters.toast.id
    }
  },
  watch: {
    checkToast () {
      if (store.getters.toast.visible && store.getters.toast.id !== '') {
        this.showToast()
        setTimeout(() => {
          store.dispatch('toast/setToastDataReset')
        }, Number(store.getters.toast.timeout))
      }
    }
  },
  methods: {
    upToast () {
      this.$bvToast.show('my-toast')
    },
    showToast () {
      const h = this.$createElement
      const vNodesTitle = h(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          h('strong', { class: 'mr-2' }, `${store.getters.toast.title}`),
          h('small', { class: 'ml-auto text-italics' }, '')
        ]
      )
      const vNodesMsg = h(
        'p',
        { class: ['text-center', 'mb-0'] },
        [
          h('strong', 'message'),
          ` #${store.getters.toast.content} `,
          h('b-spinner', { props: { type: 'grow', small: true } })
        ]
      )

      this.$bvToast.toast([vNodesMsg], {
        id: store.getters.toast.id,
        title: [vNodesTitle],
        solid: true,
        noCloseButton: true,
        variant: store.getters.toast.variant,
        autoHideDelay: store.getters.toast.timeout
      })
    }
  }
}
</script>
