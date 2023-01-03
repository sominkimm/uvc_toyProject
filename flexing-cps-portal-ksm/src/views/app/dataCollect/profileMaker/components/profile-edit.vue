<template>
  <b-card class="preprocessed-card profile-edit">
    <!-- 선택된 디바이스가 없을 때에 출력되는 메세지 -->
    <article
      v-if="!selectedDevice"
      class="module-msgbox"
    >
      <img :src="require('@/assets/images/icons/flexing.svg')">
      <h2 class="title">
        선택된 디바이스가 없습니다.
      </h2>
      <p class="script">
        디바이스를 선택해주세요
      </p>
    </article>


    <!-- <b-row
      v-if="!selectedDevice"
      class="text-center h-100"
    >
      <b-col class="text-center my-auto">
        <p class="text-30 subheading mb-1">
          {{ $t('profileMaker.description.noDeviceData') }}
        </p>
        <p class="text-muted text-15">
          {{ $t('profileMaker.description.deviceSelected') }}
        </p>
      </b-col>
    </b-row> -->
    <div
      v-if="selectedDevice"
    >
      <b-card-title class="header-wrap">
        <div class="left">
          <h4 class="heading">
            {{ selectedDevice.name }}
          </h4>
          <dl class="section-infowrap">
            <dt>{{ this.$t('profileMaker.protocolList') }} :</dt>
            <dd>{{ selectedDevice.protocol.toUpperCase() }}</dd>
            <dt>{{ this.$t('profileMaker.connectionList') }} :</dt>
            <dd>{{ selectedDevice.connectionType }}</dd>
          </dl>

          <!--
          <div class="section-infowrap">
            <span class="section-info">
              {{ this.$t('profileMaker.protocolList') }} :
              <span>{{ selectedDevice.protocol.toUpperCase() }}</span>
              &nbsp;&nbsp;
            </span>
            <span class="section-info">
              {{ this.$t('profileMaker.connectionList') }} :
              <span> {{ selectedDevice.connectionType }}</span>
            </span>
          </div>
         -->
        </div>


        <!-- 테이블 내부에 우측 각 행의 아이콘 부분 -->
        <ul class="module-profile-toolbar">
          <li
            v-b-tooltip.hover="{
              placement: 'top',
              title: checkMenuAuth('authDelete') !== true
                ? $t('Common.Message.NoAuth.delete') : $t('button.delBtn')
            }"
          >
            <button
              type="button"
              class="tool-btn"
              data-tool="delete"
              dev-comment="삭제"
              :variant="button.variant.delete"
              size="sm"
              :disabled="checkMenuAuth('authDelete') !== true"
              @click="removeProtocol"
            >
              <span class="blind">삭제하기</span>
            </button>
          </li>
          <li
            v-b-tooltip.hover="{
              placement: 'top',
              title: checkMenuAuth('authCreate') !== true
                ? $t('Common.Message.NoAuth.create') : !tagListUpdateType
                  ? $t('profileMaker.description.saveBtnDescription') : $t('button.saveBtn')
            }"
          >
            <button
              type="button"
              class="tool-btn"
              data-tool="save"
              dev-comment="저장"
              :variant="button.variant.save"
              size="sm"
              :disabled="checkMenuAuth('authCreate') !== true || !tagListUpdateType"
              @click="saveProtocol"
            >
              <span class="blind">저장하기</span>
            </button>
          </li>
        </ul>
        <!-- // -->


        <!-- 기존버튼 태그 숨김 -->
        <!--
        <b-button-group>
        >
          <span
            v-b-tooltip.hover="{
              placement: 'top',
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
              @click="removeProtocol"
            >
              <mdicon
                name="delete-forever-outline"
                :size="18"
              />
            </b-button>
          </span>
          <span
            v-b-tooltip.hover="{
              placement: 'top',
              title: checkMenuAuth('authCreate') !== true
                ? $t('Common.Message.NoAuth.create') : !tagListUpdateType
                  ? $t('profileMaker.description.saveBtnDescription') : $t('button.saveBtn')
            }"
          >
            <b-button
              dev-comment="저장"
              :variant="button.variant.save"
              class="btn p-1 mr-1"
              size="sm"
              :disabled="checkMenuAuth('authCreate') !== true || !tagListUpdateType"
              @click="saveProtocol"
            >
              {{ $t('button.saveBtn') }}
              <mdicon
                name="content-save"
                :size="18"
              />
            </b-button>
          </span>
        </b-button-group>
        -->
      </b-card-title>
      <div class="custom-separator" />
      <custom-protocol-view
        v-if="selectedDevice.protocol === 'custom'"
        :selected-device="selectedDevice"
      />
      <ls-protocol-view
        v-if="selectedDevice.protocol === 'ls'"
        :selected-device="selectedDevice"
        @onTagListUpdateType="onTagListUpdateType"
      />
      <mitsubishi-protocol-view
        v-if="selectedDevice.protocol === 'mitsubishi-q'"
        :selected-device="selectedDevice"
        @onTagListUpdateType="onTagListUpdateType"
      />
      <modbus-protocol-view
        v-if="selectedDevice.protocol === 'modbus'"
        :selected-device="selectedDevice"
        @onTagListUpdateType="onTagListUpdateType"
      />
      <opcua-protocol-view
        v-if="selectedDevice.protocol === 'opcua'"
        :selected-device="selectedDevice"
        @onTagListUpdateType="onTagListUpdateType"
      />
    </div>
  </b-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'

