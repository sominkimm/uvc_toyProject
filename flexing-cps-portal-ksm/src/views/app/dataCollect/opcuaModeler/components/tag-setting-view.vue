<template>
  <b-card style="height:79vh; overflow-y: auto">
    <b-row
      v-if="!projectId"
      class="text-center h-100"
    >
      <b-col class="text-center my-auto">
        <p class="text-30 subheading mb-1">
          {{ $t('dataCollect.description.noProjectData') }}
        </p>
        <p class="text-muted text-15">
          {{ $t('dataCollect.description.noProjectSelectedData') }}
        </p>
      </b-col>
    </b-row>
    <div v-else>
      <b-card-title class="d-flex justify-content-between align-items-center">
        Tag-Node Information [ {{ projectName }} ]
        <b-button
          variant="primary"
          @click="clickSaveButton"
        >
          save
        </b-button>
      </b-card-title>
      <vue-good-table
        :key="renderKey"
        :columns="tagColumns"
        :rows="nodes"
        style-class="tableOne vgt-table"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
          <span v-if="props.column.field === 'tag'">
            {{ props.row.tag ? props.row.tag[0].name : '' }}
            <a
              href="#"
              @click="editItem(props)"
            >
              <i class="i-Eraser-2 text-25 text-success mr-2" />
            </a>
            <a
              v-if="props.row.tag && props.row.tag[0].name"
              href="#"
              @click="removeTag(props)"
            >
              <i class="i-Close-Window text-25 text-danger" />
            </a>
          </span>
        </template>
      </vue-good-table>
    </div>
    <tag-setting-dialog
      :dialog.sync="dialog"
      :profiles.sync="profiles"
    />
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import mixinUtil from '@/lib/utils/mixinUtil'
import EventBus from '@/lib/utils/event-bus'

import TagSettingDialog from '@/views/app/dataCollect/opcuaModeler/components/tag-setting-dialog'

// import { readProfiles } from '@/lib/api/profile'

export default {
  components: {
    TagSettingDialog
  },
  mixins: [mixinUtil],
  data () {
    return {
      renderKey: 0,
      dialog: false,
      projectId: null,
      projectName: null,
      nodes: [],
      connections: [],
      tagColumns: [
        {
          label: this.$t('common.id'),
          field: 'id'
        },
        {
          label: this.$t('common.name'),
          field: 'name'
        },
        {
          label: this.$t('common.type'),
          field: 'type'
        },
        {
          label: this.$t('common.tag'),
          field: 'tag'
        }
      ],
      editedItem: {
        id: '',
        name: '',
        type: '',
        tag: ''
      },
      profiles: []
    }
  },
  computed: {
    ...mapGetters('OpcuaModeler', {
      infoResult: 'OpcuaModelerResult',
      insertedId: 'OpcuaModelerInsertedId',
      updatedCount: 'OpcuaModelerUpdatedCount',
      deletedCount: 'OpcuaModelerDeletedCount'
    }),
    ...mapGetters('ProfileMaker', {
      profileListCount: 'ProfileMakerListCount',
      profileListRows: 'ProfileMakerListRows',
      profileLoading: 'ProfileMakerListLoading',
      profileListResult: 'ProfileMakerListResult'
    }),
    profileDataRows () {
      return this.profileListRows
    }
  },
  watch: {
    updatedCount (value) { // 업데이트 후 처리
      if (value !== null) {
        if (value < 0) { // 업데이트 실패
          this.makeToastError(this.infoResult) // 실패 시 메세지
        } else if (value === 0) { // 업데이트 된 항목 없음
          this.makeToastSuccess(this.infoResult, this.$t('Common.Message.Nodata.noupdate'))
        } else if (value > 0) { // 업데이트 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지
        }
      }
    }
  },
  created () {
    this.actProfileMakerList()
  },
  async mounted () {
    EventBus.$on('clickProject', this.clickProject)
    EventBus.$on('selectedTag', this.selectedTag)
    await this.actProfileMakerList()
    await this.getProfileData()
  },
  beforeDestroy () {
    EventBus.$off('clickProject', this.clickProject)
    EventBus.$off('selectedTag', this.selectedTag)
  },
  methods: {
    ...mapActions('OpcuaModeler', ['actOpcuaModelerUpdate']),
    ...mapActions('ProfileMaker', ['actProfileMakerList']),
    async getProfileData () {
      let deviceData = []
      // await readProfiles().then(response => {
      //   deviceData = response.data.data.rows
      // })
      deviceData = this.profileDataRows
      for (const device of deviceData) {
        device.icon = 'fa fa-window-maximize'
        device.children = JSON.parse(JSON.stringify(device.requests))
        device.disabled = true
        switch (device.protocol) {
        case 'custom':
          for (const request of device.children) {
            request.children = JSON.parse(JSON.stringify(request.tags))
            request.icon = 'fa fa-paper-plane'
            request.disabled = true
            const packetLengthList = []
            for (let i = 0; i < request.packetLength; i++) {
              packetLengthList.push(i)
            }
            for (const tag of request.children) {
              tag.icon = 'fa fa-tag'
              tag.disabled = false
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
            request.disabled = false
          }
          break
        }
      }
      this.profiles = deviceData
    },
    async clickSaveButton () {
      const params = {
        id: this.projectId,
        nodes: this.nodes,
        connections: this.connections
      }
      await this.actOpcuaModelerUpdate(params)
      // await updateModelerProject(params).then(response => {
      //   if (response.data.data) {
      //     this.$bvToast.toast(`${this.$t('modal.saveMes')}`, {
      //       title: 'success.',
      //       variant: 'success',
      //       solid: true
      //     })
      //   } else {
      //     this.$bvToast.toast(`${this.$t('modal.deleteDataError')}`, {
      //       title: 'error',
      //       variant: 'danger',
      //       solid: true
      //     })
      //   }
      // })
      this.$emit('refreshProjectList')
    },
    removeTag (item) {
      this.nodes.find(e => e.id === item.row.id).tag = [{ name: '' }]
      this.renderKey++
    },
    selectedTag (data, item) {
      if (data) {
        this.nodes.find(e => e.id === item.row.id).tag = [
          {
            name: data.name,
            tagId: data.tagId
          }
        ]
      } else this.nodes[item.index].tag = null
      this.renderKey++
    },
    editItem (item) {
      this.dialog = true
      EventBus.$emit('editedItem', item)
    },
    clickProject (e) {
      if (!e) {
        return false
      }
      const data = JSON.parse(JSON.stringify(e))
      this.nodes = data.nodes || []
      this.connections = data.connections || []
      this.projectId = e.id
      this.projectName = e.name
    }
  }
}
</script>
