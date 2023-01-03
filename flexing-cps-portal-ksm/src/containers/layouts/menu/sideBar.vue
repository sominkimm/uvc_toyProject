<template>
  <vue-perfect-scrollbar
    class="uvc-sidebar"
    :class="{
      'vertical-sidebar-compact': getVerticalCompact.isSidebarCompact,
      'sidebar-full-collapse': getVerticalSidebar.isMobileCompact,
      'remove-sidebar': getSidebarSetting.isRemoveSidebar
    }"
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
    @mouseenter.native="removeSidebarCompact()"
  >
    <div>
      <h1 class="company-logo">
        <a href="/">
          <img
            src="@/assets/images/h1_logo.png"
            alt="home"
            class="logo"
          >
          <img
            src="@/assets/images/icons/home.svg"
            alt="home"
            class="home"
          >
        </a>
      </h1>

      <!-- 하단의 li에 열려있는 메뉴에 .opened클래스가 붙으면 배경이 나옵니다. -->
      <nav class="main-menu">
        <ul
          id="menu"
          class="ul-vertical-sidebar"
        >
          <li class="Ul_li--hover">
            <router-link
              :to="{ name: 'license' }"
              tag="a"
              href="#"
              class="has-arrow"
            >
              <img
                src="@/assets/images/icons/menu-7.svg"
                alt="icon"
                class="app-sidebar-icon"
              >
              <span class="menu-item">
                <span>LICENSE</span>
              </span>
            </router-link>
          </li>
          <li class="Ul_li--hover">
            <router-link
              :to="{ name: 'profileMaker' }"
              tag="a"
              href="#"
              class="has-arrow"
            >
              <img
                src="@/assets/images/icons/menu-7.svg"
                alt="icon"
                class="app-sidebar-icon"
              >
              <span class="menu-item">
                <span>profileMaker</span>
              </span>
            </router-link>
          </li>
          <li class="Ul_li--hover">
            <router-link
              :to="{ name: 'opcuaModeler' }"
              tag="a"
              href="#"
              class="has-arrow"
            >
              <img
                src="@/assets/images/icons/menu-7.svg"
                alt="icon"
                class="app-sidebar-icon"
              >
              <span class="menu-item">
                <span>opcuaModeler</span>
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </vue-perfect-scrollbar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import jwtDecode from 'jwt-decode'

import { routes } from '@/routes/router'
import mixinUtil from '@/lib/utils/mixinUtil'

import packageJson from '../../../../package.json'

export default {
  name: 'SideBar',
  mixins: [mixinUtil],
  data () {
    return {
      selectedParentMenu: '',
      version: packageJson.version
    }
  },
  computed: {
    ...mapGetters(['getVerticalCompact', 'getVerticalSidebar', 'getSidebarSetting']),
    ...mapGetters('UserMng', { userMngData: 'UserData' }),
    ...mapGetters('License', {
      licenseListCount: 'LicenseListCount',
      licenseListRows: 'LicenseListRows',
      licenseLoading: 'LicenseListLoading',
      licenseListResult: 'LicenseListResult',
      licenseInfoOpen: 'LicenseOpen'
    }),
    ...mapGetters('Current', { currUser: 'CurrUser', currLocation: 'CurrLocation' }),
    role () {
      const accessToken = window.localStorage.getItem('access-token')
      const decodedToken = jwtDecode(accessToken)
      return decodedToken.role
    },
    licenseDataRows () {
      return this.licenseListRows
    },
    sidebarInfo () {
      const reData = routes[2].children
      return reData
    },
    loginMenuAuth () {
      return this.currUser.menuAuth[0]
    }
  },
  created () {},
  mounted () {
    document.addEventListener('click', this.returnSelectedParentMenu)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.returnSelectedParentMenu)
  },
  methods: {
    ...mapActions([
      'switchSidebar',
      'mobileSidebar',
      'sidebarCompact',
      'removeSidebarCompact'
    ])
  }
}
</script>

<style scoped lang="scss">
</style>
