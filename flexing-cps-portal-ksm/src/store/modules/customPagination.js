const stateInit = {
  PagingInfo: {
    limit: 20,
    offset: 0,
    order: null,
    total: 0,
    currentPage: 1
  }
}

export default {
  namespaced: true,
  state: {
    PagingInfo: {
      data: { ...stateInit.PagingInfo }
    }
  },
  getters: {
    // Data
    PagingInfo: state => state.PagingInfo.data
  },
  mutations: {
    // reset
    setPagingInfoReset (state) {
      state.PagingInfo.data = {
        limit: 10,
        offset: 0,
        order: null,
        currentPage: 1
      }
    },
    setPagingInfo (state, data) {
      state.PagingInfo.data = {
        ...state.PagingInfo.data,
        order: data.order,
        offset: data.offset,
        limit: data.limit,
        currentPage: data.currentPage
      }
    },
    setPagingInfoTotal (state, data) {
      state.PagingInfo.data.total = data
    }
  },
  actions: {
    actPagingInfoInit (context) {
      context.commit('setPagingInfoReset')
    },
    actPagingInfo (context, payload) {
      context.commit('setPagingInfo', payload)
    },
    actPagingInfoTotal (context, payload) {
      context.commit('setPagingInfoTotal', payload)
    }
  }
}
