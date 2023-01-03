<template>
  <vue-perfect-scrollbar
    class="uvc-sidebar"
    :class="{
      'vertical-sidebar-compact': getVerticalCompact.isSidebarCompact,
      'sidebar-full-collapse': getVerticalSidebar.isMobileCompact,
      'remove-sidebar': getSidebarSetting.isRemoveSidebar
    }"
    :settings="{ suppressScrollX: true, wheelPropagation: false }"
    @mouseleave.native="
      sidebarCompact()
      returnSelectedParentMenu()
    "
    @mouseenter.native="removeSidebarCompact"
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
          <li
            v-for="mainMenu in sidebarInfo"
            v-show="mainMenu.meta.step !== 0"
            :key="mainMenu.path"
            class="Ul_li--hover"
          >
            <!--    1 deps 메뉴      -->
            <template v-if="mainMenu.meta.step === 2 && filterMenuAuth(mainMenu)">
              <router-link
                v-for="subMenu in mainMenu.children"
                v-show="subMenu.meta.step !== 0"
                :key="subMenu.path"
                :to="{ name: subMenu.name }"
                tag="a"
                href="#"
                class="has-arrow"
              >
                <img
                  :src="subMenu.meta.img"
                  alt="icon"
                  class="app-sidebar-icon"
                >

                <span
                  class="menu-item"
                  :class="{
                    'vertical-item-name': getVerticalCompact.isItemName
                  }"
                >
                  <span>{{ subMenu.meta.title }}</span>
                </span>
              </router-link>
            </template>
            <!--    2 deps 메뉴      -->
            <template v-else-if="mainMenu.meta.step === 1 && filterMenuAuth(mainMenu)">
              <div v-b-toggle="`collapse-${mainMenu.path}`">
                <a
                  class="has-arrow"
                  href="#"
                  :class="{
                    active: selectedParentMenu === mainMenu.meta.title
                  }"
                >
                  <img
                    :src="mainMenu.meta.img"
                    alt="icon"
                    class="app-sidebar-icon"
                  >
                  <span
                    class="menu-item"
                    :class="{
                      'vertical-item-name': getVerticalCompact.isItemName
                    }"
                  >{{ mainMenu.meta.title }}</span>
                  <arrowIcon v-if="mainMenu.meta.step !== 2" />
                </a>
              </div>

              <b-collapse
                :id="`collapse-${mainMenu.path}`"
                visible
              >
                <ul
                  v-for="subMenu in mainMenu.children"
                  v-show="subMenu.meta.step !== 0"
                  :key="subMenu.path"

                  class="Ul_collapse"
                  :class="{
                    'vertical-item-name': getVerticalCompact.isItemName
                  }"
                >
                  <li v-if="filterMenuAuth(subMenu)">
                    <router-link
                      tag="a"
                      :to="{ name: subMenu.name }"
                    >
                      <span>{{ subMenu.meta.title }}</span>
                    </router-link>
                  </li>
                </ul>
              </b-collapse>
            </template>
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
import arrowIcon from '@/components/arrow/arrowIcon'
import mixinUtil from '@/lib/utils/mixinUtil'

import packageJson from '../../../../package.json'

export default {
  name: 'SideBar',
  components: {
    arrowIcon
  },
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
    this.toggleSelectedParentMenu()
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
    ]),
    toggleSelectedParentMenu () {
      const currentParentUrl = this.$route.path
        .split('/')
        .filter(x => x !== '')[1]

      if (currentParentUrl !== undefined && currentParentUrl !== null) {
        this.selectedParentMenu = currentParentUrl.toLowerCase()
      } else {
        this.selectedParentMenu = 'dashboards'
      }
    },
    returnSelectedParentMenu () {
      this.toggleSelectedParentMenu()
    },
    filterMenuAuth (menu) {
      const currAuth = this.currUser.role
      const currUserId = this.currUser.userid
      const currLicense = this.currUser.license

      let currLicenseType = null // license_type 데이터
      let currUserMenuAuth = null // 사용자의 menuAuth 데이터

      let licenseTypeMenuAuth = null // 단순 변수
      let metaName = null // 단순 변수

      const menuName = menu.name
      const providerMenuArray = ['license', 'authorizationProvider', 'mngUserResource']
      const mainSubMenuArray = ['mngUserResource', 'license', 'authorizationProvider', 'temporary']
      let resultData = false

      // license 데이터가 존재한다면 로직 시작
      if (this.licenseDataRows.length > 0 && currUserId !== null) {
        if (currAuth === 'provider') {
          // provider권한 사용자는 권한관리의 데이터와 license_type 데이터와 상관없이 고정됨
          resultData = providerMenuArray.indexOf(menuName) !== -1
        } else {
          metaName = menu.meta.name
          currLicenseType = this.licenseDataRows.filter(x => x.name === currLicense)[0]
          licenseTypeMenuAuth = currLicenseType.menuAuth[0]
          currUserMenuAuth = this.currUser.menuAuth[0]

          // license_type 데이터 및 사용자 권한 데이터 체크
          if (menu.meta.step === 1) { // 2deps 까지 메뉴 활성화 (ex 데이터 수집, 데이터 분석 등)
            // step 2의 메뉴가 하나라도 true 일 경우 결과값 true
            if (metaName === 'dataCollect') {
              resultData = !!((licenseTypeMenuAuth.profileMaker.auth.menu ||
              licenseTypeMenuAuth.opcuaModeler.auth.menu)) && !!((currUserMenuAuth.profileMaker.auth.menu ||
              currUserMenuAuth.opcuaModeler.auth.menu))
            } else if (metaName === 'analysis') {
              resultData = !!((licenseTypeMenuAuth.dataPreprocessing.auth.menu || licenseTypeMenuAuth.eda.auth.menu ||
              licenseTypeMenuAuth.machineLearning.auth.menu || licenseTypeMenuAuth.dataFlow.auth.menu ||
              licenseTypeMenuAuth.anomaly.auth.menu)) && !!((currUserMenuAuth.dataPreprocessing.auth.menu || currUserMenuAuth.eda.auth.menu ||
              currUserMenuAuth.machineLearning.auth.menu || currUserMenuAuth.dataFlow.auth.menu ||
              currUserMenuAuth.anomaly.auth.menu))
            } else if (metaName === 'sysmng') {
              resultData = currAuth !== 'subAccount' && currLicense !== 'free'
            } else {
              resultData = false
            }
          } else if (menu.meta.step === 2) { // 1deps 까지 메뉴 활성화 (ex 커스텀 대시보드, 디바이스 관리 등)
            if (mainSubMenuArray.indexOf(menuName) === -1) { // provider 전용 메뉴와, sysmng 메뉴 제외
              resultData = licenseTypeMenuAuth[menuName].auth.menu && currUserMenuAuth[menuName].auth.menu
            } else {
              resultData = false
            }
          }
        }
      }
      return resultData
    }
  }
}
</script>

<style scoped lang="scss">
</style>
