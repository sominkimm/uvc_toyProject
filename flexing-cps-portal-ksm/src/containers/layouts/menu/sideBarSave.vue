<template>
  <vue-perfect-scrollbar
    class="sidebar-panel rtl-ps-none ps scroll"
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
      <div class="app-sidebar-cps-portal">
        <span class="cps-text">CPS </span>
        <span class="portal-text">PORTAL</span>
      </div>
      <div class="env-text">
        <b-badge
          v-if="isDevelopment()"
          variant="light"
        >
          개발용 - version {{ version }}
        </b-badge>
      </div>
      <div
        class="close-mobile-menu app-sidebar-mobile-close"
        @click="mobileSidebar"
      >
        <i class="text-16 text-white i-Close-Window font-weight-bold" />
      </div>
      <div class="mt-4 main-menu">
        <ul
          id="menu"
          class="ul-vertical-sidebar pl-4"
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
                <span
                  class="mr-3 app-sidebar-icon"
                >
                  <i :class="`${mainMenu.meta.icon} text-19`" />
                </span>
                <span
                  class
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
                  <span
                    class="mr-3 app-sidebar-icon"
                  >
                    <i :class="`${mainMenu.meta.icon} text-19`" />
                  </span>
                  <span
                    class="text-14"
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
      </div>
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
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&family=IBM+Plex+Sans+KR:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.layout-sidebar-vertical-two .Ul_li--hover div .Ul_collapse li a.router-link-exact-active.open {
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-shadow: 3px 0px 5px #0172bc;
}
.layout-sidebar-vertical-two :not(.collapsed) > .router-link-exact-active.open {
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-shadow: 3px 0px 5px #0172bc;
}
.cps-text {
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 32px;
  margin-left: 1rem;
  margin-right: 0rem;
}
.portal-text {
  color: rgb(163, 163, 163);
  font-family: 'Roboto', sans-serif;
  font-weight: 1000;
  font-size: 32px;
  margin-left: 0rem;
}
.portal-text::after {
  content: "\a";
  white-space: pre;
}
.env-text {
  font-size: 16px;
  margin-right: 2rem;
  text-align: right;
}

 .Ul_collapse span {
    font-size: 14px !important;
    font-family: 'IBM Plex Sans KR', sans-serif;
}
 .Ul_li--hover .has-arrow span {
    font-size: 15px !important;
    font-weight: bold;
    font-family: 'IBM Plex Sans KR', sans-serif;
}

.remove-sidebar {
  display: none;
}

.app-sidebar-icon {
  line-height: 0.5;
}

.app-sidebar-mobile-close {
  cursor:pointer;
}


// 스마트폰 가로 + 세로
@media only screen and(min-width: 320px) and (max-width: 480px) {
  .cps-text {
    font-size: 25px;
  }
  .portal-text {
    font-size: 25px;
  }
  .app-sidebar-cps-portal {
    padding: 8px;
  }
}

@media only screen and (max-width: 1150px) {
  .app-sidebar-cps-portal {
    padding: 8px;
    span.cps-text {
    font-size: 25px;
    }
    span.portal-text {
    font-size: 25px;
    }
  }
}

</style>
