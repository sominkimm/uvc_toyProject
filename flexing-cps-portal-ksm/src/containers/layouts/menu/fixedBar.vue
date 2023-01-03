<template>
  <div class="uvc-fixedBar">
    <a
      class="btn-ham"
      @click="mobileSidebar"
    >
      <span><b /></span>
      <span><b /></span>
      <span><b /></span>
    </a>
    <h1>{{ currUser.groupName }}</h1>
    <div class="license business">
      <span>License</span>
      <strong>{{ UpperCase(currUser.license) }}</strong>
    </div>
    <div class="u-space" />
    <ul class="acc-bar">
      <li>
        <button
          type="button"
          class="screen-expand"
          @click="handleFullScreen"
        >
          <span class="blind">창 최대화</span>
        </button>
      </li>
      <li class="user-wrap">
        <button
          type="button"
          class="user-info"
        >
          <span class="blind">내정보</span>
        </button>
        <strong>{{ currUser.userid }}</strong>
      </li>
      <li>
        <button
          type="button"
          class="user-logout"
          @click="onLogout()"
        >
          <span class="blind">로그아웃</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import Util from '@/lib/utils'
import searchComponent from '@/containers/layouts/common/search'
import packageJson from '../../../../package.json'

export default {
  components: {
    searchComponent
  },
  mixins: [mixinUtil],
  data () {
    return {
      isMegaMenuOpen: false,
      isSearchOpen: false,
      version: packageJson.version
    }
  },
  computed: {
    ...mapGetters([
      'getVerticalCompact',
      'getVerticalSidebar',
      'getSideBarToggleProperties'
    ]),
    ...mapGetters('Current', { currUser: 'CurrUser', currLocation: 'CurrLocation' }),
    currentRouteTitle () {
      return this.$route.meta.title
    },
    currentRouteDescription () {
      return this.$route.meta.description
    },
    currentRouteIcon () {
      return this.$route.meta.icon
    },
    currentAvatar () {
      let userId = this.currUser.userid
      if (userId === null) {
        userId = 'a'
      }
      return userId.charAt(0)
    }
  },
  methods: {
    ...mapActions([
      'switchSidebar',
      'sidebarCompact',
      'removeSidebarCompact',
      'mobileSidebar',
      'changeThemeMode'
    ]),
    ...mapActions('UserMng', ['actUserMngLogout']),
    ...mapActions('Current', ['actCurrInit']),
    handleFullScreen () {
      Util.toggleFullScreen()
    },
    closeMegaMenu () {
      this.isMegaMenuOpen = false
    },
    toggleMegaMenu () {
      this.isMegaMenuOpen = !this.isMegaMenuOpen
    },
    toggleSearch () {
      this.isSearchOpen = !this.isSearchOpen
    },
    onLogout () {
      // this.$store.dispatch('user/logout')
      // this.actCurrInit()
      // this.actUserMngLogout()
      this.$router.push({ name: 'signOut' })
    },
    formatAvatar (val) {
      let returnData = val
      if (returnData !== undefined && returnData !== null) {
        returnData = returnData.charAt(0)
      } else {
        returnData = 'X'
      }

      return returnData
    },
    UpperCase (val) {
      if (val) {
        return val.toUpperCase()
      }
    }
  }
}
</script>

<style scoped lang="scss">


</style>
