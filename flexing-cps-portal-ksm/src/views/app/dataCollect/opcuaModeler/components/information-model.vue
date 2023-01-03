<template>
  <b-card
    :style="!selectedViewList[1] ? 'height:79vh;' : 'height:18vh;'"
    style="overflow-y: auto"
  >
    <b-card-title class="d-flex justify-content-between align-items-center">
      Information
    </b-card-title>
    <v-jstree
      ref="tree"
      :data="items"
      text-field-name="name"
    >
      <template slot-scope="selectedItems">
        <div
          :id="selectedItems.model.id"
          :draggable="selectedItems.model.children.length === 0 ? true : false"
          @dragstart="startDrag($event, selectedItems.model)"
        >
          <i
            v-if="!selectedItems.model.loading"
            :class="selectedItems.vm.themeIconClasses"
            role="presentation"
          />
          {{ selectedItems.model.name }}
        </div>
      </template>
    </v-jstree>
  </b-card>
</template>

<script>
import mixinUtil from '@/lib/utils/mixinUtil'
import { typeList } from '@/views/app/dataCollect/opcuaModeler/information-data'
import VJstree from 'vue-jstree'

export default {
  name: 'InformationView',
  components: {
    VJstree
  },
  mixins: [mixinUtil],
  props: {
    selectedViewList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    items: typeList
  }),
  methods: {
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('data', JSON.stringify(item))
    }
  }
}
</script>
