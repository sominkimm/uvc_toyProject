<template>
  <b-container
    class="main-content"
    :fluid="true"
  >
    <div class="u-profile-maker">
      <profile-list
        ref="tree"
        :profile-list="profileList"
        @clickDevice="clickDevice"
        @addDevice="saveProtocol"
      />
      <profile-edit
        :selected-device="selectedDevice"
        @saveProtocol="saveProtocol"
        @removeProtocol="removeProtocol"
      />
    </div>

    <!--
    <b-row class="mt-4">
      <b-col
        md="3"
        lg="3"
        sm="12"
        class="mb-30"
      >
        <profile-list
          ref="tree"
          :profile-list="profileList"
          @clickDevice="clickDevice"
          @addDevice="saveProtocol"
        />
      </b-col>
      <b-col
        md="9"
        lg="9"
        sm="12"
        class="mb-30"
      >
        <profile-edit
          :selected-device="selectedDevice"
          @saveProtocol="saveProtocol"
          @removeProtocol="removeProtocol"
        />
      </b-col>
    </b-row>
    -->
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'

import profileList from '@/views/app/dataCollect/profileMaker/components/profile-list'
import profileEdit from '@/views/app/dataCollect/profileMaker/components/profile-edit'

export default {
  components: {
    profileList,
    profileEdit
  },
  mixins: [mixinUtil],
  // icon은 font-awesome4를 사용
  data () {
    return {
      selectedDevice: null,
      profileList: []
    }
  },
  computed: {
    ...mapGetters('ProfileMaker', {
      insertedId: 'ProfileMakerInsertedId',
      isDuplicated: 'ProfileMakerIsDuplicated',
      infoResult: 'ProfileMakerResult'
    }),
    ...mapGetters('ProfileMaker', {
      listCount: 'ProfileMakerListCount',
      listRows: 'ProfileMakerListRows',
      loading: 'ProfileMakerListLoading',
      listResult: 'ProfileMakerListResult',
      infoOpen: 'ProfileMakerOpen'
    })
  },
  watch: {
    loading (value) {
      if (value === false) {
        this.profileList = this.formatterRows(this.listRows)
        this.$refs.tree.initializeData(this.profileList)
      }
    },
    insertedId (value) { // 등록 후 처리
      // if (value !== null) {
      //   this.open()
      //   this.actProfileMakerList()
      // }
      if (value !== null) {
        if (value < 0) { // 등록 실패
          if (!this.isDuplicated) { // 중복시 toast 발생 안하고 input창 텍스트로 반응
            this.makeToastError(this.infoResult) // 실패 시 메세지
          }
        } else if (value > 0) { // 등록 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지
          this.$bvModal.hide('modal-profileMaker-addProfile')
          // store.commit('SET_BTN_PROCESS_RESET')
          // this.actProfileMakerInit() //store에서 미사용 표시
          this.actProfileMakerList()
        }
      }
    }
  },
  created () {
    if (this.checkMenuAuth('authMenu') !== true) {
      this.$router.push({ name: 'notPermission' })
    } else {
      this.paramsInit()
      // 기본 검색 자동 처리
      this.formSubmit()
    }
  },
  methods: {
    ...mapActions('ProfileMaker', ['actProfileMakerList', 'actProfileMakerTagListUpdateTypeChange']),
    ...mapActions('ProfileMaker', ['actProfileMakerIsDuplicated']),
    ...mapActions('ProfileMaker', ['actProfileMakerList',
      'actProfileMakerTagListUpdateTypeChange',
      'actProfileMakerSelected']),
    paramsInit () {
      this.actProfileMakerSelected(null)
    },
    formSubmit () {
      this.actProfileMakerList()
    },
    formatterRows (rows) {
      for (const device of rows) {
        device.icon = 'fa fa-flag'
        device.children = JSON.parse(JSON.stringify(device.requests))

        // device.opened = true
        for (const request of device.children) {
          request.disabled = true
        }

        switch (device.protocol) {
        case 'custom':
          for (const request of device.children) {
            request.children = JSON.parse(JSON.stringify(request.tags))
            request.icon = 'fa fa-paper-plane'

            const packetLengthList = []
            for (let i = 0; i < request.packetLength; i++) {
              packetLengthList.push(i)
            }

            for (const tag of request.children) {
              tag.icon = 'fa fa-tag'
              tag.disabled = true
              for (let i = tag.start; i <= tag.end; i++) {
                const findIndex = packetLengthList.findIndex(e => e === i)
                packetLengthList.splice(findIndex, 1)
              }
            }
            request.packetLengthList = packetLengthList
          }
          break
        case 'ls':
          for (const request of device.children) {
            request.children = JSON.parse(JSON.stringify(request))
            request.icon = 'fa fa-tag'
          }
          break
        }
      }
      return rows
    },
    clickDevice (node, item) {
      this.selectedDevice = JSON.parse(JSON.stringify(item))
      this.actProfileMakerTagListUpdateTypeChange(true)
      this.actProfileMakerSelected(item.id)
    },
    async saveProtocol () {
      await this.formSubmit()
    },
    async removeProtocol () {
      this.selectedDevice = null
      await this.formSubmit()
    }
  }
}
</script>
