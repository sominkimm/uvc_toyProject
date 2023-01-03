<template>
  <div>
    <!-- <keep-alive> -->
    <component :is="getThemeMode.layout" />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getThemeMode'])
  },
  created () {
    this.actLicenseList()
    // this.actCurrUpdate()
  },
  mounted () {},
  methods: {
    ...mapActions([
      'switchSidebar',
      'mobileSidebar',
      'sidebarCompact',
      'removeSidebarCompact'
    ]),
    ...mapActions('License', ['actLicenseList']),
    ...mapActions('Current', ['actCurrUpdate'])
  }
}
</script>
