<template>
  <b-tabs v-model="tabIndex">
    <b-tab
      v-for="(item, key) in selectedDevice.requests"
      :key="'dyn-tab-' + key"
      :title="item.name"
    >
      <b-row class="uvc-module">
        <b-form-group
          class="col-md-12 module-input"
          :label="isCustomUdp() ? $t('profileMaker.oriDataName') : $t('profileMaker.requestParameterName')"
          label-for="input-1"
        >
          <b-form-input
            v-model="selectedDevice.requests[key].name"
            type="text"
            required
            :placeholder="$t('profileMaker.profilePlaceholder')"
          />

        </b-form-group>
        
        <b-form-group
          v-if="!isCustomUdp()"
          class="col-md-12 module-input"
          :label="$t('profileMaker.requestParameter')"
          label-for="input-1"
        >
          <b-form-input
            v-model="selectedDevice.requests[key].parameter"
            type="text"
            required
            :placeholder="
              $t('profileMaker.description.requestStringPlaceholder')
            "
          />
        </b-form-group>

         
        <b-form-group
          class="col-md-12 module-input-btn"
          :label="$t('profileMaker.parameterLength')"
          label-for="input-1"
        >
          <b-input-group class="input-wrap">
            <input
              id="parameter_length"
              type="number"
              placeholder="숫자를 입력하세요"
            >
            <button type="button" class="btn-apply">적용</button>

            <!-- 기존소스 숨김
            <b-form-input
              v-model="selectedDevice.requests[key].packetLength"
              type="number"
              required
              placeholder="put your packet length"
            />
            <b-input-group-append>
              <b-button
                type="submit"
                :variant="button.variant.apply"
                size="sm"
                @click="paramLengthInit"
              >
                {{ $t('button.applyBtn') }}
              </b-button>
            </b-input-group-append>
            -->

            
          </b-input-group>
        </b-form-group> 

        <b-col
          style="padding: 0 0 15px 0;"
          dev-comment="데이터 구간 정하기"
        >
          <b-form-group
            v-if="
              selectedDevice.requests[key].packetLengthList &&
                selectedDevice.requests[key].packetLengthList.length > 0
            "
            :label="$t('profileMaker.dataSection')"
            label-for="input-1"
            class="col-md-12"
          >
            <div class="app-description">
              ※ {{ $t('profileMaker.description.packetLength') }}
            </div>
            <b-card
              class="preprocessed-card content"
            >
              <vue-drag-selector
                ref="drag"
                selector-class="item"
                style="display: flex;"
                @change="changeDataSection"
              >
                <template slot-scope="{ selectedItems }">
                  <b-badge
                    v-for="selectItem in selectedDevice.requests[key]
                      .packetLengthList"
                    :key="selectItem"
                    style="flex-grow: 1;"
                    class="mr-1"
                    :class="getClasses(selectItem, selectedItems)"
                    :data-item="selectItem"
                  >
                    {{ selectItem }}
                  </b-badge>
                </template>
              </vue-drag-selector>
            </b-card>
          </b-form-group>
        </b-col>
        <b-form-group
          v-if="
            selectedDevice.requests[key].packetLengthList &&
              selectedDevice.requests[key].packetLengthList.length > 0
          "
          class="col-md-12"
          :label="$t('profileMaker.tagName')"
          label-for="form"
        >
          <b-input-group>
            <b-form-input
              v-model="newTagName"
              :placeholder="$t('profileMaker.description.tagNamePlaceholder')"
            />
            <b-input-group-append>
              <b-button
                :variant="button.variant.addNew"
                size="sm"
                @click="newTagAdd"
              >
                {{ $t('button.addBtn') }}
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-col>
          <b-card
            v-if="
              selectedDevice.requests[key].tags &&
                selectedDevice.requests[key].tags.length > 0
            "
            class="preprocessed-card content"
          >
            <b-card-title class="d-flex justify-content-between align-items-center">
              {{ $t('profileMaker.tagList') }}
            </b-card-title>
            <vue-good-table
              style-class="tableOne vgt-table"
              theme="polar-bear"
              row-style-class="profile-table-tr"
              :columns="tagColumns"
              :rows="selectedDevice.requests[key].tags"
            >
              <template
                slot="table-row"
                slot-scope="props"
              >
                <span v-if="props.column.field === 'button'">
                  <a
                    href="#"
                    @click="removeTag(props)"
                  >
                    <mdicon
                      name="close-thick"
                      :size="17"
                      class="remove-class"
                    />
                  </a>
                </span>
              </template>
            </vue-good-table>
          </b-card>
        </b-col>
      </b-row>
      <template #title>
        {{ item.name }}
        <b-badge
          v-if="!isCustomUdp()"
          href="#"
          class="tab-close"
          @click.prevent.stop="removeTab(item)"
        >
          <span class="blind">탭 삭제하기</span>
        </b-badge>
      </template>
    </b-tab>
    <template
      v-if="!isCustomUdp()"
      #tabs-end
    >
      <b-nav-item
        role="presentation"
        href="#"
        @click.prevent="newTab"
      >
        <b>+</b>
      </b-nav-item>
    </template>
  </b-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'

