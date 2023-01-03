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
        <!-- <b-form-group
          dev-comment="메모리 타입"
          class="col-md-3 mb-2"
          :label="$t('profileMaker.memoryType')"
          label-for="input-1"
        >
          <b-form-select
            v-model="params.MitsubishiProtocol.memoryType"
            :options="memoryTypeList"
            value-field="name"
            text-field="name"
          />
        </b-form-group> -->
        <b-form-group
          dev-comment="메모리 번지"
          class="col-md-6 module-input"
          :label="$t('profileMaker.memoryAddr')"
          label-for="input-1"
        >
          <b-form-input
            v-model="params.MitsubishiProtocol.memoryAddr"
            type="text"
            required
            :placeholder="$t('profileMaker.description.memoryAddrPlaceholder')"
            @blur="memoryAddrOverlapValidate = false"
            @keydown="memoryAddrOverlapValidate = false"
          />
          <div
            v-if="isSubmit && !$v.params.MitsubishiProtocol.memoryAddr.required"
            class="app-validation"
          >
            {{ $t('Common.Message.Validate.required2', { field: $t('profileMaker.memoryAddr')}) }}
          </div>
          <div
            v-if="isSubmit && memoryAddrOverlapValidate"
            class="app-validation"
          >
            {{ $t('Common.Message.Validate.overlap2', { field: $t('profileMaker.memoryAddr')}) }}
          </div>
        </b-form-group>
        <b-form-group
          dev-comment="태그명"
          class="col-md-6 module-input-btn"
          :label="$t('profileMaker.tagName')"
          label-for="input-1"
        >
          <b-input-group class="input-wrap">
            <b-form-input
              v-model="params.MitsubishiProtocol.tagName"
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
          </b-input-group>
          <div
            v-if="isSubmit && !$v.params.MitsubishiProtocol.tagName.required"
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
    <b-card
      v-if="selectedDevice.requests"
      class="preprocessed-card content"
    >
      <b-card-title class="d-flex justify-content-between align-items-center">
        {{ $t('profileMaker.tagList') }}
        <div>
          <b-button-group size="sm">
            <b-button
              id="popover-3"
              :variant="button.variant.export"
              @click="excelImportClick"
            >
              {{ $t('button.excelUpload') }}
            </b-button>
            <b-popover
              target="popover-3"
              triggers="hover"
              style="width: 60px;"
            >
              <template
                slot="title"
              >
                {{ $t('common.excelUploadMsg') }}
              </template>
              <img
                :src="require('@/assets/images/ls-excelupload-img.png')"
                alt=""
                style="margin-bottom: 5px; margin-top: 5px;"
              >
              <p style="margin-top: 5px;">
                {{ $t('common.excelUploadText1') }}
                <strong class="text-danger">{{ $t('common.excelUploadText2') }}</strong>
                {{ $t('common.excelUploadText3') }}
              </p>
            </b-popover>
            <input
              ref="excelUpload"
              type="file"
              accept=".xlsx, .xls"
              hidden
              @input="handleClick"
            >
          </b-button-group>
          <b-button-group
            v-if="selectedDevice.requests.length > 0"
            size="sm"
          >
            <b-button
              dev-comment="수정완료/수정"
              :variant="`${button.variant.update} ml-1`"
              @click="onTagListEdit()"
            >
              {{ tagListEditStatus ? $t('button.editCompleteBtn'): $t('button.editBtn') }}
            </b-button>
          </b-button-group>
          <b-button-group
            v-if="selectedDevice.requests.length > 0"
            size="sm"
          >
            <b-button
              dev-comment="다운로드"
              :variant="`${button.variant.download} ml-1`"
              @click="excelExport"
            >
              <mdicon
                name="tray-arrow-down"
                :size="15"
              />
            </b-button>
          </b-button-group>
        </div>
      </b-card-title>
      <vue-good-table
        style-class="tableOne vgt-table"
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
          style="padding:20px;"
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
          <!-- <span v-else-if="props.column.field === 'memoryType' && tagListEditStatus">
            <b-form-select
              v-model="selectedDevice.requests[props.row.originalIndex].memoryType"
              dev-comment="메모리 타입"
              :options="memoryTypeList"
              value-field="name"
              text-field="name"
            />
          </span> -->
          <span v-else-if="props.column.field === 'memoryAddr' && tagListEditStatus">
            <b-form-input
              :ref="`${props.row.tagId}-memoryAddr`"
              v-model="selectedDevice.requests[props.row.originalIndex].memoryAddr"
              dev-comment="메모리 번지"
            />
            <div
              :ref="`${props.row.tagId}-memoryAddr-validation`"
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
import XLSX from 'xlsx'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'MitsubishiProtocolView',
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
        MitsubishiProtocol: {
          // memoryType: 'BIT',
          memoryAddr: '',
          tagName: ''
        }
      },
      tagNameOverlapValidate: false,
      memoryAddrOverlapValidate: false,
      // memoryTypeList: [{ name: 'BIT' }, { name: 'WORD' }],
      tagColumns: [
        // {
        //   label: this.$t('profileMaker.memoryType'),
        //   field: 'memoryType'
        // },
        {
          label: this.$t('profileMaker.memoryAddr'),
          field: 'memoryAddr'
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
      MitsubishiProtocol: {
        memoryAddr: { required },
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
      this.params.MitsubishiProtocol = {
        memoryAddr: '',
        tagName: ''
      }
    },
    rowStyleClassFn () {
      return 'profile-table-tr'
    },
    // checkNumber (str) { // 메모리 번지 입력 정규화식
    //   const regExp = /^[0-9]+$/g
    //   if (regExp.test(str)) {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    newTagAdd () {
      this.$v.$touch() // validateion 전체 체크
      this.isSubmit = true
      this.tagNameOverlapValidate = false
      this.memoryAddrOverlapValidate = false

      if (!this.$v.$invalid) { // validation 통과 시 submit 실행
        // 태그 리스트의 태그명 중복 check
        if (this.selectedDevice.requests.find(e => e.name === this.params.MitsubishiProtocol.tagName)) {
          this.tagNameOverlapValidate = true
        } else {
          this.tagNameOverlapValidate = false
        }

        // 태그 리스트의 메모리 번지 중복 check
        if (this.selectedDevice.requests.find(e => e.memoryAddr === this.params.MitsubishiProtocol.memoryAddr)) {
          this.memoryAddrOverlapValidate = true
        } else {
          this.memoryAddrOverlapValidate = false
        }

        const randomA = Math.floor(Math.random() * 10000)
        const randomB = Math.floor(Math.random() * 10000)

        if (this.tagNameOverlapValidate === false && this.memoryAddrOverlapValidate === false) {
          this.selectedDevice.requests.push({
            tagId: +new Date() + randomA + randomB,
            name: this.params.MitsubishiProtocol.tagName,
            // memoryType: this.params.MitsubishiProtocol.memoryType,
            memoryAddr: this.params.MitsubishiProtocol.memoryAddr
          })
          // this.isSubmit = false
          this.onDataInit()
          this.actProfileMakerTagListUpdateTypeChange(true)
        }
      } else {
        this.makeToastError({ code: 'FAIL', message: this.$t('modal.memoryAddrInputFormError'), status: 400 })
      }
    },
    removeTag (props) {
      this.selectedDevice.requests.splice(props.index, 1)
    },
    excelImportClick () {
      // 데이터 리셋 확인 모달창
      if (this.selectedDevice.requests.length > 0) {
        const h = this.$createElement
        const titleVNode = h('div', {
          domProps: {
            innerHTML: '<div style="color:black">' +
              this.$t('modal.resetConfirm') +
              this.$t('modal.resetConfirm2') +
              '</div>'
          }
          // domProps: {
          //   innerHTML: '<div style="color:black">' +
          //     this.$t('modal.resetConfirm') +
          //     '</div>' + '<div style="color:black">' +
          //     this.$t('modal.resetConfirm2') +
          //     '</div>'
          // }
        })

        const messageVNode = h('div', {
          domProps: {
            // innerHTML: '<p style="color:red">' +
            //   this.$t('modal.excelUploadComment') + this.$t('modal.excelUploadComment2') +
            //   '</p>'
            innerHTML: '<p style="color:red">' +
              this.$t('modal.excelUploadComment') + '</p>' + '<p style="color:red">' + '   ' + this.$t('modal.excelUploadComment2') +
              '</p>'
          }
        })

        this.$bvModal
          .msgBoxConfirm([messageVNode], {
            title: [titleVNode],
            size: 'xl',
            okTitle: this.$t('button.confirmBtn'),
            cancelTitle: this.$t('button.cancelBtn')
          }).then(async value => {
            if (value) {
              this.selectedDevice.requests = []
              this.$refs.excelUpload.click()
            }
          })
      } else {
        this.$refs.excelUpload.click()
      }
    },
    excelExport () { // excel 다운로드
      // tagId 컬럼 제거
      const exceptTagIdArr = this.selectedDevice.requests.map(p => {
        return {
          memoryAddr: p.memoryAddr,
          name: p.name
        }
      })
      const worksheet = XLSX.utils.json_to_sheet(exceptTagIdArr)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1')
      XLSX.utils.sheet_add_aoa(worksheet, [['Memory Address', 'Name']], { origin: 'A1' })
      XLSX.writeFile(workbook, 'ProfileList.xlsx')
    },
    handleClick (e) {
      if (e.target.files.length === 0) return
      const files = e.target.files
      // 업로드 파일 확장자 체크해서 excel파일 아닐 경우 토스트 에러
      if (files[0].name.includes('.xlsx' || '.xls')) {
        const rawFile = files[0]
        this.renderData(rawFile)
        this.$refs.excelUpload.value = null
      } else {
        this.makeToastError({ code: 'FAIL', message: this.$t('modal.readDataFail'), status: 400 })
      }
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
    renderData (rawFile) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = e => {
          if (e.target) {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'array' })
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]
            this.getResultRow(XLSX.utils.sheet_to_json(worksheet))
            resolve()
          }
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    // 데이터 컬럼 설정
    getResultRow (sheet) {
      const columns = {
        // memoryType: 'memorytype',
        memoryAddr: 'memoryaddress',
        name: 'name'
      }
      const { memoryAddr, name } = columns

      // 데이터 컬럼(' ', 대소문자)
      const columnData = sheet.map(p => {
        const makeColumn = {}
        for (const name in p) {
          makeColumn[name.toLowerCase().split(' ').reduce((p, q) => p + q)] = p[name]
        }
        return makeColumn
      })

      // tagId 중복으로 random 추가

      const sheetDataAfterValidation = columnData.filter(p => p[memoryAddr] && p[name]) // 빈값 체크
      const sheetData = sheetDataAfterValidation.map(p => {
        const randomA = Math.floor(Math.random() * 10000)
        const randomB = Math.floor(Math.random() * 10000)
        return {
          // memoryType: p[memoryType],
          memoryAddr: p[memoryAddr],
          tagId: +new Date() + randomA + randomB,
          name: p[name]
        }
      })

      // 빈값 필터, 중복 체크
      if (sheetData.length === sheet.length) {
        const uniqueTagNameArray = this.checkDuplicates(sheetData, 'name')
        const uniqueMemoryAddrArray = this.checkDuplicates(sheetData, 'memoryAddr')
        if (uniqueTagNameArray.length === 0 && uniqueMemoryAddrArray.length === 0) { // 중복값 없으면 패스
          if (sheetData.length > 0) {
            this.selectedDevice.requests = this.selectedDevice.requests.concat(sheetData)
            this.makeToastSuccess({ code: 'SUCCESS', message: this.$t('modal.readDataComplete'), status: 200 })
          } else { // 빈값 || 파일 형식 에러
            this.makeToastError({ code: 'FAIL', message: this.$t('modal.readDataFail'), status: 400 })
          }
        } else { // 중복값 존재
          this.makeToastError({ code: 'FAIL', message: this.$t('modal.readDataFailDuplicate'), status: 400 })
        }
      } else { // 기타 에러
        this.makeToastError({ code: 'FAIL', message: this.$t('modal.readDataFail'), status: 400 })
      }
    },
    onTagListEdit () {
      const tagList = this.selectedDevice.requests
      const memoryAddrEmptyArray = []
      const tagNameEmptyArray = []

      // 수정완료 버튼을 클릭 했을때 태그명이 중복된 값 & 메모리 번지 validation check
      if (this.tagListEditStatus === true) {
        const uniqueTagNameArray = this.checkDuplicates(tagList, 'name')
        const uniqueMemoryAddrArray = this.checkDuplicates(tagList, 'memoryAddr')

        // ref css 전체 초기화
        for (const x in tagList) {
          this.$refs[tagList[x].tagId + '-name'].$el.style.border = '1px solid #9CA3AF'
          this.$refs[tagList[x].tagId + '-name-validation'].innerText = ''
          this.$refs[tagList[x].tagId + '-memoryAddr'].$el.style.border = '1px solid #9CA3AF'
          this.$refs[tagList[x].tagId + '-memoryAddr-validation'].innerText = ''
        }

        // 메모리 번지 empty check
        for (const e in tagList) {
          if (tagList[e].memoryAddr === undefined || tagList[e].memoryAddr === null || tagList[e].memoryAddr === '') {
            memoryAddrEmptyArray.push(tagList[e].tagId)
          }
        }

        // 메모리 번지 empty일 경우 css 처리
        for (const e2 in memoryAddrEmptyArray) {
          this.$refs[memoryAddrEmptyArray[e2] + '-memoryAddr'].$el.style.border = '1px solid #F32424'
          this.$refs[memoryAddrEmptyArray[e2] + '-memoryAddr-validation'].innerText =
            this.$t('Common.Message.Validate.required1', { field: this.$t('profileMaker.memoryAddr') })
        }

        // 메모리 번지 empty 없을 경우 중복된 값 check
        if (memoryAddrEmptyArray.length === 0) {
          for (const e3 in uniqueMemoryAddrArray) {
            this.$refs[uniqueMemoryAddrArray[e3] + '-memoryAddr'].$el.style.border = '1px solid #F32424'
            this.$refs[uniqueMemoryAddrArray[e3] + '-memoryAddr-validation'].innerText =
            this.$t('Common.Message.Validate.overlap', { field: this.$t('profileMaker.memoryAddr') })
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
            // 메모리 번지 empty check
            if (tagList[t].name === undefined || tagList[t].name === null || tagList[t].name === '') {
              tagNameEmptyArray.push(tagList[t].tagId)
            }
          }

          // 메모리 번지 empty일 경우 css 처리
          for (const t2 in tagNameEmptyArray) {
            this.$refs[tagNameEmptyArray[t2] + '-name'].$el.style.border = '1px solid #F32424'
            this.$refs[tagNameEmptyArray[t2] + '-name-validation'].innerText =
            this.$t('Common.Message.Validate.required1', { field: this.$t('profileMaker.tagName') })
          }
        }

        if ((uniqueTagNameArray.length === 0 && tagNameEmptyArray.length === 0) &&
        (uniqueMemoryAddrArray.length === 0 && memoryAddrEmptyArray.length === 0)) {
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
div.vgt-wrap.polar-bear {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.remove-class {
  color: red;
}
</style>

