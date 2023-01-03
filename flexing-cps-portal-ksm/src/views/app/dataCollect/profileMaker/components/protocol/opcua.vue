<template>
  <div>
    <div class="app-description">
      ※ {{ $t('profileMaker.description.saveDescription') }}
    </div>
    <b-card
      :title="$t('profileMaker.addTag')"
      class="mb-3 preprocessed-card content"
    >
      <b-row class="uvc-module">
        <b-form-group
          dev-comment="노드 아이디"
          class="col-md-6 module-input"
          :label="$t('profileMaker.nodeId')"
          label-for="input-1"
        >
          <b-form-input
            v-model="params.OpcuaProtocol.nodeId"
            type="text"
            required
            :placeholder="$t('profileMaker.description.nodeIdPlaceholder')"
            @blur="nodeIdOverlapValidate = false"
            @keydown="nodeIdOverlapValidate = false"
          />
          <div
            v-if="isSubmit && !$v.params.OpcuaProtocol.nodeId.required"
            class="app-validation"
          >
            {{ $t('Common.Message.Validate.required1', { field: $t('profileMaker.nodeId')}) }}
          </div>
          <div
            v-if="isSubmit && nodeIdOverlapValidate"
            class="app-validation"
          >
            {{ $t('Common.Message.Validate.overlap', { field: $t('profileMaker.nodeId')}) }}
          </div>
        </b-form-group>
        <b-form-group
          dev-comment="태그명"
          class="col-md-6 module-input-btn"
          :label="$t('profileMaker.tagName')"
          label-for="input-1"
        >
          <b-input-group class="input-wrap">
           <input
              id="tag_name"
              type="text"
              placeholder="태그명을 입력하세요"
              v-model="params.OpcuaProtocol.tagName"
            >
            <button type="submit" class="btn-apply" :variant="button.variant.addNew"
                @click="newTagAdd">추가</button>

            <!-- 기존소스 숨김
            <b-form-input
              v-model="params.OpcuaProtocol.tagName"
              type="text"
              required
              :placeholder="$t('profileMaker.description.tagNamePlaceholder')"
              @blur="tagNameOverlapValidate = false"
              @keydown="tagNameOverlapValidate = false"
            />
            <b-input-group-append>
              <b-button
                dev-comment="추가"
                type="submit"
                :variant="button.variant.addNew"
                @click="newTagAdd"
              >
                {{ $t('button.addBtn') }}
              </b-button>
            </b-input-group-append>
            -->
          </b-input-group>
          <div
            v-if="isSubmit && !$v.params.OpcuaProtocol.tagName.required"
            class="app-validation"
          >
            {{ $t('Common.Message.Validate.required1', { field: $t('profileMaker.tagName')}) }}
          </div>
          <div
            v-if="isSubmit && tagNameOverlapValidate"
            class="app-validation"
          >
            {{ $t('Common.Message.Validate.overlap', { field: $t('profileMaker.tagName')}) }}
          </div>
        </b-form-group>
      </b-row>
    </b-card>

    <!-- 태그 리스트 -->
    <b-card
      v-if="selectedDevice.requests"
      class="preprocessed-card content"
    > 
      <div class="taglist-header">
        <b-card-title class="d-flex justify-content-between align-items-center">
          {{ $t('profileMaker.tagList') }}
        </b-card-title>
          
        <b-button-group
          v-if="selectedDevice.requests.length > 0"
          size="sm"
        >
          <b-button
            dev-comment="수정완료/수정"
            :variant="button.variant.update"
            @click="onTagListEdit()"
          >
            {{ tagListEditStatus ? $t('button.editCompleteBtn'): $t('button.editBtn') }}
          </b-button>
        </b-button-group>
      </div> 

      <vue-good-table
        style-class="tableOne vgt-table module-table-tag"
        theme="polar-bear"
        :columns="tagColumns"
        :rows="selectedDevice.requests"
        :line-numbers="true"
        :row-style-class="rowStyleClassFn"
        :sort-options="{
          enabled: false,
        }"
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
              <!-- <i class="i-Close-Window text-25 text-danger" /> -->
              <mdicon
                name="close-thick"
                :size="17"
                class="remove-class"
              />
            </a>
          </span>
          <span v-else-if="props.column.field === 'nodeId' && tagListEditStatus">
            <b-form-input
              :ref="`${props.row.tagId}-nodeId`"
              v-model="selectedDevice.requests[props.row.originalIndex].nodeId"
              dev-comment="노드 아이디"
            />
            <div
              :ref="`${props.row.tagId}-nodeId-validation`"
              class="app-validation table-in"
            >&nbsp;</div>
          </span>
          <span v-else-if="props.column.field === 'name' && tagListEditStatus">
            <b-form-input
              :ref="`${props.row.tagId}-name`"
              v-model="selectedDevice.requests[props.row.originalIndex].name"
              dev-comment="태그명"
            />
            <div
              :ref="`${props.row.tagId}-name-validation`"
              class="app-validation table-in"
            >&nbsp;</div>
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

