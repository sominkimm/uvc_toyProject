import api from '@/lib/apiUtil'
import fncUtil from '@/lib/fncUtil'

// 임시 토이 프로젝트
import mockup from '@/data/mockup/index'

const stateInit = {
  License: {
    id: null,
    price: null,
    volume: null,
    edgeNumber: 0,
    menuAuth: null,
    grantList: null,
    description: null
  }
}

export default {
  namespaced: true,
  state: {
    License: {
      data: { ...stateInit.License },
      loading: false,
      result: null,
      insertedId: null,
      updatedCount: null,
      deletedCount: null,
      informType: 'insert',
      open: false
    },
    LicenseList: {
      count: 0,
      rows: [],
      loading: false,
      result: null
    }
  },
  getters: {
    // Data
    LicenseData: state => state.License.data,
    LicenseLoading: state => state.License.loading,
    LicenseResult: state => state.License.result,
    LicenseInsertedId: state => state.License.insertedId,
    LicenseUpdatedCount: state => state.License.updatedCount,
    LicenseDeletedCount: state => state.License.deletedCount,
    LicenseInformType: state => state.License.informType,
    LicenseOpen: state => state.License.open,
    // Data list
    LicenseListCount: state => state.LicenseList.count,
    LicenseListRows: state => state.LicenseList.rows,
    LicenseListLoading: state => state.LicenseList.loading,
    LicenseListResult: state => state.LicenseList.result
  },
  mutations: {
    // reset
    setLicenseReset () {
    },
    // Data
    setLicenseLoading (state, data) {
      state.License.loading = data
    },
    setLicenseResult (state, data) {
      state.License.result = data
    },
    setLicenseInsertedId (state, data) {
      state.License.insertedId = data
    },
    setLicenseUpdatedCount (state, data) {
      state.License.updatedCount = data
    },
    setLicenseDeletedCount (state, data) {
      state.License.deletedCount = data
    },
    setLicenseInformType (state, data) {
      state.License.informType = data
    },
    setLicenseOpen (state, data) {
      state.License.open = data
    },
    // License list
    setLicenseListCount (state, data) {
      state.LicenseList.count = data
    },
    setLicenseListRows (state, data) {
      state.LicenseList.rows = data
    },
    setLicenseListLoading (state, data) {
      state.LicenseList.loading = data
    },
    setLicenseListResult (state, data) {
      state.LicenseList.result = data
    },
    setLicenseListInit (state) {
      state.LicenseList.count = 0
      state.LicenseList.rows = []
      state.LicenseList.result = null
    }
  },
  actions: {
    // total init
    actLicenseInit (context) {
      context.commit('setLicenseReset')
      context.commit('setLicenseInformType', 'insert')
    },
    actLicenseList (context) {
      if (fncUtil.isMockupData()) { // mockup 데이터일 경우
        context.commit('setLicenseListLoading', true)
        context.commit('setLicenseListCount', mockup.license?.length)
        context.commit('setLicenseListRows', mockup.license)
        context.commit('setLicenseListLoading', false)
      } else {
        // 사전 세팅
        context.commit('setLicenseListLoading', true)
        api.get('/api/licenseType/list').then(({ data }) => {
        // 결과값 세팅 - 정상
          const count = 0
          const rows = data.data && data.data.rows ? data.data.rows : []
          // count
          context.commit('setLicenseListCount', count)
          // list
          context.commit('setLicenseListRows', rows)
          // result
          // loading
          context.commit('setLicenseListLoading', false)
        }).catch((error) => {
        // 결과값 세팅 - 에러
          context.commit('setLicenseListResult', error)
          context.commit('setLicenseListLoading', false)
        })
      }
    },
    // isLoggedIn 제외 get api
    actJoinLicenseList (context) {
      // 사전 세팅
      context.commit('setLicenseListLoading', true)
      api.get('/api/licenseType/licenseTypeList').then(({ data }) => {
        // 결과값 세팅 - 정상
        const count = 0
        const rows = data.data && data.data.rows ? data.data.rows : []
        // count
        context.commit('setLicenseListCount', count)
        // list
        context.commit('setLicenseListRows', rows)
        // result
        // loading
        context.commit('setLicenseListLoading', false)
      }).catch((error) => {
        // 결과값 세팅 - 에러
        context.commit('setLicenseListResult', error)
        context.commit('setLicenseListLoading', false)
      })
    },
    // info
    actLicenseInfo (context, payload) {
      context.commit('setLicenseInformType', payload)
      // info 미처리
    },
    // update
    actLicenseUpdate (context, payload) {
      if (fncUtil.isMockupData()) { // mockup 데이터일 경우
        // 1. 사전 세팅
        context.commit('setLicenseLoading', true)
        context.commit('setLicenseUpdatedCount', null)
        // 2. 결과값 세팅 - 정상
        context.commit('setLicenseUpdatedCount', -1)
        context.commit('setLicenseResult', {
          status: 200,
          code: 'SUCCESS',
          message: 'Updated data successfully'
        })
        context.commit('setLicenseLoading', false)
      } else {
        // 1. 사전 세팅
        context.commit('setLicenseLoading', true)
        context.commit('setLicenseUpdatedCount', null)

        const requestBody = {
          ...payload.body
        }

        // 2. api호출
        api.put('/api/licenseType', requestBody).then((response) => {
          const result = fncUtil.setApiResult(response.data)
          const updatedCount = response.data.data && response.data.data.updatedCount ? response.data.data.updatedCount : null

          // 3. 결과값 세팅 - 정상
          context.commit('setLicenseUpdatedCount', updatedCount)
          context.commit('setLicenseResult', result)
          context.commit('setLicenseLoading', false)
        }).catch((error) => {
        // 3. 결과값 세팅 - 에러
          context.commit('setLicenseUpdatedCount', -1)
          context.commit('setLicenseResult', error)
          context.commit('setLicenseLoading', false)
        })
      }
    },
    // etc data update
    actLicenseOpenUpdate (context, payload) {
      context.commit('setLicenseOpen', payload)
    },
    actLicenseContainerOpenUpdate (context, payload) {
      context.commit('setLicenseContainerOpen', payload)
    }
  }
}
