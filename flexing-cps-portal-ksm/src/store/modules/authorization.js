import api from '@/lib/apiUtil'
import fncUtil from '@/lib/fncUtil'

const stateInit = {
  Authorization: {
    routerMenu: [],
    createdAt: null,
    updatedAt: null,
    deletedAt: null
  },
  MenuAuth: {
    free: [{
      monitoring: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      deviceSetting: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      tableRetrieve: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      }
    }],
    lite: [{
      monitoring: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      deviceSetting: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      certificationSetting: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      edgeSetting: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      profileMaker: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      opcuaModeler: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataPreprocessing: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      eda: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      machineLearning: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataFlow: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      anomaly: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataMarket: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      tableRetrieve: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      user: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      authorization: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      userResource: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      }
    }],
    pro: [{
      monitoring: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      deviceSetting: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      certificationSetting: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      edgeSetting: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      profileMaker: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      opcuaModeler: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataPreprocessing: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      eda: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      machineLearning: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataFlow: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      anomaly: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      dataMarket: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      tableRetrieve: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      user: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      authorization: {
        auth: {
          create: true,
          read: true,
          update: true,
          delete: true
        }
      },
      userResource: {
        auth: {
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
    Authorization: {
      data: { ...stateInit.Authorization },
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
      informType: 'info',
      open: false,
      priceOpen: false
    },
    MenuAuth: {
      data: { ...stateInit.MenuAuth }
    },
    AuthorizationList: {
      count: 0,
      rows: [],
      loading: false,
      result: null
    }
  },
  getters: {
    // User
    UserData: state => state.User.data,
    // Authorization
    AuthorizationData: state => state.Authorization.data,
    AuthorizationLoading: state => state.Authorization.loading,
    AuthorizationResult: state => state.Authorization.result,
    AuthorizationInsertedId: state => state.Authorization.insertedId,
    AuthorizationUpdatedCount: state => state.Authorization.updatedCount,
    AuthorizationUpdatedCountPassword: state => state.Authorization.updatedCountPassword,
    AuthorizationDuplicated: state => state.Authorization.duplicated,
    AuthorizationLoginCount: state => state.Authorization.loginCount,
    AuthorizationInformType: state => state.Authorization.informType,
    AuthorizationOpen: state => state.Authorization.open,
    AuthorizationPriceOpen: state => state.Authorization.priceOpen,
    // Authorization list
    AuthorizationListCount: state => state.AuthorizationList.count,
    AuthorizationListRows: state => state.AuthorizationList.rows,
    AuthorizationListLoading: state => state.AuthorizationList.loading,
    AuthorizationListResult: state => state.AuthorizationList.result
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
        userid: data.userid
      }
    },
    // Authorization
    setAuthorizationData (state, data) {
      state.Authorization.data = data
    },
    setAuthorizationLoading (state, data) {
      state.Authorization.loading = data
    },
    setAuthorizationResult (state, data) {
      state.Authorization.result = data
    },
    setAuthorizationInsertedId (state, data) {
      state.Authorization.insertedId = data
    },
    setAuthorizationUpdatedCount (state, data) {
      state.Authorization.updatedCount = data
    },
    setAuthorizationUpdatedCountPassword (state, data) {
      state.Authorization.updatedCountPassword = data
    },
    setAuthorizationDuplicated (state, data) {
      state.Authorization.duplicated = data
    },
    setAuthorizationLoginCount (state, data) {
      state.Authorization.loginCount = data
    },
    setAuthorizationInformType (state, data) {
      state.Authorization.informType = data
    },
    setAuthorizationOpen (state, data) {
      state.Authorization.open = data
    },
    setAuthorizationPriceOpen (state, data) {
      state.Authorization.priceOpen = data
    },
    setAuthorizationInit (state) {
      state.Authorization.data = { ...stateInit.Authorization }
      state.Authorization.result = null
    },
    // Authorization list
    setAuthorizationListCount (state, data) {
      state.AuthorizationList.count = data
    },
    setAuthorizationListRows (state, data) {
      state.AuthorizationList.rows = data
    },
    setAuthorizationListLoading (state, data) {
      state.AuthorizationList.loading = data
    },
    setAuthorizationListResult (state, data) {
      state.AuthorizationList.result = data
    },
    setAuthorizationListInit (state) {
      state.AuthorizationList.count = 0
      state.AuthorizationList.rows = []
      state.AuthorizationList.result = null
    }
  },
  actions: {
    // 상세 정보 초기화 - 입력폼 상태
    actAuthorizationInit (context, payload) {
      context.commit('setAuthorizationInit')
      context.commit('setAuthorizationInformType', 'insert')

      if (payload === 'open') {
        context.commit('setAuthorizationOpen', true)
      } else if (payload === 'close') {
        context.commit('setAuthorizationOpen', false)
      }

      // routerMenu setting
    },
    // list
    actAuthorizationList (context, payload) {
      // 1. 사전 세팅
      context.commit('setAuthorizationListLoading', true)
      context.commit('setAuthorizationListInit')

      // 2. api호출
      const requestParams = { ...payload.params }
      api.get('/api/user/list', { params: requestParams }).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const count = response.data.data && response.data.data.count ? response.data.data.count : 0
        const rows = response.data.data && response.data.data.rows ? response.data.data.rows : []
        // 3. 결과값 세팅 - 정상
        context.commit('setAuthorizationListCount', count)
        context.commit('setAuthorizationListRows', rows)
        context.commit('setAuthorizationListResult', result)
        context.commit('setAuthorizationListLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setAuthorizationListResult', error)
        context.commit('setAuthorizationListLoading', false)
      })
    },
    // info
    actAuthorizationInfo (context, payload) {
      // 1. 사전 세팅
      context.commit('setAuthorizationLoading', true)
      context.commit('setAuthorizationInit')
      context.commit('setAuthorizationInformType', 'info')

      // 2. api호출
      //   api.get(`/api/user/${payload.id}`).then((response) => {
      //     const result = fncUtil.setApiResult(response.data)
      //     const data = response.data.data ? response.data.data : {}

      //     // 3. 결과값 세팅 - 정상
      //     context.commit('setAuthorizationData', data)
      //     context.commit('setAuthorizationResult', result)
      //     context.commit('setAuthorizationLoading', false)
      //   }).catch((error) => {
      //     // 3. 결과값 세팅 - 에러
      //     context.commit('setAuthorizationResult', error)
      //     context.commit('setAuthorizationLoading', false)
      //   })
      // TODO: 임시 처리 why? app3에서는 상세정보를 보여줄때 서버통신을 하지만 cps는 현재 리스트의 데이터를 그대로 상세정보로 표시
      context.commit('setAuthorizationData', payload.data)
      context.commit('setAuthorizationLoading', false)
    },
    // 상세 정보 open/close 세팅
    actAuthorizationOpen (context, payload) {
      if (payload === 'open') {
        context.commit('setAuthorizationOpen', true)
      } else if (payload === 'close') {
        context.commit('setAuthorizationOpen', false)
      }
    },
    actAuthorizationPriceOpen (context, payload) {
      if (payload === 'open') {
        context.commit('setAuthorizationPriceOpen', true)
      } else if (payload === 'close') {
        context.commit('setAuthorizationPriceOpen', false)
      }
    },
    // insert
    actAuthorizationInsert (context, payload) {
      // 1. 사전 세팅
      context.commit('setAuthorizationLoading', true)
      context.commit('setAuthorizationInsertedId', null)

      // 2. api 호출
      const requestBody = {
        ...payload.body,
        menuAuth: context.state.MenuAuth.data[payload.param.license]
      }
      api.post('/api/user', requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const insertedId = response.data.data && response.data.data.insertedId ? response.data.data.insertedId : null

        // 3. 결과값 세팅 - 정상
        context.commit('setAuthorizationInsertedId', insertedId)
        context.commit('setAuthorizationResult', result)
        context.commit('setAuthorizationLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        if (fncUtil.isDuplicatedData(error.code)) { // 중복 에러 체크
          context.commit('setAuthorizationDuplicated', {
            result: fncUtil.isDuplicatedData(error.code),
            name: fncUtil.isDuplicatedData(error.code) ? error.message : null
          })
        } else {
          context.commit('setAuthorizationInsertedId', -1)
        }
        context.commit('setAuthorizationResult', error)
        context.commit('setAuthorizationLoading', false)
      })
    },
    // update
    actAuthorizationMenuAuthUpdate (context, payload) {
      // 1. 사전 세팅 authorization Authorization
      context.commit('setAuthorizationLoading', true)
      context.commit('setAuthorizationUpdatedCount', null)

      // 2. api호출
      const requestBody = { ...payload.body }
      api.put('/api/user/menuAuth', requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.updatedCount
          ? response.data.data.updatedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setAuthorizationUpdatedCount', updatedCount)
        context.commit('setAuthorizationResult', result)
        context.commit('setAuthorizationLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setAuthorizationUpdatedCount', -1)
        context.commit('setAuthorizationResult', error)
        context.commit('setAuthorizationLoading', false)
      })
    },
    // password update
    actAuthorizationPasswordUpdate (context, payload) {
      // 1. 사전 세팅
      context.commit('setAuthorizationLoading', true)
      context.commit('setAuthorizationUpdatedCountPassword', null)
      // 2. api호출
      const requestBody = { ...payload.body }
      api.put(`/api/user/password/id/${payload.param.id}`, requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.updatedCount ? response.data.data.updatedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setAuthorizationUpdatedCountPassword', updatedCount)
        context.commit('setAuthorizationResult', result)
        context.commit('setAuthorizationLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setAuthorizationUpdatedCountPassword', -1)
        context.commit('setAuthorizationResult', error)
        context.commit('setAuthorizationLoading', false)
      })
    },
    // user delete
    actAuthorizationDelete (context, payload) {
      // 1. 사전 세팅
      context.commit('setAuthorizationLoading', true)
      context.commit('setAuthorizationUpdatedCount', null)
      // 2. api호출
      api.delete(`/api/user/${payload.param.id}`).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.deletedCount ? response.data.data.deletedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setAuthorizationUpdatedCount', updatedCount)
        context.commit('setAuthorizationResult', result)
        context.commit('setAuthorizationLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setAuthorizationUpdatedCount', -1)
        context.commit('setAuthorizationResult', error)
        context.commit('setAuthorizationLoading', false)
      })
    }
  }
}
