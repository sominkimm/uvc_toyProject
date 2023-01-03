<template>
  <div class="app-admin-wrap layout-sidebar-vertical-two clearfix sidebar-full">
    <fixedBar />
    <side-bar />
    <main
      role="main"
      class="uvc-main-wrap"
    >
      <top-bar />
      <div class="u-main-contents">
        <transition
          name="page"
          mode="out-in"
        >
          <router-view />
        </transition>
      </div>
    </main>
  </div>
</template>
<script>
import topBar from '@/containers/layouts/menu/topBar'
import sideBar from '@/containers/layouts/menu/sideBar'
import fixedBar from '@/containers/layouts/menu/fixedBar'
import appFooter from '@/containers/layouts/common/footer'
import { mapGetters } from 'vuex'

export default {
  components: {
    topBar,
    appFooter,
    sideBar,
    fixedBar
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getVerticalSidebar'])
  },
  methods: {}
}
</script>
