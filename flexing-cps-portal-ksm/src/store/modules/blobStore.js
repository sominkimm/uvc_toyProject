import api from '@/lib/apiUtil'
import fncUtil from '@/lib/fncUtil'

const stateInit = {
  BlobStore: {
    containerName: null,
    blobAccountName: null
  }
}

export default {
  namespaced: true,
  state: {
    BlobStore: {
      data: { ...stateInit.BlobStore },
      loading: false,
      result: null,
      insertedId: null,
      updatedCount: null,
      deletedCount: null,
      informType: 'info',
      open: false
    }
  },
  getters: {
    // BlobStore
    BlobStoreData: state => state.BlobStore.data,
    BlobStoreLoading: state => state.BlobStore.loading,
    BlobStoreResult: state => state.BlobStore.result,
    BlobStoreInsertedId: state => state.BlobStore.insertedId,
    BlobStoreUpdatedCount: state => state.BlobStore.updatedCount,
    BlobStoreUpdatedCountPassword: state => state.BlobStore.updatedCountPassword,
    BlobStoreInformType: state => state.BlobStore.informType,
    BlobStoreOpen: state => state.BlobStore.open
  },
  mutations: {
    // BlobStore
    setBlobStoreData (state, data) {
      state.BlobStore.data = data
    },
    setBlobStoreLoading (state, data) {
      state.BlobStore.loading = data
    },
    setBlobStoreResult (state, data) {
      state.BlobStore.result = data
    },
    setBlobStoreInsertedId (state, data) {
      state.BlobStore.insertedId = data
    },
    setBlobStoreUpdatedCount (state, data) {
      state.BlobStore.updatedCount = data
    },
    setBlobStoreUpdatedCountPassword (state, data) {
      state.BlobStore.updatedCountPassword = data
    },
    setBlobStoreInformType (state, data) {
      state.BlobStore.informType = data
    },
    setBlobStoreOpen (state, data) {
      state.BlobStore.open = data
    },
    setBlobStoreInit (state) {
      state.BlobStore.data = { ...stateInit.BlobStore }
      state.BlobStore.result = null
    }
  },
  actions: {
    // File get
    // info
    actBlobStoreInfo (context, payload) {
      // 1. 사전 세팅
      context.commit('setBlobStoreLoading', true)
      context.commit('setBlobStoreInit')

      // 2. api호출
      api.get('/api/blobStore', {
        params: {
          payload
        }
      }).then((response) => {
        const result = fncUtil.setApiResult(response.data)
        const data = response.data.data ? response.data.data : {}
        // 3. 결과값 세팅 - 정상
        context.commit('setBlobStoreData', data)
        context.commit('setBlobStoreResult', result)
        context.commit('setBlobStoreLoading', false)
      }).catch((error) => {
        // 3. 결과값 세팅 - 에러
        context.commit('setBlobStoreResult', error)
        context.commit('setBlobStoreLoading', false)
      })
    }
  }
}


