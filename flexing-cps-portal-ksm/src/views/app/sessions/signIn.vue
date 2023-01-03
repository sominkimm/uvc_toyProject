<template>
  <div
    class="uvc-login uvc-container"
  >
    <header class="page-header">
      <h1>
        <a
          href="https://www.uvc.co.kr"
          title="Move to UVC site"
        >
          UVC
        </a>
      </h1>
      <p><b>FLEXiNG CPS</b> PLATFORM</p>
    </header>

    <main
      role="main"
      class="page-main"
    >
      <section class="login">
        <h2>MEMBERSHIP</h2>
        <div class="tab-menu-wrap">
          <ul class="tab-menu">
            <li>
              <a
                href="#"
                :class="formClass === 'mainAccount' ? 'active' : ''"
                @click="onChangeLoginForm('mainAccount')"
              ><b>Main</b>Account User</a>
            </li>
            <li>
              <a
                href="#"
                :class="formClass === 'subAccount' ? 'active' : ''"
                @click="onChangeLoginForm('subAccount')"
              >
                <b>Sub</b>Account User</a>
            </li>
          </ul>
          <ul class="tab-contents">
            <li>
              <div class="input-wrap">
                <label for="user-id">메인 아이디를 입력하세요</label>
                <input
                  id="user-id"
                  v-model="id"
                  type="text"
                  placeholder="Enter your ID"
                  @focus="onFocus()"
                >
              </div>
            </li>
            <li>
              <div class="input-wrap">
                <label for="user-pw">8~10자리의 비밀번호를 입력하세요</label>
                <input
                  id="user-pw"
                  v-model="password"
                  type="password"
                  placeholder="Enter your Password"
                  @keydown.enter="formSubmitLogin()"
                  @focus="onFocus()"
                >
              </div>
            </li>
            <li v-if="formClass === 'subAccount'">
              <div
                class="input-wrap"
              >
                <label for="user-code">메인사용자의 접속코드를 입력하세요</label>
                <input
                  id="user-code"
                  v-model="accessCode"
                  type="text"
                  placeholder="Enter Access code"
                >
              </div>
            </li>
          </ul>
          <div class="text-center">
            <span class="font-weight-bold login-state">df{{ loginState }}</span>
          </div>
        </div>
        <div class="space" />
        <footer>
          <div class="btn-container full">
            <button
              type="button"
              class="fill"
              @click="formSubmitLogin()"
            >
              SIGN IN
            </button>
          </div>
          <a href="#">아이디/비밀번호 찾기</a>
        </footer>
      </section>
      <section class="signup flex-v">
        <div>
          <h2 class="blind">
            SIGN UP
          </h2>
          <h3>산업 디지털 트윈</h3>
          <p lang="en">
            데이터 수집 시스템
          </p>
          <p>
            (주)유비씨는 OPC UA Foundation Member로서<br>
            국내 최초로 국제 인증 3건을 획득한<br>
            스마트팩토리 부분의 CPS 플랫폼을 개발하는<br>
            기술 중심의 기업 입니다.
          </p>
          <ul class="u-list bullet">
            <li>Centralized Address Space</li>
            <li>실시간 데이터 수집 및 데이터 분석</li>
            <li>3rd Party들과의 상호 운영성 증대 </li>
          </ul>
        </div>
        <footer>
          <div class="btn-container full">
            <button
              type="button"
              class="fill_wt"
              @click="onSignUpChange()"
            >
              SIGN UP
            </button>
          </div>
          <a
            href="https://www.uvc.co.kr"
            target="_blank"
          >www.uvc.co.kr</a>
        </footer>
      </section>
    </main>

    <footer class="page-footer">
      <p><small>copyrights uvc 2022 all rights reserved</small></p>
    </footer>

    <div
      v-show="signInVisible"
      :class="`uvc-modal signup-create`"
    >
      <section class="modal-box">
        <button
          class="btn-close-circle"
          @click="onSignUpChange()"
        >
          <span class="blind">창 닫기</span>
        </button>
        <header>
          <h2>CREATE ACCOUNT</h2>
          <p>(주)유비씨의 Flexing CPS 플랫폼</p>
        </header>
        <div class="contents">
          <!-- article 에 on클래스를 붙이면 license또는 회원가입정보입력 창이 보입니다 -->
          <article :class="`license ${licenseSelectClass}`">
            <h3>라이선스 선택</h3>
            <ul class="menus">
              <li class="menu free">
                <div
                  class="summary"
                  @click="selectedLicense('free')"
                >
                  <h4>FREE</h4>
                  <p class="price">
                    Forever
                  </p>
                  <p class="limit">
                    <span class="hdd">0</span>
                    <span class="edge">0</span>
                  </p>
                </div>
                <!--<div class="details">
                  <strong class="tilte">FREE 라이선스</strong>
                  <p class="description">
                    미리 설정된 디바이스 및 엣지의 데이를 무료로 사용해 볼 수 있습니다.
                  </p>

                  <ul class="services">
                    <li>커스텀 대시보드</li>
                    <li>디바이스 관리</li>
                    <li>데이터 조회</li>
                  </ul>
                </div>
                <button
                  type="button"
                  class="btn-license"
                >
                  선택하기
                </button>-->
              </li>
              <li class="menu lite active">
                <div
                  class="summary"
                  @click="selectedLicense('lite')"
                >
                  <h4>LITE</h4>
                  <p class="price">
                    400,000
                  </p>
                  <p class="limit">
                    <span class="hdd">5</span>
                    <span class="edge">5</span>
                  </p>
                </div>
                <!--<div class="details">
                  <strong class="tilte">LITE 라이선스</strong>
                  <p class="description">
                    데이터 분석 및 데이터마켓의 기능을 제외한 모든 메뉴를 사용해 볼 수 있습니다.
                  </p>

                  <ul class="services">
                    <li>커스텀 대시보드</li>
                    <li>디바이스 관리</li>
                    <li>인증서 관리</li>
                    <li>엣지 설정</li>
                    <li>데이터 수집</li>
                    <li>데이터 조회</li>
                    <li>시스템 관리</li>
                  </ul>
                </div>
                <button
                  type="button"
                  class="btn-license"
                >
                  선택하기
                </button>-->
              </li>
              <li class="menu pro">
                <div
                  class="summary"
                  @click="selectedLicense('pro')"
                >
                  <h4>PRO</h4>
                  <p class="price">
                    500,000
                  </p>
                  <p class="limit">
                    <span class="hdd">15</span>
                    <span class="edge">5</span>
                  </p>
                </div>
                <!--<div class="details">
                  <strong class="tilte">PRO 라이선스</strong>
                  <p class="description">
                    FLEXiNG CPS플랫폼의 모든 기능을 사용해 볼 수 있습니다.
                  </p>

                  <ul class="services">
                    <li>커스텀 대시보드</li>
                    <li>디바이스 관리</li>
                    <li>인증서 관리</li>
                    <li>엣지 설정</li>
                    <li>데이터 수집</li>
                    <li>데이터 분석</li>
                    <li>데이터 마켓</li>
                    <li>데이터 조회</li>
                    <li>시스템 관리</li>
                  </ul>
                </div>
                <button
                  type="button"
                  class="btn-license"
                >
                  선택하기
                </button>-->
              </li>
              <li class="menu business">
                <div
                  class="summary"
                  @click="selectedLicense('business')"
                >
                  <h4>BUSINESS</h4>
                  <p class="price">
                    별도 문의
                  </p>
                  <p class="limit">
                    <span class="hdd">50</span>
                    <span class="edge">무제한</span>
                  </p>
                </div>
                <!--<div class="details">
                  <strong class="tilte">BUSINESS 라이선스</strong>
                  <p class="description">
                    FLEXiNG CPS플랫폼의 모든 기능을 용량제한없이 사용해 볼 수 있습니다.
                  </p>

                  <ul class="services">
                    <li>커스텀 대시보드</li>
                    <li>디바이스 관리</li>
                    <li>인증서 관리</li>
                    <li>엣지 설정</li>
                    <li>데이터 수집</li>
                    <li>데이터 분석</li>
                    <li>데이터 마켓</li>
                    <li>데이터 조회</li>
                    <li>시스템 관리</li>
                  </ul>
                </div>
                <button
                  type="button"
                  class="btn-license"
                >
                  선택하기
                </button>-->
              </li>
            </ul>

            <!-- 선택된 요금제 상세 내역 출력 -->
            <div
              v-show="license=='lite'"
              class="detail-wrap"
            >
              <h5><span>LITE</span> 라이선스</h5>
              <p class="description">
                데이터 분석 및 데이터마켓의 기능을 제외한 모든 메뉴를 사용해 볼 수 있습니다.
              </p>
              <ul class="services">
                <li>커스텀 대시보드</li>
                <li>디바이스 관리</li>
                <li>인증서 관리</li>
                <li>엣지 설정</li>
                <li>데이터 수집</li>
                <li>데이터 조회</li>
                <li>시스템 관리</li>
              </ul>
            </div>
            <div
              v-show="license=='pro'"
              class="detail-wrap"
            >
              <h5><span>PRO</span> 라이선스</h5>
              <p class="description">
                FLEXiNG CPS플랫폼의 모든 기능을 사용해 볼 수 있습니다.
              </p>
              <ul class="services">
                <li>커스텀 대시보드</li>
                <li>디바이스 관리</li>
                <li>인증서 관리</li>
                <li>엣지 설정</li>
                <li>데이터 수집</li>
                <li>데이터 분석</li>
                <li>데이터 마켓</li>
                <li>데이터 조회</li>
                <li>시스템 관리</li>
              </ul>
            </div>
            <div
              v-show="license=='business'"
              class="detail-wrap"
            >
              <h5><span>BUSINESS</span> 라이선스</h5>
              <p class="description">
                FLEXiNG CPS플랫폼의 모든 기능을 용량제한없이 사용해 볼 수 있습니다.
              </p>
              <ul class="services">
                <li>커스텀 대시보드</li>
                <li>디바이스 관리</li>
                <li>인증서 관리</li>
                <li>엣지 설정</li>
                <li>데이터 수집</li>
                <li>데이터 분석</li>
                <li>데이터 마켓</li>
                <li>데이터 조회</li>
                <li>시스템 관리</li>
              </ul>
            </div>
            <div
              v-show="license==='free'"
              class="detail-wrap"
            >
              <h5><span>FREE</span> 라이선스</h5>
              <p>미리 설정된 디바이스 및 엣지의 데이를 무료로 사용해 볼 수 있습니다.</p>
              <ul class="services">
                <li>커스텀 대시보드</li>
                <li>디바이스 관리</li>
                <li>데이터 조회</li>
              </ul>
            </div>

            <div class="btn-container half">
              <button
                type="button"
                class="fill"
                @click="signInNextPage()"
              >
                다음 단계
              </button>
            </div>
          </article>
          <article :class="`userinfo ${signInInputFormClass}`">
            <ul class="list">
              <li>
                <div class="input-wrap">
                  <label for="user-id">ID - 영문,소문자,숫자포함 8~12자리</label>
                  <input
                    id="user-id"
                    v-model="params.User.userid"
                    type="text"
                    placeholder="아이디 입력"
                  >
                </div>
                <!-- 아래 메세지에 클래스를 바꾸면 상태에 따른 글자색이 변화됩니다 passed, error -->
                <!--<strong class="input-guide passed">Welcome!! 사용가능한 아이디 입니다.</strong>-->
                <div
                  v-if="isSubmit && !$v.params.User.userid.required"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.required2', { field: $t('User.Field.userId')}) }}</strong>
                </div>
                <div
                  v-if="isSubmit && !$v.params.User.userid.maxLength"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.maxLength', { length: 50 }) }}</strong>
                </div>
                <div
                  v-if="isSubmit && (isDuplicated.name === 'userid' && isDuplicated.result)"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.overlap', { field: $t('User.Field.userId')}) }}</strong>
                </div>
              </li>
              <li>
                <div class="input-wrap">
                  <label for="user-company">Company</label>
                  <input
                    id="user-company"
                    v-model="params.User.group"
                    type="text"
                    placeholder="회사명 입력"
                  >
                </div>
                <div
                  v-if="isSubmit && !$v.params.User.group.required"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.required1', { field: $t('User.Field.companyName')}) }}</strong>
                </div>
              </li>
              <li>
                <div class="input-wrap">
                  <label for="user-code">Access code</label>
                  <input
                    id="user-code"
                    v-model="params.User.accessCode"
                    type="text"
                    placeholder="접속 코드 입력"
                  >
                </div>
                <div
                  v-if="isSubmit && !$v.params.User.accessCode.required"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.required2', { field: $t('User.Field.accessCode')}) }}</strong>
                </div>
                <div
                  v-if="isSubmit && (isDuplicated.name === 'accessCode' && isDuplicated.result)"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.overlap', { field: 'Access Code'}) }}</strong>
                </div>
              </li>
              <li>
                <div class="input-wrap">
                  <label for="user-name">Name</label>
                  <input
                    id="user-name"
                    v-model="params.User.name"
                    type="text"
                    placeholder="담당자 이름 입력"
                  >
                </div>
                <div
                  v-if="isSubmit && !$v.params.User.name.required"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.required1', { field: $t('User.Field.name')}) }}</strong>
                </div>
              </li>
              <li>
                <div class="input-wrap">
                  <label for="user-pw1">Password - 대,소문자,숫자,특수문자 포함, 8글자 이상</label>
                  <input
                    id="user-pw1"
                    v-model="params.User.password"
                    type="text"
                    placeholder="비밀번호 입력"
                  >
                </div>
                <div
                  v-if="isSubmit && !$v.params.User.password.required"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.required2', { field: $t('User.Field.password')}) }}</strong>
                </div>
                <div
                  v-if="isSubmit && $v.params.User.password.required
                    && !$v.params.User.password.checkPasswordValidator"
                  class="app-validation"
                >
                  <strong class="input-guide error">{{ $t('Common.Message.Validate.passwordCondition') }}</strong>
                </div>
                <!--<strong class="input-guide passed">사용가능한 비밀번호 입니다.</strong>-->
              </li>
              <li>
                <div class="input-wrap">
                  <label for="user-pw2">Password</label>
                  <input
                    id="user-pw2"
                    v-model="params.User.passwordConfirm"
                    type="text"
                    placeholder="비밀번호 확인"
                  >
                </div>
                <div
                  v-if="isSubmit && !$v.params.User.passwordConfirm.sameAsPassword"
                  class="app-validation"
                >
                  <strong class="input-guide passed">{{ $t('Common.Message.Validate.passwordConfirm') }}</strong>
                </div>
              </li>
              <li>
                <div class="input-wrap">
                  <label for="user-mail">E-mail Address</label>
                  <input
                    id="user-mail"
                    v-model="params.User.email"
                    type="email"
                    placeholder="이메일 주소 입력"
                  >
                </div>
              </li>
            </ul>

            <div class="btn-container confirm">
              <button
                type="button"
                class="prev"
                @click="signInBackPage()"
              >
                Back
              </button>
              <button
                type="button"
                class="next"
                @click="formSubmitJoin()"
              >
                SIGN UP
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import fncUtil from '@/lib/fncUtil'
import { maxLength, required, sameAs } from 'vuelidate/lib/validators'

