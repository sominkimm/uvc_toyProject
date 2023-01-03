<template>
  <b-modal
    v-model="dialog"
    centered
    :title="$t('dataCollect.tagSetting')"
    no-close-on-backdrop
    no-close-on-esc
  >
    <div v-show="profiles">
      <v-jstree
        ref="tree"
        :data="profiles"
        allow-batch
        text-field-name="name"
        @item-click="clickTag"
      />
    </div>

    <template #modal-footer>
      <b-button @click="$emit('update:dialog', false)">
        {{ $t('button.cancelBtn') }}
      </b-button>
      <b-button
        variant="primary"
        @click="save"
      >
        {{ $t('button.registerBtn') }}
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import mixinUtil from '@/lib/utils/mixinUtil'
import EventBus from '@/lib/utils/event-bus'

import VJstree from 'vue-jstree'

export default {
  components: {
    VJstree
  },
  mixins: [mixinUtil],
  props: {
    dialog: {
      type: Boolean,
      require: true,
      default: false
    },
    tag: {
      type: String,
      default: null
    },
    profiles: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tagColumns: [
        {
          label: this.$t('common.id'),
          field: 'id'
        },
        {
          label: this.$t('common.name'),
          field: 'name'
        }
      ],
      tags: [
        { id: '1', name: this.$t('dataCollect.tag1') },
        { id: '2', name: this.$t('dataCollect.tag2') },
        { id: '3', name: this.$t('dataCollect.tag3') },
        { id: '4', name: this.$t('dataCollect.tag4') },
        { id: '5', name: this.$t('dataCollect.tag5') },
        { id: '6', name: this.$t('dataCollect.tag6') },
        { id: '7', name: this.$t('dataCollect.tag7') },
        { id: '8', name: this.$t('dataCollect.tag8') },
        { id: '9', name: this.$t('dataCollect.tag9') },
        { id: '10', name: this.$t('dataCollect.tag10') },
        { id: '11', name: this.$t('dataCollect.tag11') },
        { id: '12', name: this.$t('dataCollect.tag12') },
        { id: '13', name: this.$t('dataCollect.tag13') },
        { id: '14', name: this.$t('dataCollect.tag14') },
        { id: '15', name: this.$t('dataCollect.tag15') },
        { id: '16', name: this.$t('dataCollect.tag16') },
        { id: '17', name: this.$t('dataCollect.tag17') }
      ],
      editItem: null,
      selectItem: null,
      customClass: 'customClass'
    }
  },
  mounted () {
    EventBus.$on('editedItem', this.editing)
  },
  beforeDestroy () {
    EventBus.$off('editedItem', this.editing)
  },
  methods: {
    clickTag (node, item) {
      this.selectItem = item
    },
    rowStyleClassFn (row) {
      return this.selectItem && row.id === this.selectItem.id
        ? this.customClass
        : ''
    },
    onRowClick (item) {
      this.selectItem = item.row
    },
    editing (item) {
      this.editItem = item
      this.selectItem = null
      if (item.row.tag) {
        this.selectItem = this.tags.filter(x => x.id === item.row.tag[0].id)[0]
      }
    },
    save () {
      this.$emit('update:dialog', false)
      EventBus.$emit('selectedTag', this.selectItem, this.editItem)
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
