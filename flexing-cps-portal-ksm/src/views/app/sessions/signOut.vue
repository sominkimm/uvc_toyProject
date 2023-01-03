<template>
  <div
    id="loading_wrap"
    class="loading_wrap"
  >
    <div
      v-if="loading"
      id="loading_wrap"
      class="loading_wrap"
    >
      <div class="app-public-loading">
        <div class="circle" />
        <div class="circle" />
        <div class="circle" />
        <div class="shadow" />
        <div class="shadow" />
        <div class="shadow" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters('UserMng', { loading: 'UserMngLoading' })
  },
  watch: {
    loading (val) {
      if (val === false) {
        // 로그아웃 처리 후 이동
        this.$router.push({ name: 'signIn' }).catch(() => {})
      }
    }
  },
  created () {
    this.actUserMngLogout()
    this.actCurrInit()
  },
  methods: {
    ...mapActions('UserMng', ['actUserMngLogout']),
    ...mapActions('Current', ['actCurrInit'])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .app-public-loading{
      width:200px;
      height:60px;
      position: absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
  }
  .app-public-loading .circle{
      width:20px;
      height:20px;
      position: absolute;
      border-radius: 50%;
      background-color: #2a3042;
      left:15%;
      transform-origin: 50%;
      animation: circle .7s alternate infinite ease;
  }

  @keyframes circle{
      0%{
          top:60px;
          height:5px;
          border-radius: 50px 50px 25px 25px;
          transform: scaleX(1.7);
      }
      40%{
          height:20px;
          border-radius: 50%;
          transform: scaleX(1);
      }
      100%{
          top:0%;
      }
  }
  .app-public-loading .circle:nth-child(2){
      left:45%;
      animation-delay: .2s;
  }
  .app-public-loading .circle:nth-child(3){
      left:auto;
      right:15%;
      animation-delay: .3s;
  }
  .app-public-loading .shadow{
      width:20px;
      height:4px;
      border-radius: 50%;
      background-color: rgba(0,0,0,.5);
      position: absolute;
      top:62px;
      transform-origin: 50%;
      z-index: -1;
      left:15%;
      filter: blur(1px);
      animation: shadow .9s alternate infinite ease;
  }

  @keyframes shadow{
      0%{
          transform: scaleX(1.5);
      }
      40%{
          transform: scaleX(1);
          opacity: .7;
      }
      100%{
          transform: scaleX(.2);
          opacity: .4;
      }
  }
  .app-public-loading .shadow:nth-child(4){
      left: 45%;
      animation-delay: .2s
  }
  .app-public-loading .shadow:nth-child(5){
      left:auto;
      right:15%;
      animation-delay: .3s;
  }
</style>
