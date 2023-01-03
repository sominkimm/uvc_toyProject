import api from '@/lib/apiUtil'
import fncUtil from '@/lib/fncUtil'

// 현재 사용하는 정보에 대한 모든 것
const stateInit = {
  CurrLocation: {
    title: null,
    path: null,
    parents: [],
    pathName: null
  },
  CurrUser: {
    id: 0,
    userid: null,
    groupName: null,
    groupId: 0,
    name: '',
    email: null,
    active: false,
    role: 'subAccount',
    balance: 0,
    license: null,
    menuAuth: [],
    createdAt: null,
    updatedAt: null,
    deletedAt: null
  }
}

export default {
  namespaced: true,
  state: {
    CurrLocation: { // 현재 활동 페이지 정보
      ...stateInit.CurrLocation
    },
    CurrUser: { // 현재 사용자 정보
      ...stateInit.CurrUser
    },
    CurrUserUpdate: { // 현재 사용자 정보 업데이트
      loading: false,
      result: null,
      updatedCount: null
    },
    CurrMenuRoleList: [] // (현재 사용자의)메뉴권한 정보 (cps에서는 사용안함)
  },
  getters: {
    CurrLocation: state => state.CurrLocation,
    CurrUser: state => state.CurrUser,
    CurrUserUpdateLoading: state => state.CurrUserUpdate.loading,
    CurrUserUpdateResult: state => state.CurrUserUpdate.result,
    CurrUserUpdatedCount: state => state.CurrUserUpdate.updatedCount
  },
  mutations: {
    setCurrLocation (state, data) {
      state.CurrLocation = data
    },
    setCurrUser (state, data) {
      state.CurrUser = data
    },
    setCurrUserUpdateLoading (state, data) {
      state.CurrUserUpdate.loading = data
    },
    setCurrUserUpdateResult (state, data) {
      state.CurrUserUpdate.result = data
    },
    setCurrUserUpdateUpdatedCount (state, data) {
      state.CurrUserUpdate.updatedCount = data
    },
    setCurrUserPasswordUpdateLoading (state, data) {
      state.CurrUserPasswordUpdate.loading = data
    },
    setCurrentClearAll (state) {
      state.CurrLocation = { ...stateInit.CurrLocation }
      state.CurrUser = { ...stateInit.CurrUser }
    }
  },
  actions: {
    // 현재 위치 세팅
    actCurrentLocation (context, payload) {
      context.commit('setCurrLocation', payload)
    },
    // // 로그인 후 사용할 모든 정보 세팅
    // async actCurrentInfoAllSet (context) {
    //   try {
    //     // 1. 로그인 사용자 정보
    //     const UserData = await api.get('/htmsApi/users/me')
    //     const CurrUser = UserData.data.data ? UserData.data.data : null
    //     if (CurrUser.id >= 0) {
    //       context.commit('setCurrUser', CurrUser)
    //     }

    //     // 5. 메뉴권한 정보
    //     let roleGroupIds = ''
    //     for (let i = 0; i < CurrUser.RoleGroups.length; i += 1) {
    //       const RoleGroup = CurrUser.RoleGroups[i]
    //       let comma = ''
    //       if (roleGroupIds !== '') {
    //         comma = ','
    //       }
    //       roleGroupIds += `${comma}${RoleGroup.id}`
    //     }
    //   } catch (error) {
    //     context.commit('setCurrUser', stateInit.CurrUser)
    //   }
    // },
    // // current정보 전부 클리어
    // actCurrentClearAll (context) {
    //   context.commit('setCurrentClearAll')
    //   window.localStorage.removeItem('storage-company-id') // 선택된 사업장 정보 삭제
    // },
    // currentUser정보 업데이트
    actCurrInit  (context) {
      context.commit('setCurrentClearAll')
    },
    actCurrUpdate (context, payload) {
      api.get('/api/user/currInfo').then((response) => {
        // 결과값 세팅 - 정상
        const data = response.data.data ? response.data.data : {}

        context.commit('setCurrUser', {
          id: data.id,
          userid: data.userid,
          groupName: data.Groups.name,
          groupId: data.groupId,
          name: data.name,
          email: data.email,
          active: data.email,
          role: data.role,
          menuAuth: data.menuAuth,
          balance: data.balance,
          license: data.Groups.license,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          deletedAt: data.deletedAt
        })
      }).catch((error) => {
        // 결과값 세팅 - 에러
        console.error('error : ', error)
      })
    }
  }
}
