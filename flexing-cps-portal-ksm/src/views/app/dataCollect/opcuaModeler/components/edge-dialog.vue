<template>
  <b-modal
    size="lg"
    :visible="visible"
    centered
    title="Send to Edge"
    no-close-on-backdrop
    no-close-on-esc
    @hide="resetModal"
  >
    <b-form
      id="form"
      ref="form"
      @submit.stop.prevent="clickSaveButton"
    >
      <vue-good-table
        :columns="columns"
        :line-numbers="false"
        :search-options="{
          enabled: true,
          placeholder: 'Search this table'
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records'
        }"
        style-class="tableOne vgt-table"
        :rows="edgeSettingDataRows"
        :row-style-class="rowStyleClassFn"
        @on-row-click="selectionChanged"
      />
    </b-form>
    <template #modal-footer>
      <b-button @click="$emit('update:visible', false)">
        {{ $t('button.cancelBtn') }}
      </b-button>
      <!-- Todo: form Submit 밖으로 빼지 말고 Validation 걸기 -->
      <b-button
        variant="primary"
        type="submit"
        form="form"
      >
        {{ $t('button.registerBtn') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'

export default {
  name: 'EdgeDialog',
  mixins: [mixinUtil],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columns: [
        {
          label: this.$t('dataCollect.serialNum'),
          field: 'serialNum'
        },
        {
          label: this.$t('dataCollect.location'),
          field: 'location'
        },
        {
          label: this.$t('dataCollect.deviceList'),
          field: 'deviceList'
        },
        {
          label: this.$t('dataCollect.ModelerProjectName'),
          field: 'ModelerProject.name'
        }
      ],
      rows: [],
      selectItem: null,
      customClass: 'customClass'
    }
  },
  computed: {
    ...mapGetters('EdgeSetting', {
      edgeSettingListCount: 'EdgeSettingListCount',
      edgeSettingListRows: 'EdgeSettingListRows',
      edgeSettingLoading: 'EdgeSettingListLoading',
      edgeSettingListResult: 'EdgeSettingListResult'
    }),
    edgeSettingDataRows () {
      const rows = this.edgeSettingListRows
      rows.map(e => {
        e.deviceList = e.Devices.map(e2 => {
          return e2.name
        }).join(',')
      })
      return rows
    }
  },
  async created () {
    // await this.getEdgeData()
    await this.actEdgeSettingList()
    // await this.getEdgeData()
  },
  methods: {
    ...mapActions('EdgeSetting', ['actEdgeSettingList']),
    rowStyleClassFn (row) {
      return this.selectItem && row.id === this.selectItem.id ? this.customClass : ''
    },
    onRowClick (item) {
      this.selectItem = item.row
    },
    // async getEdgeData () {
    //   // this.actEdgeSettingList()
    //   const rows = this.edgeSettingDataRows
    //   rows.map(e => {
    //     e.deviceList = e.Devices.map(e2 => {
    //       return e2.name
    //     }).join(',')
    //   })
    //   this.rows = rows
    //   // await readEdges().then(response => {
    //   //   const rows = response.data.data.rows
    //   //   rows.map(e => {
    //   //     e.deviceList = e.Devices.map(e2 => {
    //   //       return e2.name
    //   //     }).join(',')
    //   //   })
    //   //   this.rows = response.data.data.rows
    //   // })
    // },
    async resetModal () {
      // await this.getEdgeData()
      await this.actEdgeSettingList()
      this.selectItem = null
      this.$emit('resetModal')
    },
    async clickSaveButton () {
      if (!this.selectItem) {
        this.$bvToast.toast(`${this.$t('dataCollect.modal.edgeDialogDistribute')}`, {
          title: 'error',
          variant: 'danger',
          solid: true
        })
        return
      }
      this.$emit('saveEdge', 'sendToEdge', this.selectItem)
    },
    selectionChanged (item) {
      this.selectItem = item.row
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .customClass {
  background: #a855f7 !important;
  td {
    color: white;
  }
}
</style>
