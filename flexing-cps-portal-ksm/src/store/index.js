import Vuex from 'vuex'
import Vue from 'vue'

import config from '@/store/modules/config'
import verticalSidebar from '@/store/modules/verticalSidebar'
import toast from '@/store/modules/toast'
import PagingInfo from '@/store/modules/customPagination'
import Current from '@/store/modules/current'

import Group from '@/store/modules/group'
import UserMng from '@/store/modules/userMng'
import BlobStore from '@/store/modules/blobStore'
import License from '@/store/modules/license'

import getters from '@/store/getters'

// Load Vuex
Vue.use(Vuex)
export const rootStore = new Vuex.Store({
  modules: {
    config,
    verticalSidebar,
    toast,
    Group,
    UserMng,
    PagingInfo,
    BlobStore,
    Current,
    License
  },
  getters
})

// Create store
export default rootStore
