<template>
  <b-modal
    id="modal-session-pricing-form"
    modal-class="modal-pricing"
    centered
    no-close-on-backdrop
    size="huge"
    body-class="p-0"
    button-size="sm"
  >
    <template #modal-header="{ close }">
      <span
        class="ul-btn__icon"
        @click="close()"
      >
        <mdicon
          name="close-thick"
          class="app-close-thick"
          :size="25"
        />
      </span>
    </template>
    <template #default>
      <!-- 본문 처리 -->
      <div class="card-body app-info-body-scroll">
        <div class="app-pricing-container">
          <div
            class="card"
            @click="onPricing('free')"
          >
            <div class="card-body">
              <price
                :payment="payment"
                license="free"
              />
            </div>
            <figcaption>{{ licenseCheck('free') }}</figcaption>
          </div>
          <div
            class="card"
            @click="onPricing('lite')"
          >
            <div class="card-body">
              <price
                :payment="payment"
                license="lite"
              />
            </div>
            <figcaption>{{ licenseCheck('lite') }}</figcaption>
          </div>
          <div
            class="card"
            @click="onPricing('pro')"
          >
            <div class="card-body">
              <price
                :payment="payment"
                license="pro"
              />
              <figcaption>{{ licenseCheck('pro') }}</figcaption>
            </div>
          </div>

          <div
            class="card"
            @click="onPricing('business')"
          >
            <div class="card-body">
              <price
                :payment="payment"
                license="business"
              />
              <figcaption>{{ licenseCheck('business') }}</figcaption>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #modal-footer="{ ok, cancel, hide }">
      <b-button
        class="mt-3"
        block
        style="display:none;"
        @click="$bvModal.hide('modal-session-pricing-form')"
      >
        Close Me
      </b-button>
    </template>
  </b-modal>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import Price from '@/views/app/sessions/components/price.vue'

export default {
  name: 'Pricing',
  components: { Price },
  mixins: [mixinUtil],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      payment: {
        free: {
          volume: 0,
          edgeCount: 0,
          price: 0,
          description: this.$t('SignUp.description.freeDescription'),
          menu: [
            '커스텀 대시보드',
            '디바이스 관리',
            '데이터 조회',
            '-', '-', '-', '-', '-', '-'
          ]
        },
        lite: {
          volume: 5,
          edgeCount: 5,
          price: 400000,
          description: this.$t('SignUp.description.liteDescription'),
          menu: [
            '커스텀 대시보드',
            '디바이스 관리',
            '인증서 관리',
            '엣지 설정',
            '데이터 수집',
            '데이터 조회',
            '시스템 관리',
            '-', '-'
          ]
        },
        pro: {
          volume: 15,
          edgeCount: 5,
          price: 500000,
          description: this.$t('SignUp.description.proDescription'),
          menu: [
            '커스텀 대시보드',
            '디바이스 관리',
            '인증서 관리',
            '엣지 설정',
            '데이터 수집',
            '데이터 분석',
            '데이터 공유',
            '데이터 조회',
            '시스템 관리'
          ]
        },
        business: {
          volume: -1,
          edgeCount: this.$t('SignUp.description.unlimited'),
          price: this.$t('SignUp.description.businessPrice'),
          description: this.$t('SignUp.description.businessDescription'),
          menu: [
            '커스텀 대시보드',
            '디바이스 관리',
            '인증서 관리',
            '엣지 설정',
            '데이터 수집',
            '데이터 분석',
            '데이터 공유',
            '데이터 조회',
            '시스템 관리'
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters('UserMng', {
      priceOpen: 'UserMngPriceOpen'
    }),
    ...mapGetters('Current', {
      currUser: 'CurrUser'
    })
  },
  watch: {},
  methods: {
    ...mapActions('UserMng', [
      'actUserMngLogin',
      'actUserMngJoinAdmin'
    ]),
    onPricing (val) {
      this.actUserMngJoinAdmin({
        body: {
          // 사용자 정보
          name: this.data.User.name,
          userid: this.data.User.userid,
          password: this.data.User.password,
          email: this.data.User.email,
          active: true,
          license: val,
          role: 'mainAccount',
          groupName: this.data.User.group,
          accessCode: this.data.User.accessCode
        }
      })
    },
    licenseCheck (val) {
      return (this.currUser.license)
        ? (this.currUser.license === val)
          ? this.$t('SignUp.button.inuse') : this.$t('SignUp.button.change') : this.$t('SignUp.button.start')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

/deep/ .modal-header {
  flex-direction: row;
  justify-content: flex-end;
  flex-direction: column;
  flex-wrap: wrap;
  display: grid;
  border-bottom: none;
}

/deep/ .modal-footer {
  border-top: none;
}

/deep/ .modal-content {
  background: no-repeat;
  border: none;
}

/deep/ .modal-dialog {
  max-width: 100%;
  width: 1180px;
}

/deep/ .card figcaption{
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.7);
  color: #fff; text-align: center;
  line-height: 500px;
  font-size: 22px;
  font-weight: 900;
  position: absolute; /* 기본기준 : body */
  top: 0; left: 0;
  opacity: 0; /* 처음에 안보이게 처리 */
  transition: 0.3s; /* 변화되는 CSS에 시간차를 줌 */
}

/* 테두리 */
/deep/ .card figcaption:after{
  content: ''; /* 비워둠 */
  display: block;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  border: 1px solid #fff;
  box-sizing: border-box;
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  margin: auto; /* 기준에서 정가운데 오도록 처리 */
  cursor:pointer;
}

/deep/ .card:hover figcaption, /deep/ .card:focus figcaption{
  opacity: 1;
}

// ---------------------------------------------------------------------------------

.text {
  font-size: 5rem;
  text-align: center;
  height:15vh;
  line-height: 15vh;
  color: #2a3042;
  background: #F1F1F1;
  // color: #F1F1F1;
  font-family: 'Niconne', cursive;
  font-weight: 700;
  text-shadow: 5px 5px 0px #CFD2CF,
}

// ----------------------------------------------------------------------------------

* {
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #f7f8fc;
  font-family: "Roboto", sans-serif;
  color: #10182f;
}

.app-pricing-container-mobile {
    display: none;
}
.app-pricing-container {
  display: flex;
   width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  margin: 5px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 255px;
	display: flex;
  min-height: 200px;
}
.card-header {
  padding: 0;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  min-height: 200px;
}

.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 2px 10px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
}

.card-body p {
  font-size: 13px;
  margin: 0 0 40px;
}
.user {
  display: flex;
  margin-top: auto;
}

.user img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.user-info h5 {
  margin: 0;
}
.user-info small {
  color: #545d7a;
}

h5.heading {
  padding-top: 10px;
}

ul {
  font-size: 1em;
  list-style: disc;
  margin-left: 0em;
}

li {
  text-indent: -0.6em;
  margin-bottom: 0.5em;
}

.app-close-thick {
  padding-right:25px;
  cursor:pointer;
  color: #FFFFFF;
}


// 스마트폰 가로 + 세로
@media only screen and(min-width: 320px) and (max-width: 480px) {

  /deep/ .modal-dialog {
    top: 60px;
  }
  .card {
    margin: 5px;
    height: 80vh;
    width: 300px;
  }
  .card-header {
    padding: 0;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    // min-height: 100px;

  }
}

</style>