const checkPasswordValidator = (value) => {
  return fncUtil.checkPasswordValidator(value)
}

export default {
  components: {},
  mixins: [mixinUtil],
  data () {
    return {
      params: {
        User: {
          userid: null,
          name: null,
          password: null,
          passwordConfirm: null,
          email: null,
          role: null,
          group: null,
          license: 'free',
          accessCode: null,
          createdAt: null,
          updatedAt: null,
          deletedAt: null
        }
      },
      valid: false,
      userid: '',
      topLogo: require('@/assets/images/ko/product/uvc_logo_foot.png'),
      bgImage: require('@/assets/images/background/andre-benz-bg.jpg'),
      logo: require('@/assets/images/logo/flexing-cps_logo_2-removebg-preview.png'),
      signInImage: require('@/assets/images/photo-long-3.jpg'),
      id: '',
      password: '',
      accessCode: '',
      loginState: '',
      signClass: '',
      license: 'free',
      licenseSelectClass: '',
      signInInputFormClass: '',
      isDuplicated: {
        result: false,
        name: null
      },
      isSubmit: false,
      mobileBtn: 'signIn',
      mobileBtnClass: 'app-mobile-signIn-btn-visible',
      formClass: 'mainAccount',
      signInVisible: false
    }
  },
  validations: {
    params: {
      User: {
        name: { required },
        group: { required },
        userid: { required, maxLength: maxLength(50) },
        accessCode: {
          required
        },
        password: {
          required,
          checkPasswordValidator
        },
        passwordConfirm: { required, sameAsPassword: sameAs('password') }
      }
    },
    paramsExt: {}
  },
  computed: {
    ...mapGetters('UserMng', {
      infoData: 'UserMngData',
      loading: 'UserMngLoading',
      loginCount: 'UserMngLoginCount',
      userInfoData: 'UserData',
      priceOpen: 'UserMngPriceOpen'
    }),
    ...mapGetters('UserMng', {
      infoResult: 'UserMngResult',
      insertedId: 'UserMngInsertedId',
      duplicated: 'UserMngDuplicated',
      loginRouter: 'UserMngLoginRouter'
    }),
    ...mapGetters('Group', { groupListRows: 'GroupListRows' }),
    ...mapGetters('Current', { currUser: 'CurrUser' }),
    ...mapGetters('License', {
      licenseListRows: 'LicenseListRows'
    }),
    licenseDataRows () {
      return this.licenseListRows
    },
    groupDataRows () {
      const returnData = this.groupListRows
      return returnData
    },
    validation () {
      return this.userid.length > 4 && this.userid.length < 13
    }
  },
  watch: {
    insertedId (value) { // 등록 후 처리
      if (value !== null) {
        if (value < 0) {
          // 등록 실패
          this.makeToastError(this.infoResult) // 실패 시 메세지
        } else if (value > 0) {
          // 등록 성공
          this.$bvModal.hide('modal-session-pricing-form')
          this.confirmJoin()
        }
      }
    },
    duplicated (value) { // 중복 여부 체크
      if (value.name !== '') {
        if (value.result === true) { // 중복일 경우
          this.isSubmit = true
          this.isDuplicated = value
        } else { // 중복이 아닐 경우
          this.$bvModal.show('modal-session-pricing-form')
        }
      }
    },
    loginRouter (value) {
      this.$router.push({ name: value }).catch(() => {})
    },
    loginCount (value) { // 로그인 후 처리
      this.loginState = ''
      if (value !== null) {
        if (value < 0) { // 로그인 실패
          if (this.infoResult.code === 'BAD_REQUEST_INVALID_ADMIN_ACCOUNT') {
            // admin 폼에 user가 접근했을 경우
            this.loginState = this.$t('User.message.invalidAdminAccount')
          } else if (this.infoResult.code === 'BAD_REQUEST_INVALID_USER_ACCOUNT') {
            // user 폼에 user 외의 권한 사용자가 접근했을 경우
            this.loginState = this.$t('User.message.invalidUserAccount')
          } else {
            this.loginState = this.$t('User.message.loginInfoReCheck')
          }
        } else if (value > 0) { // 로그인 성공
          this.actUserMngMenuLoginRouterCheck(this.userInfoData)
        }
      }
    }
  },
  created () {
    this.onChangeLoginForm('mainAccount')
    this.actJoinLicenseList()
  },
  mounted () {
    this.actCurrInit()
  },
  methods: {
    ...mapActions(['login']),
    ...mapActions('UserMng', [
      'actUserMngLogin',
      'actUserMngMainAccountDuplicated',
      'actUserMngPriceOpen',
      'actUserMngMenuLoginRouterCheck'
    ]),
    ...mapActions('UserMng', [
      'actUserMngJoinAdmin'
    ]),
    ...mapActions('License', ['actJoinLicenseList']),
    ...mapActions('Current', ['actCurrInit']),
    paramsInit () {
      // this.signClass = 'signup-create'
      this.isSubmit = false
      this.licenseSelectClass = 'on'
      this.signInInputFormClass = ''
      this.params.User = {
        userid: null,
        name: null,
        password: null,
        passwordConfirm: null,
        email: null,
        role: null,
        group: null,
        license: 'free',
        accessCode: null,
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      }
      this.id = ''
      this.password = ''
      this.accessCode = ''
    },
    formSubmitLogin () {
      this.$router.push({ name: 'license' }).catch(() => {})
    },
    formSubmitJoin () {
      this.$v.$touch() // validateion 전체 체크
      this.isSubmit = true
      if (!this.$v.$invalid) { // validation 통과 시 submit 실행
        this.actUserMngMainAccountDuplicated(this.params.User)
        this.isSubmit = false
      }
    },
    onPricing (val) {
      this.actUserMngJoinAdmin({
        body: {
          // 사용자 정보
          name: this.params.User.name,
          userid: this.params.User.userid,
          password: this.params.User.password,
          email: this.params.User.email,
          active: true,
          license: this.license,
          menuAuth: val.menuAuth,
          role: 'mainAccount',
          groupName: this.params.User.group,
          accessCode: this.params.User.accessCode
        }
      })
    },
    onChangeLoginForm (type) {
      // 로그인 form 변경
      this.paramsInit()
      this.formClass = type
    },
    confirmJoin () {
      const h = this.$createElement
      // Using HTML string
      const titleVNode = h('div', {
        domProps: { innerHTML: '<h6 class="heading">Happy Work Place <i>UVC<i></h6>' }
      })
      // More complex structure
      const messageVNode = h('div', { class: ['foobar'] }, [
        h('p', { class: ['text-center text-join-success'] }, [
          this.params.User.name + this.$t('SignUp.message.welcomMsg'),
          h('strong', ':-)')
        ]),
        h('span', { class: ['text-center'] }, [
          this.$t('SignUp.message.successJoin')
        ]),
        h('span', { class: ['text-center'] }, [
          this.$t('SignUp.message.joinFin')
        ])
      ])
      this.$bvModal.msgBoxOk([messageVNode], {
        title: [titleVNode],
        buttonSize: 'sm',
        okTitle: this.$t('button.confirmBtn'),
        centered: true,
        size: 'sm'
      }).then(() => {
        this.onSignInChange()
      }).catch(err => {
        console.error(err)
      })
    },
    onFocus () {
      this.loginState = ''
    },
    onSignInChange () {
      this.paramsInit()
    },
    onSignUpChange () {
      this.license = 'free'
      this.paramsInit()
      this.signInVisible = !this.signInVisible
    },
    onMobileBtnVisible (val) {
      // 모바일 화면의 버튼 visibled 상태 변경
      this.mobileBtn = val
      if (val === 'signIn') {
        this.onSignInChange()
      } else if (val === 'signUp') {
        this.onSignUpChange()
      }
    },
    // licenseCheck (val) {
    //   return (this.currUser.license)
    //     ? (this.currUser.license === val)
    //       ? this.$t('SignUp.button.inuse') : this.$t('SignUp.button.change') : this.$t('SignUp.button.start')
    // },
    // 입력폼에 focus되었을 때 li에 클래스 focus 붙이기
    inputFocus () {
      const inputs = document.querySelector('.uvc-login .login .input-wrap')
      inputs.forEach(e => {
        e.addEventListener('focus', (event) => {
          event.currentTarget.classList.add('focus')
        })
      })
    },
    signInNextPage () {
      if (this.license) {
        this.licenseSelectClass = ''
        this.signInInputFormClass = 'on'
      }
    },
    signInBackPage () {
      this.licenseSelectClass = 'on'
      this.signInInputFormClass = ''
    },
    selectedLicense (value) {
      this.license = value
      this.params.User.license = value
    }
  }
}

</script>