import mixinUtil from '@/lib/utils/mixinUtil'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'OpcuaProtocolView',
  components: {},
  mixins: [mixinUtil],
  props: {
    selectedDevice: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      params: {
        OpcuaProtocol: {
          nodeId: '',
          tagName: ''
        }
      },
      tagNameOverlapValidate: false,
      nodeIdOverlapValidate: false,
      tagColumns: [
        {
          label: this.$t('columns.nodeId'),
          field: 'nodeId'
        },
        {
          label: this.$t('profileMaker.tagName'),
          field: 'name'
        },
        {
          label: '',
          field: 'button',
          tdClass: 'text-center',
          thClass: 'text-center'
        }
      ],
      tagListEditStatus: false,
      isSubmit: false
    }
  },
  validations: {
    params: {
      OpcuaProtocol: {
        nodeId: { required },
        tagName: { required }
      }
    },
    paramsExt: {}
  },
  watch: {
    selectedDevice () {
      // 초기화
      this.onDataInit()
    }
  },
  methods: {
    ...mapActions('ProfileMaker', ['actProfileMakerTagListUpdateTypeChange']),
    onDataInit () {
      this.isSubmit = false
      this.tagListEditStatus = false
      this.params.OpcuaProtocol = {
        nodeId: '',
        tagName: ''
      }
    },
    rowStyleClassFn () {
      return 'profile-table-tr'
    },
    newTagAdd () {
      this.$v.$touch() // validateion 전체 체크
      this.isSubmit = true
      this.tagNameOverlapValidate = false
      this.nodeIdOverlapValidate = false

      if (!this.$v.$invalid) { // validation 통과 시 submit 실행
        // 태그 리스트의 태그명 중복 check
        if (this.selectedDevice.requests.find(e => e.name === this.params.OpcuaProtocol.tagName)) {
          this.tagNameOverlapValidate = true
        } else {
          this.tagNameOverlapValidate = false
        }

        // 태그 리스트의 노드 아이디 중복 check
        if (this.selectedDevice.requests.find(e => e.nodeId === this.params.OpcuaProtocol.nodeId)) {
          this.nodeIdOverlapValidate = true
        } else {
          this.nodeIdOverlapValidate = false
        }

        if (this.tagNameOverlapValidate === false && this.nodeIdOverlapValidate === false) {
          this.selectedDevice.requests.push({
            tagId: +new Date(),
            name: this.params.OpcuaProtocol.tagName,
            nodeId: this.params.OpcuaProtocol.nodeId
          })
          this.onDataInit()
          this.actProfileMakerTagListUpdateTypeChange(true)
        }
      }
    },
    removeTag (props) {
      this.selectedDevice.requests.splice(props.index, 1)
    },
    checkDuplicates (originalArray, prop) {
      const lookupObject = {}
      const duplicateArray = []

      for (const i in originalArray) {
        if (lookupObject[originalArray[i][prop]] !== undefined) {
          if (lookupObject[originalArray[i][prop]].name !== '') {
            duplicateArray.push(lookupObject[originalArray[i][prop]].tagId)
            duplicateArray.push(originalArray[i].tagId)
          }
        }
        lookupObject[originalArray[i][prop]] = originalArray[i]
      }

      const set = new Set(duplicateArray)
      const uniqueArray = [...set]
      return uniqueArray
    },
    onTagListEdit () {
      const tagList = this.selectedDevice.requests
      const nodeIdEmptyArray = []
      const tagNameEmptyArray = []

      // 수정완료 버튼을 클릭 했을때 태그명이 중복된 값 & 메모리 번지 validation check
      if (this.tagListEditStatus === true) {
        const uniqueTagNameArray = this.checkDuplicates(tagList, 'name')
        const uniqueNodeIdArray = this.checkDuplicates(tagList, 'nodeId')

        // ref css 전체 초기화
        for (const x in tagList) {
          this.$refs[tagList[x].tagId + '-name'].$el.style.border = '1px solid #9CA3AF'
          this.$refs[tagList[x].tagId + '-name-validation'].innerText = ''
          this.$refs[tagList[x].tagId + '-nodeId'].$el.style.border = '1px solid #9CA3AF'
          this.$refs[tagList[x].tagId + '-nodeId-validation'].innerText = ''
        }

        for (const e in tagList) {
          // 노드 아이디 empty check
          if (tagList[e].nodeId === undefined || tagList[e].nodeId === null || tagList[e].nodeId === '') {
            nodeIdEmptyArray.push(tagList[e].tagId)
          }
        }

        // 노드 아이디 empty일 경우 css 처리
        for (const e2 in nodeIdEmptyArray) {
          this.$refs[nodeIdEmptyArray[e2] + '-nodeId'].$el.style.border = '1px solid #F32424'
          this.$refs[nodeIdEmptyArray[e2] + '-nodeId-validation'].innerText =
            this.$t('Common.Message.Validate.required1', { field: this.$t('profileMaker.nodeId') })
        }

        if (nodeIdEmptyArray.length === 0) {
          // 노드 아이디 empty 없을 경우 중복된 값 check
          for (const e3 in uniqueNodeIdArray) {
            this.$refs[uniqueNodeIdArray[e3] + '-nodeId'].$el.style.border = '1px solid #F32424'
            this.$refs[uniqueNodeIdArray[e3] + '-nodeId-validation'].innerText =
            this.$t('Common.Message.Validate.overlap', { field: this.$t('profileMaker.nodeId') })
          }
        }

        // 태그명 중복된 값 check
        for (const i in uniqueTagNameArray) {
          this.$refs[uniqueTagNameArray[i] + '-name'].$el.style.border = '1px solid #F32424'
          this.$refs[uniqueTagNameArray[i] + '-name-validation'].innerText =
          this.$t('Common.Message.Validate.overlap', { field: this.$t('profileMaker.tagName') })
        }

        if (uniqueTagNameArray.length === 0) {
          // 태그명 중복값 없을 경우 empty 체크
          for (const t in tagList) {
            // 태그명 empty check
            if (tagList[t].name === undefined || tagList[t].name === null || tagList[t].name === '') {
              tagNameEmptyArray.push(tagList[t].tagId)
            }
          }

          // 태그명 empty일 경우 css 처리
          for (const t2 in tagNameEmptyArray) {
            this.$refs[tagNameEmptyArray[t2] + '-name'].$el.style.border = '1px solid #F32424'
            this.$refs[tagNameEmptyArray[t2] + '-name-validation'].innerText =
            this.$t('Common.Message.Validate.required1', { field: this.$t('profileMaker.tagName') })
          }
        }

        if ((uniqueTagNameArray.length === 0 && tagNameEmptyArray.length === 0) &&
        (nodeIdEmptyArray.length === 0 && uniqueNodeIdArray.length === 0)) {
          this.tagListEditStatus = false
          this.$emit('onTagListUpdateType')
        }
      } else {
        this.tagListEditStatus = !this.tagListEditStatus
        this.$emit('onTagListUpdateType')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
