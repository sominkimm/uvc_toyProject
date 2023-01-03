
import store from '@/store'

/** device selected after tag ---------------------------------------------------- **/
export function commonSelectedDevice (schDevice) {
  let reData = null
  if (schDevice !== 'all') {
    const profileId = store.getters.devices.find(e => e.id === schDevice).profileId

    const profileFilterId = store.getters.tags.filter(function (profile) {
      return profile.id === profileId
    })

    const profileFilterRequest = []
    for (let i = 0, l = profileFilterId[0].requests.length; i < l; i++) {
      profileFilterRequest.push({
        tags: profileFilterId[0].requests[i]
      })
    }

    reData = profileFilterRequest
  }
  return reData
}

export function analysisTable (data, menu) {
  let tempColumnObject = Object()
  const reArrayColumn = []
  if (menu === 'tableRetrieve') {
    reArrayColumn.push({ label: 'time', type: 'string', field: 'time' })
  }
  const selectedTagList = data
  for (const columnKey in selectedTagList) {
    tempColumnObject = Object()
    tempColumnObject.label = selectedTagList[columnKey]
    tempColumnObject.type = 'string'
    tempColumnObject.field = selectedTagList[columnKey]
    reArrayColumn.push(tempColumnObject)
  }

  return reArrayColumn
}