import CustomProtocolView from '@/views/app/dataCollect/profileMaker/components/protocol/custom'
import LsProtocolView from '@/views/app/dataCollect/profileMaker/components/protocol/ls'
import MitsubishiProtocolView from '@/views/app/dataCollect/profileMaker/components/protocol/mitsubishi'
import ModbusProtocolView from '@/views/app/dataCollect/profileMaker/components/protocol/modbus'
import OpcuaProtocolView from '@/views/app/dataCollect/profileMaker/components/protocol/opcua.vue'

export default {
  name: 'ProfileEdit',
  components: {
    CustomProtocolView,
    LsProtocolView,
    MitsubishiProtocolView,
    ModbusProtocolView,
    OpcuaProtocolView
  },
  mixins: [mixinUtil],
  props: {
    selectedDevice: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters('ProfileMaker', {
      infoData: 'ProfileMakerData'
    }),
    ...mapGetters('ProfileMaker', {
      infoResult: 'ProfileMakerResult',
      insertedId: 'ProfileMakerInsertedId',
      updatedCount: 'ProfileMakerUpdatedCount',
      deletedCount: 'ProfileMakerDeletedCount',
      isDuplicated: 'ProfileMakerIsDuplicated'
    }),
    tagListUpdateType () {
      return this.infoData.tagListUpdateType
    }
  },
  watch: {
    updatedCount (value) { // 업데이트 후 처리
      if (value !== null) {
        if (value < 0) { // 업데이트 실패
          if (!this.isDuplicated) { // 중복시 toast 발생 안하고 input창 텍스트로 반응
            this.makeToastError(this.infoResult) // 실패 시 메세지
          }
        } else if (value === 0) { // 업데이트 된 항목 없음
          this.makeToastSuccess(this.infoResult, this.$t('Common.Message.Nodata.noupdate'))
        } else if (value > 0) { // 업데이트 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지

          this.$emit('saveProtocol', this.selectedDevice)
        }
      }
    },
    deletedCount (value) {
      if (value !== null) {
        if (value < 0) { // 삭제 실패
          this.makeToastError(this.infoResult) // 실패 시 메세지
        } else if (value === 0) { // 삭제 된 항목 없음
          this.makeToastSuccess(this.infoResult, this.$t('Common.Message.Nodata.noupdate'))
        } else if (value > 0) { // 삭제 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지

          this.$emit('removeProtocol')
        }
      }
    }
  },
  methods: {
    ...mapActions('ProfileMaker', [
      'actProfileMakerUpdate',
      'actProfileMakerDelete',
      'actProfileMakerTagListUpdateTypeChange']),
    ...mapActions('ProfileMaker', ['actProfileMakerIsDuplicated']),
    async saveProtocol () {
      const h = this.$createElement
      const titleVNode = h('div', {
        domProps: {
          innerHTML: this.$t('modal.saveConfirm')
        }
      })
      const messageVNode = h('div', {
        domProps: {
          innerHTML: '<span style="color:red">※ ' +
              this.$t('modal.profileMakerProtocolSave') +
              '<span>'
        }
      })

      this.$bvModal
        .msgBoxConfirm([messageVNode], {
          title: [titleVNode],
          size: 'xl',
          okTitle: this.$t('button.saveBtn'),
          cancelTitle: this.$t('button.cancelBtn')
        })
        .then(async value => {
          if (value) {
            const params = {
              ...this.selectedDevice
            }

            this.actProfileMakerUpdate(params)
          }
        })
    },
    async removeProtocol () {
      // 프로파일 삭제시 연결된 디바이스 체크
      if (this.selectedDevice.Devices.length > 0) {
        this.$bvToast.toast(
          `${this.selectedDevice.name}` + this.$t('modal.profileConnectingDevice'),
          {
            title: 'error',
            variant: 'danger',
            solid: true
          }
        )
      } else {
        const h = this.$createElement
        const titleVNode = h('div', {
          domProps: {
            innerHTML: this.$t('modal.deleteConfirm')
          }
        })
        const messageVNode = h('div', {
          domProps: {
            innerHTML: '<span style="color:red">※ ' +
              this.$t('modal.profileMakerProtocolDelete') +
              '<span>'
          }
        })

        this.$bvModal
          .msgBoxConfirm([messageVNode], {
            title: [titleVNode],
            size: 'xl',
            okTitle: this.$t('button.delBtn'),
            cancelTitle: this.$t('button.cancelBtn')
          })
          .then(async value => {
            if (value) {
              const params = {
                data: {
                  ...this.selectedDevice
                }
              }

              this.actProfileMakerDelete(params)
            }
          })
      }
    },
    getChangeNetworkName () {
      switch (this.selectedDevice.connectionType) {
      case 'serial':
        return 'change to TCP/IP'
      case 'tcp/ip':
        return 'change to Serial'
      }
    },
    changeConnectionType () {
      if (this.selectedDevice.connectionType === 'serial') {
        this.selectedDevice.connectionType = 'tcp/ip'
      } else if (this.selectedDevice.connectionType === 'tcp/ip') {
        this.selectedDevice.connectionType = 'serial'
      }
    },
    onTagListUpdateType () {
      this.actProfileMakerTagListUpdateTypeChange(!this.tagListUpdateType)
    }
  }
}
</script>

<style></style>
