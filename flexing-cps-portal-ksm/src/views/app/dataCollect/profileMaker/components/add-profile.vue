<template>
  <div>
    <!-- 테이블 내부에 우측 각 행의 아이콘 부분 -->
    <ul class="module-profile-toolbar"> 
      <li>
        <button type="button" class="tool-btn" data-tool="modify"> 
          <span class="blind">수정하기</span> 
        </button>
      </li> 
      <li>
        <button type="button" class="tool-btn" data-tool="delete"> 
          <span class="blind">삭제하기</span> 
        </button>
      </li> 
        <li v-b-tooltip.hover="{
        placement: 'top',
        title: checkMenuAuth('authCreate') !== true
          ? $t('Common.Message.NoAuth.create') : $t('button.registerBtn')
      }">
        <button type="button" class="tool-btn" data-tool="create" @click="onSettingPopup()"> 
          <span class="blind">등록하기</span> 
        </button>
      </li> 
    </ul>
    <!-- // -->

      <!-- 기존버튼 숨김 -->
      <!-- 
    <b-button-group
      class="mx-1"
      size="sm"
    >
      <span
        v-b-tooltip.hover="{
          placement: 'top',
          title: checkMenuAuth('authCreate') !== true
            ? $t('Common.Message.NoAuth.create') : $t('button.registerBtn')
        }"
      >
        <b-button
          dev-comment="등록"
          :variant="button.variant.addNew"
          class="btn p-1 mr-1"
          size="sm"
          :disabled="checkMenuAuth('authCreate') !== true"
          @click="onSettingPopup()"
        >
          <mdicon
            name="plus"
            :size="18"
          />
        </b-button>
      </span>
    </b-button-group>
    -->

      <!-- 프로파일 등록 -->
        <div class="modal-wrap off">
          <section class="white-box">
            <header>
              <h3>프로파일 등록</h3> 
            </header>
            
            <div class="contents-wrap"> 
              <div class="contents-inner">  
                <ul class="module-list">
                  <li>
                    <div class="module-radio">
                      <p class="module-title">프로토콜 종류</p>
                      <div class="list"> 
                        <label>
                          <input type="radio" name="profile_protocol" checked>
                          <span>LS</span>
                        </label>
                        <label>
                          <input type="radio" name="profile_protocol">
                          <span>MITSUBISHI-Q</span>
                        </label>
                        <label>
                          <input type="radio" name="profile_protocol">
                          <span>MODBUS</span>
                        </label>
                        <label>
                          <input type="radio" name="profile_protocol">
                          <span>OPCUA</span>
                        </label>
                        <label>
                          <input type="radio" name="profile_protocol">
                          <span>CUSTOM</span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="module-radio">
                      <p class="module-title">통신 종류</p>
                      <div class="list"> 
                        <label>
                          <input type="radio" name="profile_network" checked>
                          <span>TCP/IP</span>
                        </label>
                        <label>
                          <input type="radio" name="profile_network">
                          <span>Serial</span>
                        </label> 
                      </div>
                    </div>
                  </li>
                  <li>       
                      <div class="module-input">
                        <label class="module-title" for="profile_name">프로파일 이름</label>
                        <div class="input-wrap">
                          <input type="text" id="profile_name" placeholder="프로파일 이름을 입력하세요" />
                        </div> 
                        <em class="description">
                        ※ 최대 20자까지 자유롭게 입력해주세요, 추후 변경이 가능합니다.
                        </em>
                      </div>
                    </li> 
                  </ul>
              </div>
            </div>

            <footer>
              <div class="modal-btns">
                <button type="button">취소</button>
                <button type="submit" class="next">등록</button>
              </div>
            </footer>
          </section>
        </div>
        <!-- // 프로파일 등록 -->
    <b-modal
      id="modal-profileMaker-addProfile"
      centered
      no-close-on-backdrop
      :title="$t('profileMaker.profileAddTitle')"
      @ok="addDevice"
    >
      <b-form
        @keyup.ctrl.enter="addDevice"
        @submit.prevent.stop=""
      >
        <b-row>
          <b-form-group
            :label="$t('profileMaker.protocolList')"
            class="col-md-12"
          >
            <b-form-radio-group
              v-model="protocolValue"
              buttons
              :options="protocolList"
              button-variant="outline-primary"
              value-field="value"
              text-field="name"
              size="sm"
            />
          </b-form-group>
          <b-form-group
            :label="$t('profileMaker.connectionList')"
            class="col-md-6"
          >
            <b-form-radio-group
              v-if="protocolValue !== 'opcua' && protocolValue !== 'custom'"
              v-model="connectionValue"
              buttons
              :options="connectionList"
              button-variant="outline-primary"
              value-field="value"
              text-field="name"
              size="sm"
            />
            <b-form-radio-group
              v-if="protocolValue === 'opcua'"
              v-model="connectionValue"
              buttons
              :options="connectionList2"
              button-variant="outline-primary"
              value-field="value"
              text-field="name"
              size="sm"
            />
            <b-form-radio-group
              v-if="protocolValue === 'custom'"
              v-model="connectionValue"
              buttons
              :options="connectionListUdp"
              button-variant="outline-primary"
              value-field="value"
              text-field="name"
              size="sm"
            />
          </b-form-group>
          <b-form-group
            class="col-md-12"
            :label="$t('profileMaker.profileName')"
          >
            <b-form-input
              v-model.trim="deviceName"
              autofocus
              type="text"
              :placeholder="$t('profileMaker.profileNamePlaceHolder')"
              @focus="focusInputNaming"
            />
            <div
              v-if="isSubmit && !$v.deviceName.required"
              class="app-validation"
            >
              {{ $t('Common.Message.Validate.required1', { field: $t('profileMaker.profileName')}) }}
            </div>
            <div
              v-if="isDuplicated"
              class="app-validation"
            >
              {{ $t('Common.Message.Validate.duplicated1', { field: $t('profileMaker.profileName')}) }}
            </div>
          </b-form-group>
        </b-row>
      </b-form>
      <template #modal-footer>
        <b-button
          :variant="button.variant.cancel"
          size="sm"
          @click="onCancel()"
        >
          {{ $t('button.cancelBtn') }}
        </b-button>
        <span
          v-b-tooltip.hover="{ placement: 'auto', title: $t('Common.Message.submitKey') }"
        >
          <b-button
            :variant="button.variant.addNew"
            size="sm"
            @click.prevent="addDevice()"
          >
            {{ $t('button.registerBtn') }}
          </b-button>
        </span>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'AddDevice',
  mixins: [mixinUtil],
  data () {
    return {
      visible: false,
      connectionValue: 'tcp/ip',
      connectionList: [
        { value: 'tcp/ip', name: 'TCP/IP' },
        { value: 'serial', name: 'Serial' }
      ],
      connectionList2: [{ value: 'tcp/ip', name: 'TCP/IP' }],
      connectionListUdp: [
        { value: 'tcp/ip', name: 'TCP/IP' },
        { value: 'serial', name: 'Serial' },
        { value: 'udp', name: 'UDP' }
      ],
      protocolValue: 'ls',
      protocolList: [
        { value: 'ls', name: 'LS' },
        { value: 'mitsubishi-q', name: 'MITSUBISHI-Q' },
        { value: 'modbus', name: 'MODBUS' },
        { value: 'opcua', name: 'OPCUA' },
        { value: 'custom', name: 'CUSTOM' }
      ],
      deviceName: null,
      isSubmit: false
    }
  },
  computed: {
    ...mapGetters('ProfileMaker', { infoData: 'ProfileMakerData' }),
    ...mapGetters('ProfileMaker', {
      infoResult: 'ProfileMakerResult',
      insertedId: 'ProfileMakerInsertedId',
      isDuplicated: 'ProfileMakerIsDuplicated'
    })
  },
  watch: {
  },
  validations: {
    deviceName: {
      required
    }
  },
  methods: {
    ...mapActions('ProfileMaker', [
      'actProfileMakerInit',
      'actProfileMakerTermDeviceTagInit'
    ]),
    ...mapActions('ProfileMaker', ['actProfileMakerList']),
    ...mapActions('ProfileMaker', ['actProfileMakerInsert']),
    ...mapActions('ProfileMaker', ['actProfileMakerIsDuplicated']),
    onSettingPopup () {
      this.$bvModal.show('modal-profileMaker-addProfile')
      this.connectionValue = 'tcp/ip'
      this.protocolValue = 'ls'
      this.deviceName = null
      this.actProfileMakerIsDuplicated(false)
      this.isSubmit = false
    },
    addDevice () {
      this.$v.$touch() // validateion 전체 체크
      this.isSubmit = true
      if (!this.$v.$invalid) { // validation 통과 시 submit 실행
        // 확인 모달창 주석 처리
        // const h = this.$createElement
        // const titleVNode = h('div', {
        //   domProps: {
        //     innerHTML: this.$t('modal.saveConfirm')
        //   }
        // })

        // const messageVNode = h('div', {
        //   domProps: {
        //     innerHTML: '<span style="color:black">' +
        //         this.$t('profileMaker.modal.deviceAdd') +
        //         '<span>'
        //   }
        // })

        // this.$bvModal
        //   .msgBoxConfirm([messageVNode], {
        //     title: [titleVNode],
        //     size: 'xl',
        //     okTitle: this.$t('button.saveBtn'),
        //     cancelTitle: this.$t('button.cancelBtn')
        //   }).then(async value => {
        //     if (value) {
        //       const params = {
        //         protocol: this.protocolValue,
        //         connectionType: this.connectionValue,
        //         name: this.deviceName,
        //         requests: []
        //       }

        //       this.actProfileMakerInsert(params)
        //     }
        //   })
        const params = {
          protocol: this.protocolValue,
          connectionType: this.connectionValue,
          name: this.deviceName,
          requests: []
        }

        this.actProfileMakerInsert(params)
        this.isSubmit = false
      }
    },
    focusInputNaming () { // 중복 validation 체크된 상태에서 input.focus시 state변경
      if (this.isDuplicated === true) {
        this.actProfileMakerIsDuplicated(false)
      }
    },
    onCancel () {
      this.isSubmit = false
      this.$bvModal.hide('modal-profileMaker-addProfile')
    }
  }
}
</script>

<style lang="scss" scoped>
/* validation text */
.app-validation {
  color: #FF5252;
  font-size: 11px;
}
</style>

