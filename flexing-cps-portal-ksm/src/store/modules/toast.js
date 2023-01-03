const getDefaultState = () => ({
  id: '',
  state: 0, /* 참:1 거짓:0 */
  menu: 'menu',
  visible: false,
  title: 'title',
  content: 'content',
  timeout: 5000,
  variant: 'success'
})
const state = getDefaultState()

const mutations = {
  async reset (state) {
    // await Object.assign(state, getDefaultState())
  },
  async updateState (state, payload) {
    await Object.assign(state, payload)
  },
  SET_TOAST (state, payload) {
    Object.assign(state, {
      ...payload,
      visible: true,
      id: payload.id,
      title: payload.title,
      content: payload.content,
      timeout: payload.timeout,
      variant: payload.variant
    })
  },
  SET_TOAST_RESET (state, payload) {
    Object.assign(state, {
      id: '',
      state: 0, /* 참:1 거짓:0 */
      menu: 'menu',
      visible: false,
      title: 'title',
      content: 'content',
      timeout: 5000,
      variant: 'success'
    })
  }
}

const actions = {
  async setToast ({ commit, dispatch }, data) {
    commit('SET_TOAST', data)
  },
  async setToastData ({ commit, dispatch }, data) {
    commit('SET_TOAST_DATA', data)
  },
  async setToastDataReset ({ commit, dispatch }, data) {
    commit('SET_TOAST_RESET', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
