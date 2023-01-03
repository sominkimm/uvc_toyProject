import axios from 'axios'
// import { uuid } from 'vue-uuid'
const {
  VUE_APP_LOCAL_IP,
  VUE_APP_SET_CPS_SERVER_PORT,
  VUE_APP_SET_CPS_WEB_PROTOCOL
} = process.env

const api = axios.create()
api.defaults.baseURL = `${VUE_APP_SET_CPS_WEB_PROTOCOL}://${VUE_APP_LOCAL_IP}:${VUE_APP_SET_CPS_SERVER_PORT}`

// 캐싱 방지
api.defaults.headers.get['Cache-Control'] = 'no-cache'
api.defaults.headers.get.Pragma = 'no-cache'
api.interceptors.request.use(
  async request => {
    // header.trace-id 전송
    // const traceId = uuid.v4()
    // request.headers['trace-id'] = traceId

    // header.access-token 전송
    const accessToken = window.localStorage.getItem('access-token')
    request.headers['access-token'] = accessToken

    return request
  },
  async error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  async response => {
    // header.access-token 교체
    // const accessToken = response.headers['access-token']
    // if (accessToken) {
    //   window.localStorage.setItem('access-token', accessToken)
    // }
    let accessToken
    if (response.data.data && response.data.data.accessToken) {
      accessToken = response.data.data.accessToken
    }
    if (accessToken) {
      window.localStorage.setItem('access-token', accessToken)
    }

    return response
  },
  async error => {
    const errorStatus = error.response.status
    const errorCode = error.response.data.code || 'REQUEST_FAIL' // data.code값이 없으면 서버 호출이 실패한 것으로 간주함
    const errorMessage = error.response.data.code ? error.response.data.message : 'Could not proxy request' // data.code값이 없으면 서버 호출이 실패한 것으로 간주함

    // 401 에러인 경우 처리(토큰 만료) - 강제 로그아웃 처리
    if (errorStatus === 401) {
      window.location.reload() // reload해주면 알아서 튕긴다
    }

    const errorData = {
      status: errorStatus,
      code: errorCode,
      message: errorMessage
    }

    return Promise.reject(errorData)
  }
)

export default api
