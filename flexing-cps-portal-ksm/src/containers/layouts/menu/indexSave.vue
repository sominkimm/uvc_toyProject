<template>
  <div class="app-admin-wrap layout-sidebar-vertical-two clearfix sidebar-full">
    <!--    <verticalSidebar />-->
    <side-bar />
    <main>
      <div
        class="main-content-wrap mt-0"
        :class="{
          'vertical-sidebar': getVerticalSidebar.isVerticalSidebar,
          compact: getVerticalSidebar.isVerticalCompact
        }"
      >
        <top-bar />

        <div class="px-3">
          <transition
            name="page"
            mode="out-in"
          >
            <router-view />
          </transition>
          <appFooter />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import topBar from '@/containers/layouts/menu/topBar'
import sideBar from '@/containers/layouts/menu/sideBar'
import appFooter from '@/containers/layouts/common/footer'
import { mapGetters } from 'vuex'

export default {
  components: {
    topBar,
    appFooter,
    sideBar
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
