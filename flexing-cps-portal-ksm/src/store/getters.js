const getters = {
  role: state => state.user.role,
  routes: state => state.permission.routes,
  toast: state => state.toast,
  toastVisible: state => state.toast.visible,
  alarmSetting: state => state.alarmSetting,
  alarmHistory: state => state.alarmHistory,
  nodeMonitoring: state => state.nodeMonitoring,
  deviceRetrieve: state => state.deviceRetrieve,
  dateRetrieve: state => state.dateRetrieve,
  dataPreprocessing: state => state.dataPreprocessing,
  dataFlow: state => state.dataFlow,
  dataMarket: state => state.dataMarket,
  dataCollectHistories: state => state.dataCollectHistories,
  eda: state => state.eda,
  tableRetrieve: state => state.tableRetrieve,
  anomaly: state => state.anomaly,
  user: state => state.user
  // devices: state => state.device.listeners
}
export default getters
