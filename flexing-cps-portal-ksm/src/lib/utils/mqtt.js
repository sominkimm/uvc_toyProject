import mqtt from 'mqtt'
import store from '@/store'
import { i18n } from '@/lang/lang'

const connection = {
  endpoint: '',
  clean: true, // Reserved session
  connectTimeout: 5000, // Time out
  reconnectPeriod: 5000 // 5초마다 연결 , 자동 재연결 비활성화(0)
}

let client = null
let reTimeout = 1 /* 재연결 횟수 초기화 */
const reTimeoutMax = 5 /* 재연결 횟수 */

function createMqttConnection (topic) {
  const { endpoint, ...options } = connection
  // const connectUrl = `ws://220.90.129.98:VUE_APP_MQTT_PORT${endpoint}`
  const connectUrl = `${process.env.VUE_APP_MQTT_PROTOCOL}://${process.env.VUE_APP_MQTT_IP}:${process.env.VUE_APP_MQTT_PORT}${endpoint}`

  try {
    client = mqtt.connect(connectUrl, options)
  } catch (error) {
    /// console.error('mqtt.connect error', error)
    return false
  }

  client.on('connect', () => {
    doSubscribe(topic)
  })

  client.on('close', () => {
  })

  client.on('error', () => {
  })

  client.on('reconnect', function (res) {
    reTimeout = reTimeout + 1
    if (reTimeout >= reTimeoutMax) {
      store
        .dispatch('toast/setToast', {
          state: 1,
          menu: 'dashboard',
          visible: true,
          title: 'mqtt disconnect start',
          content: i18n.t('modal.mqttConnectFail'),
          timeout: 5000,
          variant: 'warning'
        }).then(r => destroyConnection())
    }
  })

  return client
}

function doSubscribe (topic) {
  client.subscribe(topic, {}, (error, res) => {
    if (error) {
      console.error('Subscribe to topics error', error)
    }
    // this.subscribeSuccess = true
  })
}

function destroyConnection () {
  if (client !== null) {
    client.end()
    reTimeout = 1 /* 재연결 횟수 초기화 */
  }
}

export default {
  createMqttConnection,
  doSubscribe,
  destroyConnection
}
