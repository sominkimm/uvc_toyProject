import api from '@/lib/apiUtil'
import fncUtil from '@/lib/fncUtil'
// import client from '@/lib/api/client'

const stateInit = {
  Group: {
    id: 0,
    name: null,
    license: null,
    location: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null
  }
}

export default {
  namespaced: true,
  state: {
    Group: {
      data: { ...stateInit.Group },
      loading: false,
      result: null,
      insertedId: null,
      updatedCount: null,
      updatedCountPassword: null,
      informType: 'info',
      open: false
    },
    GroupList: {
      count: 0,
      rows: [],
      loading: false,
      result: null
    }
  },
  getters: {
    // Group
    GroupData: state => state.Group.data,
    GroupLoading: state => state.Group.loading,
    GroupResult: state => state.Group.result,
    GroupInsertedId: state => state.Group.insertedId,
    GroupUpdatedCount: state => state.Group.updatedCount,
    GroupUpdatedCountPassword: state => state.Group.updatedCountPassword,
    GroupInformType: state => state.Group.informType,
    GroupOpen: state => state.Group.open,
    // Group list
    GroupListCount: state => state.GroupList.count,
    GroupListRows: state => state.GroupList.rows,
    GroupListLoading: state => state.GroupList.loading,
    GroupListResult: state => state.GroupList.result
  },
  mutations: {
    // Group
    setGroupData (state, data) {
      state.Group.data = data
    },
    setGroupLoading (state, data) {
      state.Group.loading = data
    },
    setGroupResult (state, data) {
      state.Group.result = data
    },
    setGroupInsertedId (state, data) {
      state.Group.insertedId = data
    },
    setGroupUpdatedCount (state, data) {
      state.Group.updatedCount = data
    },
    setGroupUpdatedCountPassword (state, data) {
      state.Group.updatedCountPassword = data
    },
    setGroupInformType (state, data) {
      state.Group.informType = data
    },
    setGroupOpen (state, data) {
      state.Group.open = data
    },
    setGroupInit (state) {
      state.Group.data = { ...stateInit.Group }
      state.Group.result = null
    },
    // Group list
    setGroupListCount (state, data) {
      state.GroupList.count = data
    },
    setGroupListRows (state, data) {
      state.GroupList.rows = data
    },
    setGroupListLoading (state, data) {
      state.GroupList.loading = data
    },
    setGroupListResult (state, data) {
      state.GroupList.result = data
    },
    setGroupListInit (state) {
      state.GroupList.count = 0
      state.GroupList.rows = []
      state.GroupList.result = null
    }
  },
  actions: {
    // all list
    actGroupAllList (context, payload) {
      // 1. 사전 세팅
      context.commit('setGroupListLoading', true)
      context.commit('setGroupListInit')

      // 2. api호출
      const requestParams = { ...payload.params }

      api.get('/api/group/list', { params: requestParams }).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const count = response.data.data && response.data.data.count ? response.data.data.count : 0
        const rows = response.data.data && response.data.data.rows ? response.data.data.rows : []
        const reRows = rows
        const reCount = count

        context.commit('setGroupListCount', reCount)
        context.commit('setGroupListRows', reRows)
        context.commit('setGroupListResult', result)
        context.commit('setGroupListLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setGroupListResult', error)
        context.commit('setGroupListLoading', false)
      })
    },
    // list (그룹 ID filter별 그룹 리스트)
    actGroupList (context, payload) {
      // 1. 사전 세팅
      context.commit('setGroupListLoading', true)
      context.commit('setGroupListInit')

      // 2. api호출
      const requestParams = { ...payload.params }

      api.get('/api/group/list', { params: requestParams }).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const count = response.data.data && response.data.data.count ? response.data.data.count : 0
        const rows = response.data.data && response.data.data.rows ? response.data.data.rows : []
        let reRows = rows
        let reCount = count

        // 3. 결과값 세팅 - 정상
        if (payload.body.role !== 'provider') {
          // admin 권한 사용자는 해당하는 그룹만 확인
          reRows = rows.filter(x => x.id === payload.body.groupId)
          reCount = reRows.length
        }
        context.commit('setGroupListCount', reCount)
        context.commit('setGroupListRows', reRows)
        context.commit('setGroupListResult', result)
        context.commit('setGroupListLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setGroupListResult', error)
        context.commit('setGroupListLoading', false)
      })
    },
    // info
    actGroupInfo (context, payload) {
      // 1. 사전 세팅
      context.commit('setGroupLoading', true)
      context.commit('setGroupInit')
      context.commit('setGroupInformType', 'info')

      // 2. api호출
      api.get(`/api/group/${payload.id}`).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const data = response.data.data ? response.data.data : {}

        // 3. 결과값 세팅 - 정상
        context.commit('setGroupData', data)
        context.commit('setGroupResult', result)
        context.commit('setGroupLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setGroupResult', error)
        context.commit('setGroupLoading', false)
      })
    },
    // 상세 정보 초기화 - 입력폼 상태
    actGroupInit (context, payload) {
      context.commit('setGroupInit')
      context.commit('setGroupInformType', 'insert')

      if (payload === 'open') {
        context.commit('setGroupOpen', true)
      } else if (payload === 'close') {
        context.commit('setGroupOpen', false)
      }
    },
    // 상세 정보 open/close 세팅
    actGroupOpen (context, payload) {
      if (payload === 'open') {
        context.commit('setGroupOpen', true)
      } else if (payload === 'close') {
        context.commit('setGroupOpen', false)
      }
    },
    // insert
    actGroupInsert (context, payload) {
      // 1. 사전 세팅
      context.commit('setGroupLoading', true)
      context.commit('setGroupInsertedId', null)

      // 2. api 호출
      const companyId = context.rootGetters['current/SelectedCompany'].id
      const requestBody = { ...payload.body, companyId: companyId }
      api.post('/api/groups', requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const insertedId = response.data.data && response.data.data.insertedId ? response.data.data.insertedId : null

        // 3. 결과값 세팅 - 정상
        context.commit('setGroupInsertedId', insertedId)
        context.commit('setGroupResult', result)
        context.commit('setGroupLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setGroupInsertedId', -1)
        context.commit('setGroupResult', error)
        context.commit('setGroupLoading', false)
      })
    },
    // update
    actGroupUpdate (context, payload) {
      // 1. 사전 세팅
      context.commit('setGroupLoading', true)
      context.commit('setGroupUpdatedCount', null)

      // 2. api호출
      const requestBody = { ...payload.body }
      api.put(`/api/groups/id/${payload.param.id}`, requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.updatedCount ? response.data.data.updatedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setGroupUpdatedCount', updatedCount)
        context.commit('setGroupResult', result)
        context.commit('setGroupLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setGroupUpdatedCount', -1)
        context.commit('setGroupResult', error)
        context.commit('setGroupLoading', false)
      })
    },
    // password update
    actGroupPasswordUpdate (context, payload) {
      // 1. 사전 세팅
      context.commit('setGroupLoading', true)
      context.commit('setGroupUpdatedCountPassword', null)
      // 2. api호출
      const requestBody = { ...payload.body }
      api.put(`/api/groups/password/id/${payload.param.id}`, requestBody).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const updatedCount = response.data.data && response.data.data.updatedCount ? response.data.data.updatedCount : null

        // 3. 결과값 세팅 - 정상
        context.commit('setGroupUpdatedCountPassword', updatedCount)
        context.commit('setGroupResult', result)
        context.commit('setGroupLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setGroupUpdatedCountPassword', -1)
        context.commit('setGroupResult', error)
        context.commit('setGroupLoading', false)
      })
    }
  }
}
