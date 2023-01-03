<template>
  <div>
    <div
      class="customizer"
      :class="{ open: isOpen }"
    >
      <div
        class="handle"
        @click="isOpen = !isOpen"
      >
        <i class="i-Gear spin" />
      </div>

      <vue-perfect-scrollbar
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
        class="customizer-body ps rtl-ps-none"
      >
        <div class>
          <div class="card-header">
            <p class="mb-0">
              Dark Mode
            </p>
          </div>

          <div class="card-body">
            <label
              v-b-popover.hover.left="'Dark Mode'"
              class="switch switch-primary mr-3 mt-2"
            >
              <input
                type="checkbox"
                @click="changeThemeMode"
              >
              <span class="slider" />
            </label>
          </div>
        </div>
        <div class>
          <div class="card-header">
            <p class="mb-0">
              Language
            </p>
          </div>

          <div class="card-body">
            <b-button
              variant="default m-1"
              @click="changeLang('bn')"
            >
              <flag iso="BD" />
            </b-button>
            <b-button
              variant="default m-1"
              @click="changeLang('en')"
            >
              <flag iso="US" />
            </b-button>
            <b-button
              variant="default m-1"
              @click="changeLang('de')"
            >
              <flag iso="DE" />
            </b-button>
          </div>
        </div>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isOpen: false
    }
  },

  computed: {
    ...mapGetters(['getThemeMode', 'getcompactLeftSideBarBgColor'])
  },

  methods: {
    ...mapActions([
      'changeThemeRtl',
      'changeThemeLayout',
      'changeThemeMode',
      'changecompactLeftSideBarBgColor'
    ]),
    changeLang (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>

<style lang="scss" scoped></style>
