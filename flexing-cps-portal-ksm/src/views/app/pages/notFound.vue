<template>
  <b-row>
    <b-col>
      <div class="not-found-wrap text-center">
        <h1 class="text-60">
          404
        </h1>
        <p class="text-36 subheading mb-3">
          Error!
        </p>
        <p class="mb-5  text-muted text-18">
          Sorry! The page you were looking for doesn't exist.
        </p>
        <!-- <a
          class="btn btn-lg btn-primary btn-rounded"
          href="/"
        >Go back to home</a> -->
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
    title: '404 Not Found'
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

