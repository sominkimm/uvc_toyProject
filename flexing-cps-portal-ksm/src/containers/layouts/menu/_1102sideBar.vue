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
                  v-show="subMenu.meta.step !== 0
                    && subMenu.meta.license.indexOf(CurrUser.license) !== -1"
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
    ...mapGetters('UserMng', { UserData: 'UserData' }),
    ...mapGetters('Current', { CurrUser: 'CurrUser', CurrLocation: 'CurrLocation' }),
    role () {
      const accessToken = window.localStorage.getItem('access-token')
      const decodedToken = jwtDecode(accessToken)
      return decodedToken.role
    },
    sidebarInfo () {
      const reData = []
      const routesChildren = routes[2].children

      for (const key in routesChildren) {
        if (routesChildren[key].meta.license.indexOf(this.CurrUser.license) !== -1) {
          reData.push(routesChildren[key])
        }
      }
      return reData
    },
    loginMenuAuth () {
      return this.CurrUser.menuAuth[0]
    }
  },
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
      'sidebarCompact',
      'removeSidebarCompact',
      'mobileSidebar'
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
      const auth = this.CurrUser.role
      const userId = this.CurrUser.userid
      const menuName = menu.name
      let resultData = false

      if (auth === 'provider') {
        // provider는 사용자 권한의 메뉴 on/off를 신경쓰지 않음
        resultData = menu.meta.auth[0] === 'provider'
        // 별도의 예외, UI를 위한 임시 메뉴 페이지 (jeb id 사용자만 접근)
        if (menuName === 'temporary') {
          resultData = userId === 'jeb'
        }
      } else {
        if (menu.meta.step === 1) { // 2deps 까지 메뉴 활성화
          resultData = !(menuName === 'sysmng' && auth === 'subAccount')
        } else if (menu.meta.step === 2) { // 1deps 까지 메뉴 활성화
          if (menuName === 'user') {
            resultData = (auth === 'provider' || auth === 'mainAccount')
          } else {
            const menuAuth = this.CurrUser.menuAuth[0]
            if (menuAuth[menuName] !== undefined) {
              resultData = menuAuth[menuName].auth.menu
            }
            // 별도의 예외, UI를 위한 임시 메뉴 페이지 (jeb id 사용자만 접근)
            if (menuName === 'temporary') {
              resultData = userId === 'jeb'
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
