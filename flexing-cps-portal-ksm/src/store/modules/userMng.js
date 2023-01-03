import api from '@/lib/apiUtil'
import fncUtil from '@/lib/fncUtil'
import jwtDecode from 'jwt-decode'
import router from '@/routes/router'

const stateInit = {
  User: {
    email: null,
    groupId: null,
    id: null,
    name: null,
    role: null,
    userid: null,
    menuAuth: []
  },
  UserMng: {
    Groups: {
      accessCode: null,
      createdAt: null,
      id: null,
      license: null,
      location: null,
      name: null,
      namespace: null,
      paymentAt: null,
      updatedAt: null
    },
    id: 0,
    userid: null,
    groupId: 0,
    name: '',
    password: null,
    email: null,
    auth: 'subAccount',
    active: false,
    role: 'subAccount',
    balance: 0,
    accessCode: null,
    menuAuth: [],
    updatedPassword: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null
  },
  MenuAuth: {
    free: [{ // FREE [대시보드, 디바이스 관리, 데이터 조회, 시스템 관리(리소스 관리)]
      monitoring: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      deviceSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      tableRetrieve: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      userResource: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      }
    }],
    lite: [{ // LITE [대시보드, 디바이스 관리, 인증서 관리, 엣지 설정, 데이터 수집, 데이터 조회, 시스템 관리(전체)]
      monitoring: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      deviceSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      certificationSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      edgeSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      profileMaker: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      opcuaModeler: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      tableRetrieve: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      user: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      authorization: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      userResource: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      }
    }],
    pro: [{ // PRO [대시보드, 디바이스 관리, 인증서 관리, 엣지 설정, 데이터 수집, 데이터 분석, 데이터 공유, 데이터 조회, 시스템 관리(전체)]
      monitoring: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      deviceSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      certificationSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      edgeSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      profileMaker: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      opcuaModeler: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataPreprocessing: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      eda: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      machineLearning: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataFlow: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      anomaly: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataMarket: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      tableRetrieve: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      user: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      authorization: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      userResource: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      }
    }],
    business: [{ // BUSINESS 전체
      monitoring: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      deviceSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      certificationSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      edgeSetting: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      profileMaker: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      opcuaModeler: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataPreprocessing: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      eda: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      machineLearning: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataFlow: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      anomaly: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataMarket: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      tableRetrieve: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      user: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      authorization: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      userResource: {
        auth: {
          menu: true,
          create: true,
          read: true,
          update: true,
          delete: true
        }
      }
    }]
  }
}

