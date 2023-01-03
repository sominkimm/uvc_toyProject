import { componentsPlugin } from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'

const {
  VUE_APP_NAME
} = process.env
export default {
  data () {
    return {
      // 여기에 공통으로 사용할 상수(?)들
      temp: 'test',
      noImage: require('@/assets/images/no-image-icon.png'),
      environment: VUE_APP_NAME,
      colors: {
        blue: '#3b82f6',
        midnightBlue: '#0c0c3c',
        indigo: '#6366f1',
        darkPurple: '#322740',
        purple: '#a855f7',
        pink: '#ec4899',
        red: '#ef4444',
        orange: '#f97316',
        yellow: '#f59e0b',
        green: '#10b981',
        teal: '#14b8a6',
        cyan: '#06b6d4',
        gray: '#71717a',
        slateGray: '#64748b',
        whiteGray: '#C8C8C8'
      },
      table: { // vue-good-table의 속성들
        lineNumbers: true, // true: 라인번호 출력
        style: 'tableOne vgt-table condensed striped',
        maxHeight: '62vh'
      },
      status: {
        role: {
          super: 'primary',
          provider: 'primary',
          admin: 'info',
          user: 'success'
        },
        license: {
          business: 'danger',
          pro: 'primary',
          lite: 'info',
          free: 'success'
        }
      },
      button: { // 버튼 스타일
        variant: {
          default: 'primary',
          search: 'primary',
          cardMax: 'secondary',
          addNew: 'primary',
          info: 'outline-primary',
          save: 'primary',
          insert: 'info',
          update: 'light',
          delete: 'danger',
          cancel: 'secondary',
          copy: 'primary',
          reset: 'outline-light',
          view: 'outline-light',
          refresh: 'primary',
          request: 'success',
          state: 'info',
          ok: 'primary',
          export: 'primary',
          compare: 'primary',
          apply: 'primary',
          download: 'warning',
          connect: 'primary',
          preview: 'primary'
        },
        toggle: {
          width: 30,
          height: 15,
          variant: {
            standard: 'standard',
            primary: 'primary',
            secondary: 'secondary',
            error: 'error',
            info: 'info'
          }
        }
      },
      multiSelect: {
        maxHeight: 200
      },
      tags: {
        pill: false,
        variant: 'info app-tags'
      },
      devExtrem: {
        pager: {
          pageSizes: [5, 10, 'all'],
          showPageSizeSelector: true,
          showInfo: true,
          showNavButtons: true
        }
      },
      fixedActive: false,
      gridDelayLoading: false
    }
  },
  beforeCreate () {},
  computed: {
    ...mapGetters('Current', { currUser: 'CurrUser', currLocation: 'CurrLocation' }),
    checkMenuAuth () { // 권한체크
      // grid딜레이 로딩, 타임아웃은 밑에서 위로 올라오는 애니메이션 동작중에 다시 그려져서 깜빡거리는거 임시방편으로 해결하기위해 넣어둠 (2022-05-12, 조승민)
      // TODO: 진짜 이유 찾아야함
      this.gridDelayLoading = false
      this.$nextTick(() => {
        setTimeout(() => {
          this.gridDelayLoading = true
        }, 300)
      })
      // authType: 권한 타입, path: 권한을 검증할 위치(생략가능: 현재위치)
      return (authType, path) => {
        // TODO : 권한 체크 로직을 생각할 필요 있음...
        let checkAuth = false
        if (this.currUser.userid === null || this.currLocation.pathName === null) {
          checkAuth = true // 아직 store currUser action 미실행
        } else {
          const providerMenuArray = ['license', 'authorizationProvider', 'mngUserResource'] // provider 전용 메뉴
          const notPageAuth = ['signOut', 'notPermission', 'notFound', 'notNetwork', 'preparing']
          const notPageSubAuth = ['user', 'authorization'] // sub 권한 사용자 접근 불가
          const menuAuth = this.currUser.menuAuth[0]
          const menuAuthArry = Object.entries(menuAuth)
          const authTypeTemp = authType.substr(4).toLowerCase()

          let isPreprocessing = false // 권한 체크 진행여부 변수
          switch (this.currUser.role) {
          case 'provider':
            isPreprocessing = false
            break
          case 'mainAccount':
            if (providerMenuArray.indexOf(this.currLocation.pathName) === -1) {
              isPreprocessing = true
            } else {
              isPreprocessing = false
            }
            break
          case 'subAccount':
            if (notPageSubAuth.indexOf(this.currLocation.pathName) === -1 ||
            providerMenuArray.indexOf(this.currLocation.pathName) === -1) {
              isPreprocessing = true
            } else {
              isPreprocessing = false
            }
            break
          }

          if (isPreprocessing === true) {
            if (authType === 'authMenu') {
              for (const m in menuAuthArry) {
                if (menuAuthArry[m][0] === this.currLocation.pathName) {
                  if (menuAuthArry[m][1].auth.menu === true) {
                    checkAuth = true
                  } else {
                    checkAuth = false
                  }
                  break
                }
              }
            } else {
              if (notPageAuth.indexOf(this.currLocation.pathName) === -1) {
                checkAuth = menuAuth[this.currLocation.pathName].auth[authTypeTemp]
              } else {
                checkAuth = true
              }
            }
          } else {
            if (this.currUser.role === 'provider') {
              checkAuth = providerMenuArray.indexOf(this.currLocation.pathName) !== -1
            } else {
              checkAuth = false
            }
          }
        }
        return checkAuth
      }
    }
  },
  methods: {
    formattedFixedNumber (number, fixed) { // 소수점 버리기
      if (typeof number !== 'number') return 0
      if (number === 0 || number === Infinity || isNaN(number)) return 0

      return parseFloat(number.toFixed(fixed)).toLocaleString()
    },
    formattedFixedMoney (number) {
      const result = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return result
    },
    makeResultText (resData) { // 결과를 Text로 출력
      let resultText = null
      if (resData.status && resData.status === 200) {
        resultText = 'success'
      } else {
        resultText = 'error'
      }

      return resultText
    },
    makeToastSuccess (resData, message) { // 성공 메세지
      // 200인 경우에만 출력
      // TODO: resData 값에 message가 있는데도 message 변수를 다시 받는 이유는?
      if (resData.status && resData.status === 200) {
        const title = 'SUCCESS'
        const variant = 'success'
        // message가 없으면 status에 맞는 기본 메세지 출력
        const content = message || this.$t(`Common.Message.Success.${resData.status}`)

        this.$bvToast.toast(content, {
          title: title,
          variant: variant,
          solid: true
        })
      }
    },
    makeToastError (resData) { // 실패 메세지
      if (resData.status && resData.status >= 400 && resData.status <= 499) {
        // 400에러
        const title = `[${resData.status}] WARNING`
        const variant = 'warning'
        const content = resData.message || this.$t(`Common.Message.Error.${resData.status}`) // message가 없으면 status에 맞는 기본 메세지 출력

        this.$bvToast.toast(content, {
          title: title,
          variant: variant,
          solid: true
        })
      } else if (resData.status && resData.status === 500) {
        // 500에러

        // // API서버연결 자체가 안되는 경우는 다음과 같이 처리 한다.
        // if (resData.code === 'REQUEST_FAIL') {
        //   message = this.$t('Common.Message.Error.requestFail')
        // } -> REQUEST_FAIL 일때도 서버에서 error message 담아서 주자

        const title = `[${resData.status}] ERROR`
        const variant = 'danger'
        const content = resData.message || this.$t(`Common.Message.Error.${resData.status}`) // message가 없으면 status에 맞는 기본 메세지 출력

        this.$bvToast.toast(content, {
          title: title,
          variant: variant,
          solid: true
        })
      }
    },
    makeToast (message = '', variant = 'warning', title = 'MESSAGE') { // 일반 메세지
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    makeCommaNumber (number) { // 숫자에 콤마 찍기
      return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') || 0
    },
    async makeConfirmModal (message) { // 확인 안내창
      let result = false
      await this.$bvModal.msgBoxConfirm(message, {
        title: this.$t('Common.Action.msgConfirm'),
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'primary',
        okTitle: this.$t('Common.Action.ok'),
        cancelTitle: this.$t('Common.Action.cancel'),
        footerClass: 'p-2 app-confirm-footer',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          result = value
        })
      return result
    },
    formattedFixedTextLength (text, fixed) { // 테이블 글자수 제한
      if (text !== null && text !== undefined) {
        if (text.length > fixed) {
          text = text.substr(0, fixed - 2) + '...'
        }
      }
      return text
    },
    isDevelopment () {
      return this.environment === 'develop'
    }
  }
}
