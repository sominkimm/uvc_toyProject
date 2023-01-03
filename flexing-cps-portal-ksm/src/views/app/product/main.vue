<template>
  <div>
    <header id="header">
      <div class="app-main-headerWrap">
        <div class="inner">
          <h1>
            <img
              class="logo foot"
              :src="topLogo"
              alt="UVC"
            >
            <span class="blind">UVC</span>
          </h1>
        </div>
      </div>
    </header>

    <cps />
    <modeler />
    <edge />
  </div>
</template>

<script>
import cps from '@/views/app/product/components/cps'
import modeler from '@/views/app/product/components/modeler'
import edge from '@/views/app/product/components/edge'

export default {
  components: {
    cps,
    modeler,
    edge
  },
  data () {
    return {
      valid: false,
      userid: '',
      topLogo: require('@/assets/images/ko/product/uvc_logo_foot.png'),
      id: '',
      password: '',
      loginState: ''
    }
  },
  computed: {
    validation () {
      return this.userid.length > 4 && this.userid.length < 13
    }
  },
  watch: {},
  methods: {
    makeToast (variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    },
    async login () {
      this.loginState = ''
      // token 확인해서 로그인 구현
      // https://lovemewithoutall.github.io/it/vue-login-demo/
      await this.$store
        .dispatch('user/login', {
          userid: this.id,
          password: this.password
        })
        .then(res => {
          // this.loginState = res
          if (res) {
            this.$router.push('/app/dashboards/monitoring').catch(() => {})
          } else {
            this.loginState = this.$t('User.message.loginInfoReCheck')
          }
        })
        .catch(err => {
          console.error(err)
          this.loginState = this.$t('User.message.loginInfoReCheck')
        })
    },
    onFocus () {
      this.loginState = ''
    }
  }
}
</script>

<style scoped lang="scss">
 @import "@/assets/styles/uvc-scss/app_default/common.scss";
 @import "@/assets/styles/uvc-scss/app_default/solution.scss";

 *:focus { outline:none; }

body, input, textarea, select, button, table{margin:0; font-family:'Noto Sans KR', Noto Sans KR, 'Lato','돋움', Dotum, Helvetica, AppleGothic, Sans-serif;}
body, h1, h2, h3, h4, h5, dl, dt, dd, ul, li, ol, th, td, p, form, fieldset, legend, button { margin: 0; padding: 0; }

h2{
  font-size:50px;
}
h4, dt, h3{
  font-size: 24px;
}

img {max-width:100%;}
img, fieldset{border:0 none}
dl, ul, ol, li {list-style: none outside none;}
button{border:0 none; cursor:pointer; display: block;}
table {border-collapse:collapse;}

img {vertical-align:top;}
li img { vertical-align:top;}
td img { vertical-align:middle;}
.cursor { cursor: pointer;}

strong, .strong , b { font-weight: 600;}
address, caption, cite, code, dfn, em, var {font-style:normal;}

hr { clear:both; display: none; }
.blind, legend, caption {display:none;}

a {text-decoration:none;}
a:hover, a:active, a:focus {text-decoration:none;}
table a:hover, table a:active {text-decoration:underline;}
table a.nonehoverline { text-decoration:none; }

input, select, textarea {vertical-align:middle; line-height:130%}
input, textarea, select { border-width:1px; border-style: solid; border-color:#dfdfdf; background:#fff; outline:0;}
input[type=button],
input[type=submit],
textarea {border-radius:0; -webkit-border-radius:0; appearance:none; -webkit-appearance:none;}
select {height:42px; box-sizing:border-box; border-radius:0; -webkit-border-radius:0;}
input.text {padding:0px 10px; height:42px; font-weight:300; box-sizing:border-box; border-radius:0; -webkit-border-radius:0; appearance:none; -webkit-appearance:none; box-sizing:border-box;}
input.file {border:1px solid #dfdfdf;}
input.check	{border:none; background:none;}
input.radio	{border:0 none; background:none;}
textarea.textarea {height:120px; padding:10px; box-sizing:border-box;}
label {cursor:pointer;}

.button {border:0 none; cursor:pointer}

// 스마트폰 가로 + 세로
@media only screen and (min-width: 320px) and (max-width: 480px) {
  #header .app-main-headerWrap {
    height: 75px;
    background: rgba(0, 0, 0, 0.4);
  }
  .app-main-headerWrap .inner h1 a img {
    display: block;
    width: 100%; /*transition: all .3s;*/
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }

  #header {
    position: fixed;
    border: none;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 450;
  }
}

</style>

