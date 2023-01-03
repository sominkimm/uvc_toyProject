<template>
  <b-row>
    <b-col>
      <div class="not-found-wrap text-center">
        <h1 class="text-60">
          NOT HAVE PERMISSION
        </h1>
        <p class="text-36 subheading mb-3">
          FAIL!
        </p>
        <p class="mb-5  text-muted text-18">
          Sorry! You do not have permission to access this page.
        </p>
        <b-button @click="onHome()">
          Go back to home
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  metaInfo: {
    title: 'NOT HAVE PERMISSION'
  },
  computed: {
    ...mapGetters('UserMng', {
      loginRouter: 'UserMngLoginRouter'
    })
  },
  watch: {
    loginRouter (value) {
      this.$router.push({ name: value }).catch(() => {})
    }
  },
  methods: {
    ...mapActions('UserMng', [
      'actUserMngMenuLoginRouterCheck'
    ]),
    onHome () {
      this.actUserMngMenuLoginRouterCheck()
    }
  }
}
</script>

