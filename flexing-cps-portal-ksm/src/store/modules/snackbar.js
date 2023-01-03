// TODO: Snackbar's message should be queued.

const state = () => ({
  content: '',
  color: ''
})

const mutations = {
  showMessage (state, payload) {
    state.content = payload.content
    state.color = payload.color
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
