<template>
  <b-card
    :style="!selectedViewList[0] ? 'height:79vh;' : 'height:59vh; margin-top:2vh;'"
    style="overflow-y: auto; overflow-x: scroll;"
  >
    <b-card-title class="d-flex justify-content-between align-items-center">
      Projects
    </b-card-title>
    <v-jstree
      ref="tree"
      :data="treeArray"
      allow-batch
      text-field-name="name"
      @item-click="onUpdate"
    >
   
      <template slot-scope="selectedItems">
        <div
          :id="selectedItems.model.id"
          :draggable="selectedItems.model.UserId ? true : false"
          @dragstart="startDrag($event, selectedItems.model)"
        >
          <i
            v-if="!selectedItems.model.loading"
            :class="selectedItems.vm.themeIconClasses"
            role="presentation"
          />
          {{ selectedItems.model.name }}
          <!-- <b-badge
            v-if="selectedItems.model.UserId"
            :variant="button.variant.delete"
            @click.prevent.stop="removeProject(selectedItems.model)"
          >
            delete
          </b-badge> -->

          <span
            v-if="selectedItems.model.UserId"
            v-b-tooltip.hover="{
              placement: 'auto',
              title: checkMenuAuth('authDelete') !== true
                ? $t('Common.Message.NoAuth.delete') : $t('button.delBtn')
            }"
            class="ul-btn__icon"
            @click.prevent.stop="checkMenuAuth('authDelete') !== true
              ? '' : removeProject(selectedItems.model)"
          >
            <mdicon
              name="delete"
              class="mdicon-icon-delete"
              :size="17"
            />
          </span>
          <!-- <span
            v-if="selectedItems.model.UserId"
            v-b-tooltip.hover="{
              placement: 'auto',
              title: checkMenuAuth('authDelete') !== true
                ? $t('Common.Message.NoAuth.delete') : $t('button.delBtn')
            }"
          >
            <b-button
              dev-comment="삭제"
              :variant="button.variant.delete"
              class="btn p-1 mr-1"
              size="sm"
              :disabled="checkMenuAuth('authDelete') !== true"
              @click.prevent.stop="removeProject(selectedItems.model)"
            >
              <mdicon
                name="delete"
                :size="17"
              />
            </b-button>
          </span> -->
        </div>
      </template>
    </v-jstree>
  </b-card>
</template>

<script>
import mixinUtil from '@/lib/utils/mixinUtil'

import EventBus from '@/lib/utils/event-bus'
import VJstree from 'vue-jstree'

export default {
  name: 'ProjectView',
  components: {
    VJstree
  },
  mixins: [mixinUtil],
  props: {
    selectedViewList: {
      type: Array,
      default: null
    },
    treeArray: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    initiallyOpen: [],
    files: {
      Variable: 'mdi-tag',
      Method: 'mdi-function'
    }
  }),
  mounted () {
    if (this.treeArray.length > 0) this.initiallyOpen.push(this.treeArray[0].id)
  },
  methods: {
    onUpdate (node, item) {
      if (!item) {
        return
      }
      EventBus.$emit('clickProject', item)
    },
    findItem (id, items = null) {
      if (!items) {
        items = this.treeArray
      }
      return items.reduce((acc, item) => {
        if (acc) {
          return acc
        }
        if (item.id === id) {
          return item
        }
        if (item.children) {
          return this.findItem(id, item.children)
        }
        return acc
      }, null)
    },
    removeProject (item) {
      const h = this.$createElement
      const titleVNode = h('div', {
        domProps: {
          innerHTML: this.$t('modal.deleteConfirm')
        }
      })
      const messageVNode = h('div', {
        domProps: {
          innerHTML: '<span style="color:red">※ ' +
              this.$t('dataCollect.modal.modelerProjectDeleteMes') +
              '<span>'
        }
      })

      this.$bvModal.msgBoxConfirm([messageVNode], {
        title: [titleVNode],
        size: 'xl',
        okTitle: this.$t('button.delBtn'),
        cancelTitle: this.$t('button.cancelBtn')
      })
        .then(async value => {
          if (value) {
            EventBus.$emit('clickRemoveProject', item)
          }
        })
    },
    Icon (type) {
      if (type === 'object') {
        return require('@/assets/3D-objects-icon.jpg')
      } else if (type === 'variable') {
        return require('@/assets/tag-icon.png')
      } else if (type === 'addressSpace') {
        return require('@/assets/addressSpace-icon.png')
      } else if (type === 'mapgraph') {
        return require('@/assets/graphstar-icon.png')
      }
    },
    initializeData (deviceData) {
      this.$refs.tree.initializeData(deviceData)
    },
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('data', JSON.stringify(item))
    }
  }
}
</script>

<style lang="scss">
#projectTreeView {
  .v-treeview-node__level {
    width: 15px;
  }
}
</style>
