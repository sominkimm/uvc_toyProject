<template>
  <div>
    <router-view />
    <!-- <customizer></customizer> -->
    <CustomToast />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getThemeMode']),
    themeName () {
      return this.getThemeMode.dark ? 'dark-theme' : ' '
    },
    rtl () {
      return this.getThemeMode.rtl ? 'rtl' : ' '
    }
  },
  metaInfo () {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'FLEXiNG CPS',
      // all titles will be injected into this template
      bodyAttrs: {
        class: [this.themeName, 'text-left']
      },
      htmlAttrs: {
        dir: this.rtl
      }
    }
  }

}
</script>