import VueDragSelector from '@/components/drag-selector'
import store from '@/store'

export default {
  name: 'CustomProtocolView',
  components: {
    VueDragSelector
  },
  mixins: [mixinUtil],
  props: {
    selectedDevice: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      tabIndex: 0,
      newTagName: '',
      tagColumns: [
        {
          label: this.$t('columns.tagName'),
          field: 'name'
        },
        {
          label: this.$t('columns.offsetStart'),
          field: 'offsetStart',
          type: 'number',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          label: this.$t('columns.offsetEnd'),
          field: 'offsetEnd',
          type: 'number',
          tdClass: 'text-center',
          thClass: 'text-center'
        },
        {
          label: '',
          field: 'button',
          tdClass: 'text-center',
          thClass: 'text-center'
        }
      ],
      dataOffsetStart: null,
      dataOffsetEnd: null,
      connectionTypeVisibledUdp: true
    }
  },
  computed: {
    ...mapGetters('ProfileMaker', { selectedId: 'ProfileMakerSelectedId' }),
    selectedIdSee () {
      return this.selectedId
    }
  },
  watch: {
    selectedIdSee () {
      if (this.selectedDevice.connectionType === 'udp' && this.selectedDevice.requests.length === 0) {
        this.newTab()
      }
    }
  },
  methods: {
    paramLengthInit () {
      if (
        this.selectedDevice.requests[this.tabIndex].packetLength === '' ||
          this.selectedDevice.requests[this.tabIndex].packetLength === null ||
          Number(this.selectedDevice.requests[this.tabIndex].packetLength) === 0
      ) {
        this.makeToast(this.$t('profileMaker.modal.requiredParamLength'), 'danger',
          this.$t('profileMaker.modal.requiredValueWarring'))
        return
      } else if ( // 파라미터 길이 1000자 제한
        Number(this.selectedDevice.requests[this.tabIndex].packetLength) > 1000
      ) {
        this.makeToast(this.$t('profileMaker.modal.paramLengthWarring'), 'danger',
          this.$t('profileMaker.modal.paramLength'))
        return
      }

      const h = this.$createElement
      const titleVNode = h('div', {
        domProps: {
          innerHTML: this.$t('profileMaker.modal.resetPacketConfirmMessage')
        }
      })
      const messageVNode = h('div', {
        domProps: {
          innerHTML: '<span style="color:red">※ ' +
              this.$t('profileMaker.modal.resetPacketTagDelete') +
              '<span>'
        }
      })
      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: [titleVNode],
          size: 'xl',
          okTitle: this.$t('button.confirmBtn'),
          cancelTitle: this.$t('button.cancelBtn')
        })
        .then(async value => {
          if (value) {
            const packetLengthList = []
            for (
              let i = 0;
              i < this.selectedDevice.requests[this.tabIndex].packetLength;
              i++
            ) {
              packetLengthList.push(i)
            }
            this.selectedDevice.requests[
              this.tabIndex
            ].packetLengthList = packetLengthList
            this.selectedDevice.requests[this.tabIndex].tags = []

            this.makeToast(this.$t('profileMaker.modal.resetPacketMes'), 'success',
              this.$t('modal.resetMes'))
          }
        })
    },
    newTagAdd () {
      if (
        this.dataOffsetStart === null ||
          this.dataOffsetEnd === null ||
          this.newTagName === null ||
          this.newTagName === ''
      ) {
        this.makeToast(this.$t('profileMaker.modal.dataRangeTagMes'), 'danger',
          this.$t('profileMaker.modal.requiredValueWarring'))
        return
      }

      if (this.selectedDevice.requests[this.tabIndex].tags.find(e => e.name === this.newTagName)) {
        this.makeToast(this.$t('profileMaker.modal.tagNameDuplicateMes'), 'danger',
          this.$t('profileMaker.modal.duplicateValuesWarring'))
        return
      }
      this.selectedDevice.requests[this.tabIndex].tags.push({
        tagId: +new Date(),
        name: this.newTagName,
        offsetStart: this.dataOffsetStart,
        offsetEnd: this.dataOffsetEnd
      })
      for (let i = this.dataOffsetStart; i <= this.dataOffsetEnd; i++) {
        const findIndex = this.selectedDevice.requests[
          this.tabIndex
        ].packetLengthList.findIndex(e => e === i)
        if (findIndex !== -1) {
          this.selectedDevice.requests[this.tabIndex].packetLengthList.splice(
            findIndex,
            1
          )
        }
      }
      this.newTagName = null
      this.dataOffsetStart = null
      this.dataOffsetEnd = null
    },
    removeTag (props) {
      this.changeDataSection([])
      // 자식 컴포넌트의 함수 실행 (esc 버튼 강제 클릭)
      // 해당 함수 호출 안할 시 마지막 태그 삭제 시 데이터 구간 자동 선택됨
      if (this.$refs.drag !== undefined && this.$refs.drag.length === 1) {
        this.$refs.drag[0].keydownHandler({
          key: 'Escape'
        })
      }

      const value = this.selectedDevice.requests[this.tabIndex].tags[
        props.index
      ]
      const findIndex = this.selectedDevice.requests[
        this.tabIndex
      ].packetLengthList.findIndex(e => e > value.offsetStart)
      for (let i = value.offsetEnd; i >= value.offsetStart; i--) {
        this.selectedDevice.requests[this.tabIndex].packetLengthList.splice(
          findIndex,
          0,
          i
        )
      }
      this.selectedDevice.requests[this.tabIndex].tags.splice(props.index, 1)

      this.selectedDevice.requests[0].packetLengthList.sort(function (a, b) {
        if (a > b) return 1
        if (a === b) return 0
        if (a < b) return -1
      })
    },
    newTab () {
      this.selectedDevice.requests.push({
        name: `request (${this.selectedDevice.requests.length + 1})`,
        packetLength: 0,
        tags: []
      })
    },
    removeTab (item) {
      const findIndex = this.selectedDevice.requests.findIndex(e => e === item)
      this.selectedDevice.requests.splice(findIndex, 1)
    },
    getClasses (item, selectedItems) {
      const isActive = !!selectedItems.find(selectedItem => {
        return parseInt(selectedItem.dataset.item, 10) === item
      })
      return {
        item: true,
        active: isActive
      }
    },
    changeDataSection (e) {
      if (e.length === 0) {
        this.dataOffsetStart = null
        this.dataOffsetEnd = null
        return
      }
      this.dataOffsetStart = Number(e[0].innerText)
      this.dataOffsetEnd = Number(e[e.length - 1].innerText)
    },
    isCustomUdp () {
      // 해당 component 통신 종류가 udp 인지 체크하는 함수
      // return 값이 true or false 이기 때문에 함수 앞부분 is
      return this.selectedDevice.connectionType === 'udp'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/* Custom styling */
.item {
  display: inline-flex;
  height: 35px;
  margin-bottom: 5px;
  background-color: #f3f4f6;
  justify-content: center;
  align-items: center;
  color: #111827;
  border: 1px solid #9ca3af;
  font-size: 15px;
}
.item.active {
  background-color: #3D3C42;
  color: #fff;
}

</style>
