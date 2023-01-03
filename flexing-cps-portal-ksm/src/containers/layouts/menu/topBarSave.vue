<template>
  <div
    class="mb-30 m-3"
    style="box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;"
  >
    <header
      class="main-header vertical-header bg-white d-flex justify-content-between rounded-0"
    >
      <div
        class="menu-toggle vertical-toggle app-topbar-toggle-area"
        @click="mobileSidebar"
      >
        <div />
        <div />
        <div />
      </div>
      <div class="header-part-left text-left app-topbar-title-area">
        <div class="d-flex align-items-center">
          <span class="t-font-boldest">
            <i
              :class="`${currentRouteIcon} text-19 app-topbar-title-icon`"
            />
          </span>
          <div class="ml-3 mt-2 mr-2 app-topbar-title">
            <span class="app-topbar-title-sub">{{ currentRouteTitle }}</span>
          </div>

          <span class="mt-1 d-none d-md-inline-block section-info">
            <small>{{ currentRouteDescription }}</small>
          </span>
        </div>
      </div>
      <div class="header-part-right text-right topbar-right">
        <i
          class="i-Full-Screen header-icon d-none d-sm-inline-block"
          @click="handleFullScreen"
        />
        <div
          class="ml-1 mb-0 commonTopbarMenu"
        >
          <span
            class="groupname-text"
          >
            <mdicon
              name="account-group"
              :size="18"
            />
            {{ currUser.groupName }}
          </span>
          <span
            v-if="currUser.role !== 'provider'"
            class="license-text"
          >
            ({{ UpperCase(currUser.license) }})
          </span>
          <span
            class="userid-text"
          >
            <!--<a
              href="#"
              @click="$bvModal.show('settings-modal')"
            >-->
            <mdicon
              name="account"
              :size="18"
            />
            {{ currUser.userid }}
            <!--</a>-->
          </span>
          <a
            class="logout-text"
            href="#"
            @click.prevent="onLogout()"
          >
            | {{ $t('SignUp.Field.logout') }}
          </a>
        </div>

        <!-- Notificaiton -->
        <!-- <div class="dropdown">
          <b-dropdown
            id="dropdown-1"
            text="Dropdown Button"
            class="m-md-2 badge-top-container"
            toggle-class="text-decoration-none"
            no-caret
            variant="link"
          >
            <template slot="button-content">
              <span class="badge badge-primary">3</span>
              <i class="i-Bell text-muted header-icon" />
            </template>
            <vue-perfect-scrollbar
              ref="myData"
              :settings="{ suppressScrollX: true, wheelPropagation: false }"
              class="dropdown-menu-right rtl-ps-none notification-dropdown ps scroll"
            >
              <div class="dropdown-item d-flex">
                <div class="notification-icon">
                  <i class="i-Speach-Bubble-6 text-primary mr-1" />
                </div>
                <div class="notification-details flex-grow-1">
                  <p class="m-0 d-flex align-items-center">
                    <span>New message</span>
                    <span class="flex-grow-1" />
                    <span
                      class="text-small text-muted ml-auto"
                    >10 sec ago</span>
                  </p>
                  <p class="text-small text-muted m-0">
                    James: Hey! are you busy?
                  </p>
                </div>
              </div>
              <div class="dropdown-item d-flex">
                <div class="notification-icon">
                  <i class="i-Receipt-3 text-success mr-1" />
                </div>
                <div class="notification-details flex-grow-1">
                  <p class="m-0 d-flex align-items-center">
                    <span>New order received</span>
                    <span class="flex-grow-1" />
                    <span
                      class="text-small text-muted ml-auto"
                    >2 hours ago</span>
                  </p>
                  <p class="text-small text-muted m-0">
                    1 Headphone, 3 iPhone x
                  </p>
                </div>
              </div>
              <div class="dropdown-item d-flex">
                <div class="notification-icon">
                  <i class="i-Empty-Box text-danger mr-1" />
                </div>
                <div class="notification-details flex-grow-1">
                  <p class="m-0 d-flex align-items-center">
                    <span>Product out of stock</span>
                    <span class="flex-grow-1" />
                    <span
                      class="text-small text-muted ml-auto"
                    >10 hours ago</span>
                  </p>
                  <p class="text-small text-muted m-0">
                    Headphone E67, R98, XL90, Q77
                  </p>
                </div>
              </div>
              <div class="dropdown-item d-flex">
                <div class="notification-icon">
                  <i class="i-Data-Power text-success mr-1" />
                </div>
                <div class="notification-details flex-grow-1">
                  <p class="m-0 d-flex align-items-center">
                    <span>Server Up!</span>
                    <span class="flex-grow-1" />
                    <span
                      class="text-small text-muted ml-auto"
                    >14 hours ago</span>
                  </p>
                  <p class="text-small text-muted m-0">
                    Server rebooted successfully
                  </p>
                </div>
              </div>
            </vue-perfect-scrollbar>
          </b-dropdown>
        </div> -->
        <!-- Notificaiton End -->

        <!-- User avatar dropdown -->
        <div class="dropdown dropdownAvatar">
          <b-dropdown
            id="dropdown-1"
            text="Dropdown Button"
            class="m-md-2 user col align-self-end"
            toggle-class="text-decoration-none"
            no-caret
            variant="link"
          >
            <template slot="button-content">
              <b-avatar
                variant="primary"
                size="2rem"
                :text="formatAvatar(currUser.userid)"
              />
            </template>
            <div
              class="dropdown-menu-right app-dropdown"
              aria-labelledby="userDropdown"
            >
              <span
                class="dropdown-item id"
              >
                {{ $t('SignUp.Field.groupname') }} :
                <span :class="`text-${status.role[`${currUser.groupName}`]}`">
                  {{ currUser.groupName }}
                </span>
              </span>
              <span class="dropdown-item id">
                {{ $t('SignUp.Field.userid') }} :
                <span :class="`text-${status.role[`${currUser.role}`]}`">
                  {{ currUser.userid }}
                </span>
              </span>
              <div class="divider">
                <span />
                <span />
              </div>
              <span class="dropdown-item id">
                {{ $t('SignUp.Field.role') }} :
                <span :class="`text-${status.role[`${currUser.role}`]}`">
                  {{ currUser.role }}
                </span>
              </span>
              <span
                v-if="currUser.role !== 'provider'"
                class="dropdown-item id"
              >
                {{ $t('SignUp.Field.license') }} :
                <span :class="`text-${status.license[`${currUser.license}`]}`">
                  {{ currUser.license }}
                </span>
              </span>
              <div class="divider">
                <span />
                <span />
              </div>
              <!--<a
                class="dropdown-item"
                href="#"
                @click="$bvModal.show('settings-modal')"
              >{{ $t('SignUp.Field.info') }}</a>-->
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="onLogout()"
              >{{ $t('SignUp.Field.logout') }}</a>
            </div>
          </b-dropdown>
        </div>
        <!--<b-modal id="settings-modal">
          version {{ version }}
          <template #modal-footer="{ cancel }">
            <b-button
              :variant="button.variant.cancel"
              size="sm"
              @click="cancel()"
            >
              {{ $t('button.cancelBtn') }}
            </b-button>
          </template>
        </b-modal>-->
      </div>
      <search-component
        :is-search-open.sync="isSearchOpen"
        @closeSearch="toggleSearch"
      />
    </header>
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