// TODO: state.모델명.open 값은 미사용
export default {
  namespaced: true,
  state: {
    User: {
      data: { ...stateInit.User }
    },
    UserMng: {
      data: { ...stateInit.UserMng },
      loading: false,
      result: null,
      insertedId: null,
      updatedCount: null,
      updatedCountPassword: null,
      duplicated: {
        result: false,
        name: null
      },
      loginCount: null,
      loginRouter: null,
      informType: 'info',
      open: false,
      priceOpen: false
    },
    MenuAuth: {
      data: { ...stateInit.MenuAuth }
    },
    UserMngList: {
      count: 0,
      rows: [],
      loading: false,
      result: null
    }
  },
  getters: {
    // User
    UserData: state => state.User.data,
    // Login
    UserMngLoginRouter: state => state.UserMng.loginRouter,
    // MenuAuth
    MenuAuthData: state => state.MenuAuth.data,
    // UserMng
    UserMngData: state => state.UserMng.data,
    UserMngLoading: state => state.UserMng.loading,
    UserMngResult: state => state.UserMng.result,
    UserMngInsertedId: state => state.UserMng.insertedId,
    UserMngUpdatedCount: state => state.UserMng.updatedCount,
    UserMngUpdatedCountPassword: state => state.UserMng.updatedCountPassword,
    UserMngDuplicated: state => state.UserMng.duplicated,
    UserMngLoginCount: state => state.UserMng.loginCount,
    UserMngInformType: state => state.UserMng.informType,
    UserMngOpen: state => state.UserMng.open,
    UserMngPriceOpen: state => state.UserMng.priceOpen,
    // UserMng list
    UserMngListCount: state => state.UserMngList.count,
    UserMngListRows: state => state.UserMngList.rows,
    UserMngListLoading: state => state.UserMngList.loading,
    UserMngListResult: state => state.UserMngList.result
  },
  mutations: {
    // User
    setUserData (state, data) {
      state.User.data = {
        email: data.email,
        groupId: data.groupId,
        id: data.id,
        name: data.name,
        role: data.role,
        userid: data.userid,
        menuAuth: data.menuAuth
      }
    },
    // UserMng
    setUserMngData (state, data) {
      state.UserMng.data = data
    },
    setUserMngLoading (state, data) {
      state.UserMng.loading = data
    },
    setUserMngResult (state, data) {
      state.UserMng.result = data
    },
    setUserMngInsertedId (state, data) {
      state.UserMng.insertedId = data
    },
    setUserMngUpdatedCount (state, data) {
      state.UserMng.updatedCount = data
    },
    setUserMngUpdatedCountPassword (state, data) {
      state.UserMng.updatedCountPassword = data
    },
    setUserMngDuplicated (state, data) {
      state.UserMng.duplicated = data
    },
    setUserMngLoginCount (state, data) {
      state.UserMng.loginCount = data
    },
    setUserMngLoginRouter (state, data) {
      state.UserMng.loginRouter = data
    },
    setUserMngInformType (state, data) {
      state.UserMng.informType = data
    },
    setUserMngOpen (state, data) {
      state.UserMng.open = data
    },
    setUserMngPriceOpen (state, data) {
      state.UserMng.priceOpen = data
    },
    setUserMngInit (state) {
      state.UserMng.data = { ...stateInit.UserMng }
      state.UserMng.result = null
    },
    // UserMng list
    setUserMngListCount (state, data) {
      state.UserMngList.count = data
    },
    setUserMngListRows (state, data) {
      state.UserMngList.rows = data
    },
    setUserMngListLoading (state, data) {
      state.UserMngList.loading = data
    },
    setUserMngListResult (state, data) {
      state.UserMngList.result = data
    },
    setUserMngListInit (state) {
      state.UserMngList.count = 0
      state.UserMngList.rows = []
      state.UserMngList.result = null
    }
  },
  actions: {
    // 상세 정보 초기화 - 입력폼 상태
    actUserMngInit (context, payload) {
      context.commit('setUserMngInit')
      context.commit('setUserMngInformType', 'insert')

      if (payload === 'open') {
        context.commit('setUserMngOpen', true)
      } else if (payload === 'close') {
        context.commit('setUserMngOpen', false)
      }
    },
    // login
    actUserMngLogin (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoginCount', null)
      // 2. api호출
      api.post('/api/auth/token', payload).then((response) => {
        // 3. 결과값 세팅 - 정상
        const token = window.localStorage.getItem('access-token')
        const decodedToken = jwtDecode(token)
        context.commit('setUserData', decodedToken)
        context.commit('setUserMngLoginCount', 1)
      }).catch((error) => {
        // console.error('actUserMngLogin error : ', error)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoginCount', -1)
      })
    },
    // logout
    actUserMngLogout (context, payload) {
      // setTimeout을 해줘야 state값 변화를 잡아낼 수 있다.
      context.commit('setUserMngLoading', true)
      setTimeout(() => {
        api.delete('/api/auth/token').then(() => {
          window.localStorage.removeItem('access-token')
          context.commit('setUserMngLoading', false)
        }).catch(() => {
          context.commit('setUserMngLoading', false)
        })
      }, 100)
    },
    // login Menu Auth check
    actUserMngMenuLoginRouterCheck (context, payload) {
      // 로그인 후 메뉴 이동 시 메뉴 권한 체크
      // 1. 사전 세팅
      context.commit('setUserMngLoginRouter', null)
      // 2. api호출
      api.get('/api/user/currInfo').then((response) => {
        // 3. 결과값 세팅 - 정상
        const role = response.data.data.role
        const menuAuth = response.data.data.menuAuth[0]
        const menuAuthArry = Object.entries(menuAuth)

        if (role === 'provider') {
          context.commit('setUserMngLoginRouter', 'mngUserResource')
        } else {
          for (const m in menuAuthArry) {
            if (menuAuthArry[m][1].auth.menu === true) {
              context.commit('setUserMngLoginRouter', menuAuthArry[m][0])
              break
            }
          }
        }
      }).catch(() => {
        // console.error('error : ', error)
      })
    },
    // 서브 계정 관리에서 사용자 추가 시 아이디 duplicated (Sub Account)
    actUserMngSubAccountDuplicated (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngInsertedId', null)
      context.commit('setUserMngDuplicated', {
        result: false,
        name: ''
      })
      // 2. api 호출
      api.get(`/api/user/duplicated/subAccount/${payload.body.userid}`).then((response) => {
        const data = response.data.data ? response.data.data : null
        if (data.isDuplicated === true) { // 중복된 데이터가 존재
          context.commit('setUserMngDuplicated', {
            result: true,
            name: 'userid'
          })
          context.commit('setUserMngLoading', false)
        } else {
          // 중복된 userid가 없을때 insert 처리
          context.dispatch('actUserMngInsert', payload)
        }
      }).catch((error) => {
        context.commit('setUserMngInsertedId', -1)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // 회원가입 시 아이디 duplicated (Main Account)
    actUserMngMainAccountDuplicated (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngInsertedId', null)
      context.commit('setUserMngDuplicated', {
        result: false,
        name: ''
      })
      // 2. api 호출
      api.get(`/api/user/duplicated/mainAccount/${payload.userid}`).then((response) => {
        const data = response.data.data ? response.data.data : null
        if (data.isDuplicated === true) { // 중복된 데이터가 존재
          context.commit('setUserMngDuplicated', {
            result: true,
            name: 'userid'
          })
        } else {
          // 중복된 userid가 없을때 접근 코드를 중복 체크
          context.dispatch('actUserMngAccessCodeDuplicated', payload)
        }
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        context.commit('setUserMngInsertedId', -1)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // 회원가입 시 접속코드 duplicated (접근 코드 중복 체크 action)
    actUserMngAccessCodeDuplicated (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngInsertedId', null)
      context.commit('setUserMngDuplicated', {
        result: false,
        name: ''
      })
      // 2. api 호출
      api.get(`/api/group/duplicated/${payload.accessCode}`).then((response) => {
        const data = response.data.data ? response.data.data : null
        if (data.isDuplicated === true) { // 중복된 데이터가 존재
          context.commit('setUserMngDuplicated', {
            result: true,
            name: 'accessCode'
          })
        } else {
          // 중복된 accessCode 없을때 signIn.vue의 duplicated 데이터를 변경해서 처리
          context.commit('setUserMngDuplicated', {
            result: false,
            name: 'accessCode'
          })
          // 중복된 userid가 없을때 접근 코드를 중복 체크
          // 접근 코드 중복 체크 action
          // context.dispatch('actUserMngAccessCodeDuplicated', payload)
        }
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        context.commit('setUserMngInsertedId', -1)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // Join group
    // actUserMngJoinGroup (context, payload) { // 회원가입 그룹 등록 로직
    //   // 1. 사전 세팅
    //   context.commit('setUserMngInsertedId', null)
    //   // 2. api 호출
    //   // 그룹명 먼저 생성
    //   const requestBody = { ...payload.param }
    //   api.post('/api/group/signUp', requestBody).then((response) => {
    //     const insertedId = response.data.data && response.data.data.insertedId ? response.data.data.insertedId : null
    //     // 그룹 추가 하면 리턴된 idx 값을 가지고
    //     // 사용자 추가
    //     context.dispatch('actUserMngJoinUser', {
    //       param: {
    //         ...payload.param
    //       },
    //       body: {
    //         ...payload.body,
    //         groupId: insertedId
    //       }
    //     })
    //   }).catch((error) => {
    //     // 3. 결과값 세팅 - 에러
    //     context.commit('setUserMngInsertedId', -1)
    //     context.commit('setUserMngResult', error)
    //     context.commit('setUserMngLoading', false)
    //   })
    // },
    // Join user
    actUserMngJoinUser (context, payload) { // 회원가입 사용자 등록 로직
      // 1. 사전 세팅
      context.commit('setUserMngInsertedId', null)
      const license = payload.param.license
      // 2. api 호출
      const requestBody = {
        ...payload.body,
        menuAuth: context.state.MenuAuth.data[license]
      }

      api.post('/api/user/signUp', requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const insertedId = response.data.data && response.data.data.insertedId ? response.data.data.insertedId : null

        // 3. 결과값 세팅 - 정상
        context.commit('setUserMngInsertedId', insertedId)
        context.commit('setUserMngResult', result)
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        if (fncUtil.isDuplicatedData(error.code)) { // 중복 에러 체크
          context.commit('setUserMngDuplicated', {
            result: fncUtil.isDuplicatedData(error.code),
            name: fncUtil.isDuplicatedData(error.code) ? error.message : null
          })
        } else {
          context.commit('setUserMngInsertedId', -1)
        }
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // Join admin (최종 회원가입)
    actUserMngJoinAdmin (context, payload) { // 회원가입 사용자 등록 로직
      // 1. 사전 세팅
      context.commit('setUserMngInsertedId', null)
      // const license = payload.body.license
      // 2. api 호출
      const requestBody = {
        ...payload.body
        // menuAuth: context.state.MenuAuth.data[license]
      }

      api.post('/api/user/admin', requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const insertedId = response.data.data && response.data.data.insertedId ? response.data.data.insertedId : null

        // 3. 결과값 세팅 - 정상
        context.commit('setUserMngInsertedId', insertedId)
        context.commit('setUserMngResult', result)
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        if (fncUtil.isDuplicatedData(error.code)) { // 중복 에러 체크
          context.commit('setUserMngDuplicated', {
            result: fncUtil.isDuplicatedData(error.code),
            name: fncUtil.isDuplicatedData(error.code) ? error.message : null
          })
        } else {
          context.commit('setUserMngInsertedId', -1)
        }
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // list
    actUserMngList (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngListLoading', true)

      // 2. api호출
      const requestParams = { ...payload.params }
      api.get('/api/user/list', { params: requestParams }).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const count = response.data.data && response.data.data.count ? response.data.data.count : 0
        const rows = response.data.data && response.data.data.rows ? response.data.data.rows : []
        // 3. 결과값 세팅 - 정상
        context.commit('setUserMngListCount', count)
        context.commit('setUserMngListRows', rows)
        context.commit('setUserMngListResult', result)
        context.commit('setUserMngListLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setUserMngListResult', error)
        context.commit('setUserMngListLoading', false)
      })
    },
    // info
    actUserMngInfo (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngInit')
      context.commit('setUserMngInformType', 'info')

      // 2. api호출
      //   api.get(`/api/user/${payload.id}`).then((response) => {
      //     const result = fncUtil.setApiResult(response.data)
      //     const data = response.data.data ? response.data.data : {}

      //     // 3. 결과값 세팅 - 정상
      //     context.commit('setUserMngData', data)
      //     context.commit('setUserMngResult', result)
      //     context.commit('setUserMngLoading', false)
      //   }).catch((error) => {
      //     // 3. 결과값 세팅 - 에러
      //     context.commit('setUserMngResult', error)
      //     context.commit('setUserMngLoading', false)
      //   })
      // TODO: 임시 처리 why? app3에서는 상세정보를 보여줄때 서버통신을 하지만 cps는 현재 리스트의 데이터를 그대로 상세정보로 표시
      context.commit('setUserMngData', payload.data)
      context.commit('setUserMngLoading', false)
    },
    // myfage
    // actUserMngMypageInfo (context, payload) {
    //   // 1. 사전 세팅
    //   context.commit('setUserMngLoading', true)
    //   context.commit('setUserMngInit')
    //   // context.commit('setUserMngInformType', 'info')

    //   // 2. api호출
    //   api.get('/api/user/myPage').then((response) => {
    //
    //     const result = fncUtil.setApiResult(response.data)
    //     const data = response.data.data ? response.data.data : {}

    //     // 3. 결과값 세팅 - 정상
    //     context.commit('setUserData', data)
    //     // context.commit('setUserMngResult', result)
    //     // context.commit('setUserMngLoading', false)
    //   }).catch((error) => {
    //     // 3. 결과값 세팅 - 에러
    //
    //     context.commit('setUserMngResult', error)
    //     context.commit('setUserMngLoading', false)
    //   })
    // },
    // 상세 정보 open/close 세팅
    actUserMngOpen (context, payload) {
      if (payload === 'open') {
        context.commit('setUserMngOpen', true)
      } else if (payload === 'close') {
        context.commit('setUserMngOpen', false)
      }
    },
    actUserMngPriceOpen (context, payload) {
      if (payload === 'open') {
        context.commit('setUserMngPriceOpen', true)
      } else if (payload === 'close') {
        context.commit('setUserMngPriceOpen', false)
      }
    },
    // insert 사용자 관리 메뉴에서 사용자 추가
    actUserMngInsert (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngInsertedId', null)

      // 2. api 호출
      const requestBody = {
        ...payload.body
      }

      api.post('/api/user', requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const insertedId = response.data.data && response.data.data.insertedId ? response.data.data.insertedId : null

        // 3. 결과값 세팅 - 정상
        context.commit('setUserMngInsertedId', insertedId)
        context.commit('setUserMngResult', result)
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        context.commit('setUserMngInsertedId', -1)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // update
    actUserMngUpdate (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngUpdatedCount', null)

      // 2. api호출
      const requestBody = { ...payload.body }
      api.put(`/api/user/id/${payload.param.id}`, requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.updatedCount
          ? response.data.data.updatedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setUserMngUpdatedCount', updatedCount)
        context.commit('setUserMngResult', result)
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setUserMngUpdatedCount', -1)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // password update
    actUserMngPasswordUpdate (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngUpdatedCountPassword', null)
      // 2. api호출
      const requestBody = { ...payload.body }
      api.put(`/api/user/password/id/${payload.param.id}`, requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.updatedCount ? response.data.data.updatedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setUserMngUpdatedCountPassword', updatedCount)
        context.commit('setUserMngResult', result)
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setUserMngUpdatedCountPassword', -1)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    },
    // user delete
    actUserMngDelete (context, payload) {
      // 1. 사전 세팅
      context.commit('setUserMngLoading', true)
      context.commit('setUserMngUpdatedCount', null)
      // 2. api호출
      api.delete(`/api/user/${payload.param.id}`).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.deletedCount ? response.data.data.deletedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setUserMngUpdatedCount', updatedCount)
        context.commit('setUserMngResult', result)
        context.commit('setUserMngLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setUserMngUpdatedCount', -1)
        context.commit('setUserMngResult', error)
        context.commit('setUserMngLoading', false)
      })
    }
  }
}
