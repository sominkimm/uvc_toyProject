<template>
  <div class="uvc-topbar">
    <h2>
      <img
        :src="currentRouteIcon"
        alt="icons"
      >
      <span>{{ currentRouteTitle }}</span>
    </h2>
    <p class="description">
      {{ currentRouteDescription }}
    </p>
    <div class="u-space" /> <!-- 지우지마세요 -->
    <div class="site-path">
      홈 > 커스텀 대시보드
    </div>
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
      return this.$route.meta.img
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
.main-header {
  box-shadow: 0 0 0;
  -webkit-box-shadow: 0;
}
.app-topbar-toggle-area {
  width: 40px !important;
}
.app-topbar-title-area {
  flex: auto;
}
.text {
  font-size: 1em;
  font-family: verdana, sans-serif;
  font-weight: bolder;
  background: linear-gradient($uvc-main, lighten($uvc-main, 8%));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
}
/*background: linear-gradient(#511281, #907FA4);*/

span.dropdown-item {
  color: $uvc-main;
  font-weight: bold;
}

span.dropdown-item:hover {
  background-color: #ffffff;
}

.app-dropdown {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
  rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
  rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}

.main-header .menu-toggle {
    width: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-right: 12px;
}

.app-topbar-title {
  font-weight: 900;
  font-size: medium;
}

.app-topbar-title-sub {
  display: inline-block;
  margin-bottom:5px;
  margin-left: 0px;
}

.app-topbar-avatar {
  size: 2.5rem;
  line-height: 0.5;
}

.app-topbar-title-icon {
  display: inline-block;
  padding-top: 5px;
  font-weight: 700;
  text-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}

.groupname-text {
  display: inline;
  margin-right: 2px;
  font-size: 15px;
}
.userid-text {
  display: inline;
  margin-right: 4px;
  font-size: 15px;
}

.license-text {
  margin-right: 4px;
  display: inline;
  font-size: 12px;
}

.logout-text-pc {
  margin-right: 4px;
  display: inline;
  font-size: 12px;
}

.dropdownAvatar {
  display: none;
}

// 스마트폰 가로 + 세로
@media only screen and(min-width: 320px) and (max-width: 480px) {
  .main-header {
    padding: 0;
  }
  .main-header .menu-toggle div{
    width: 24px;
    height: 2px;
    border: 2px solid #2a3042;
    background: #2a3042;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    margin: 3px 0;
  }
  .app-topbar-toggle-area {
    margin-right: 0;
  }

  .commonTopbarMenu {
    display: none;
  }

  .dropdownAvatar {
    display: block;
  }
}

</style>
