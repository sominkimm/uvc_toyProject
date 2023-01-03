<template>
  <b-card class="preprocessed-card content profile-list">
    <b-row
      v-show="!profileList"
      class="text-center h-100"
    >
      <b-col class="text-center my-auto">
        <div class="loader-bubble loader-bubble-primary" />
      </b-col>
    </b-row>
    <div v-show="profileList">
      <b-card-title class="d-flex justify-content-between align-items-center">
        {{ $t('profileMaker.profileList') }}
        <add-device @addDevice="addDevice" />
      </b-card-title>
      <v-jstree
        ref="tree"
        :data="profileList"
        allow-batch
        text-field-name="name"
        @item-click="clickDevice"
      />
    </div>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import VJstree from 'vue-jstree'

import AddDevice from '@/views/app/dataCollect/profileMaker/components/add-profile'

export default {
  components: {
    VJstree,
    AddDevice
  },
  mixins: [mixinUtil],
  props: {
    profileList: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters('ProfileMaker', { insertedId: 'ProfileMakerInsertedId' }),
    ...mapGetters('ProfileMaker', {
      listCount: 'ProfileMakerListCount',
      listRows: 'ProfileMakerListRows',
      loading: 'ProfileMakerListLoading',
      listResult: 'ProfileMakerListResult',
      infoOpen: 'ProfileMakerOpen'
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.tree.initializeData(this.profileList)
    })
  },
  methods: {
    ...mapActions('ProfileMaker', ['actProfileMakerSelected']),
    addDevice () {
      this.$emit('addDevice')
    },
    clickDevice (node, item, e) {
      this.actProfileMakerSelected(null)
      this.$emit('clickDevice', node, item, e)
    },
    initializeData (profileList) {
      this.$refs.tree.initializeData(profileList)
    }
  }
}
</script>
