<template>
  <b-card
    class="project-wrap"
    style="height:79vh;"
    no-body
  >
    <b-row
      v-if="tab === -1 || tab === null"
      class="text-center h-100"
    >
      <b-col class="text-center my-auto">
        <p class="text-30 subheading mb-1">
          {{ $t("dataCollect.description.noProjectData") }}
        </p>
        <p class="text-muted text-15">
          {{ $t("dataCollect.description.noProjectSelectedData") }}
        </p>
      </b-col>
    </b-row>
    <b-card-text v-else>
      <div
        class="modeler-save"
      >
        <span
          v-b-tooltip.hover="{
            placement: 'auto',
            title: checkMenuAuth('authCreate') !== true
              ? $t('Common.Message.NoAuth.create') : $t('button.registerBtn')
          }"
        >
          <b-button-group
            class="mx-1"
            size="sm"
          >
            <b-button
              dev-comment="저장"
              :variant="`${button.variant.save} mx-1`"
              class="btn p-1 mr-1"
              :disabled="checkMenuAuth('authCreate') !== true"
              @mousedown.stop.prevent
              @click="clickSaveButton()"
            >
              {{ $t('button.saveBtn') }}
            </b-button>
          </b-button-group>
        </span>
      </div>
      <b-tabs
        v-model="tab"
        pills
        card
      >
        <b-tab
          v-for="(data, key) in openProjectList"
          :key="'dyn-tab-' + key"
          no-body
          @click="clickTab(data)"
        >
          <template #title>
            {{ data.name }}
            <!-- <b-badge
              href="#"
              :variant="button.variant.update"
              class="ml-1"
              @click.prevent.stop="dbClickTab()"
            >
              EDIT
            </b-badge> -->
            <span
              class="ul-btn__icon"
              style="margin-left: 7px"
            >
              <b-badge
                v-b-tooltip.hover="{
                  placement: 'top',
                  style: 'margin-left: 7px;',
                  title: checkMenuAuth('authUpdate') !== true
                    ? $t('Common.Message.NoAuth.update') : $t('button.editBtn')
                }"
                href="#"
                :variant="`${button.variant.update} sm ml-1`"
                @click.prevent.stop="checkMenuAuth('authUpdate') !== true
                  ? '' : dbClickTab(data)"
              >
                <!--:disabled="openProjectList[tab].name !== data.name"-->
                <mdicon
                  name="square-edit-outline"
                  :size="14"
                />
              </b-badge>
            </span>
            <b-badge
              href="#"
              variant="primary sm ml-1"
              @click.prevent.stop="removeTab(data.id)"
            >
              <mdicon
                name="close-thick"
                :size="14"
              />
            </b-badge>
          </template>
        </b-tab>
        <div
          style="overflow-y: auto;"
          class="drop-zone"
        >
          <div
            id="app"
            class="drop-zone"
            @drop="onDrop($event)"
            @dragover.prevent
            @dragenter.prevent
          >
            <flow-chart
              ref="chart"
              :width="selectedViewList[0] || selectedViewList[1] ? 934 : 1210"
              style="height:72.5vh;"
              :nodes="nodes"
              :connections="connections"
              @click="chartClick"
              @save="chartSave"
            >
              <!-- <template v-slot:append>
                <span
                  v-b-tooltip.hover="{
                    placement: 'auto',
                    title: checkMenuAuth('authCreate') !== true
                      ? $t('Common.Message.NoAuth.create') : $t('button.saveBtn')
                  }"
                >
                  <b-button
                    id="position"
                    dev-comment="저장"
                    :variant="button.variant.save"
                    size="sm"
                    class="unselectable"
                    :disabled="checkMenuAuth('authCreate') !== true"
                    @mousedown.stop.prevent
                    @click="clickSaveButton"
                  >
                    {{ $t('button.saveBtn') }}
                  </b-button>
                </span>
              </template> -->
            </flow-chart>
          </div>
        </div>
        <project-edit-view
          :dialog.sync="editDialogStatus"
          :selected-project="openProjectList[tab]"
          @clickSave="saveAPI"
        />
      </b-tabs>
    </b-card-text>
    <b-modal
      v-model="addProjectDialogStatus"
      centered
      no-close-on-backdrop
      no-close-on-esc
      :title="$t('button.projectRegisterBtn')"
    >
      <b-form
        @submit.prevent.stop=""
        @keyup.ctrl.enter="addProject"
      >
        <b-row>
          <b-form-group
            class="col-md-12"
            :label="$t('dataCollect.projectName')"
          >
            <b-form-input
              v-model="addProjectName"
              autofocus
              type="text"
              :placeholder="$t('dataCollect.description.projectName')"
            />
            <div
              v-if="isSubmit && !$v.addProjectName.required"
              class="app-validation"
            >
              {{ $t('Common.Message.Validate.required1', { field: $t('dataCollect.projectName')}) }}
            </div>
          </b-form-group>
        </b-row>
      </b-form>
      <template #modal-footer="{ cancel }">
        <b-button
          :variant="button.variant.cancel"
          size="sm"
          @click="[cancel(),isSubmit = false]"
        >
          {{ $t("button.cancelBtn") }}
        </b-button>
        <span
          v-b-tooltip.hover="{ placement: 'top', title: $t('Common.Message.submitKey') }"
        >
          <b-button
            :variant="button.variant.addNew"
            size="sm"
            @click.prevent="addProject"
          >
            {{ $t("button.registerBtn") }}
          </b-button>
        </span>
      </template>
    </b-modal>
    <edge-dialog
      :visible.sync="sendToEdgeVisible"
      @resetModal="restModal"
      @saveEdge="convertXML"
    />
    <read-from-server
      :read-from-server-dialog.sync="readFromServerVisible"
      :tab="tab"
      @saveReadFromServer="saveReadFromServer"
    />
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import EventBus from '@/lib/utils/event-bus'

import * as js2xmlparser from 'js2xmlparser'
import { xml2js } from 'xml-js'

import FlowChart from '@/components/flowChart'
import ProjectEditView from '@/views/app/dataCollect/opcuaModeler/components/project-edit-view.vue'
import { defaultXMLData } from '@/views/app/dataCollect/opcuaModeler/view-data'
import EdgeDialog from '@/views/app/dataCollect/opcuaModeler/components/edge-dialog'
import ReadFromServer from '@/views/app/dataCollect/opcuaModeler/components/read-from-server'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ViewModel',
  components: {
    EdgeDialog,
    FlowChart,
    ProjectEditView,
    ReadFromServer
  },
  mixins: [mixinUtil],
  props: {
    selectedViewList: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    nodes: [],
    connections: [],
    openProjectList: [],
    addProjectDialogStatus: false,
    addProjectName: null,
    tab: null,
    editDialogStatus: false,
    defaultXMLData,
    sendToEdgeVisible: false,
    readFromServerVisible: false,
    isSubmit: false
  }),
  computed: {
    ...mapGetters('OpcuaModeler', { infoData: 'OpcuaModelerData' }),
    ...mapGetters('OpcuaModeler', {
      infoResult: 'OpcuaModelerResult',
      insertedId: 'OpcuaModelerInsertedId',
      updatedCount: 'OpcuaModelerUpdatedCount',
      deletedCount: 'OpcuaModelerDeletedCount',
      serverReadCount: 'OpcuaModelerServerReadCount'
    })
  },
  watch: {
    insertedId (value) {
      // 등록 후 처리
      if (value !== null) {
        if (value < 0) {
          // 등록 실패
          this.makeToastError(this.infoResult) // 실패 시 메세지
        } else if (value > 0) {
          // 등록 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지
          // 1. 리스트 재 검색
          // this.formSubmit()
          this.$emit('refreshProjectList', value)
          this.addProjectDialogStatus = false
        }
      }
    },
    updatedCount (value) {
      // 업데이트 후 처리
      if (value !== null) {
        if (value < 0) {
          // 업데이트 실패
          this.makeToastError(this.infoResult) // 실패 시 메세지
        } else if (value === 0) {
          // 업데이트 된 항목 없음
          this.makeToastSuccess(
            this.infoResult,
            this.$t('Common.Message.Nodata.noupdate')
          )
        } else if (value > 0) {
          // 업데이트 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지
          this.$bvModal.hide('modal-modeler-editview')
          this.$emit('refreshProjectList', this.openProjectList[this.tab].id)
        }
      }
    },
    deletedCount (value) {
      if (value !== null) {
        if (value < 0) {
          // 삭제 실패
          this.makeToastError(this.infoResult) // 실패 시 메세지
        } else if (value === 0) {
          // 삭제 된 항목 없음
          this.makeToastSuccess(
            this.infoResult,
            this.$t('Common.Message.Nodata.noupdate')
          )
        } else if (value > 0) {
          // 삭제 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지

          this.$emit('refreshProjectList')
        }
      }
    }
  },
  validations: {
    addProjectName: {
      required
    }
  },
  mounted () {
    EventBus.$on('clickAddProject', this.openAddProjectDialog)
    EventBus.$on('clickProject', this.clickProject)
    EventBus.$on('convertXML', this.convertXML)
    EventBus.$on('clickXmlImport', this.clickXmlImport)
    EventBus.$on('clickRemoveProject', this.clickRemoveProject)
    EventBus.$on('sendToEdge', this.openSendToEdge)
    EventBus.$on('readFromServer', this.readFromServer)
  },
  beforeDestroy () {
    EventBus.$off('clickAddProject', this.openAddProjectDialog)
    EventBus.$off('clickProject', this.clickProject)
    EventBus.$off('convertXML', this.convertXML)
    EventBus.$off('clickXmlImport', this.clickXmlImport)
    EventBus.$off('sendToEdge', this.openSendToEdge)
    EventBus.$off('readFromServer', this.readFromServer)
  },
  methods: {
    ...mapActions('OpcuaModeler', [
      'actOpcuaModelerInsert',
      'actOpcuaModelerFileInsert',
      'actOpcuaModelerOpcServerInsert',
      'actOpcuaModelerEdgeServerInsert'
    ]),
    ...mapActions('OpcuaModeler', [
      'actOpcuaModelerUpdate',
      'actOpcuaModelerOpenUpdate'
    ]),
    ...mapActions('OpcuaModeler', [
      'actOpcuaModelerDelete',
      'actOpcuaModelerFileDelete'
    ]),
    async saveReadFromServer (nodes, connections, type) {
      if (type === 'new') {
        const params = {
          userId: this.$store.state.user.id,
          name: nodes[0].name,
          nodeSetXml: null,
          edgeId: null,
          nodes: nodes,
          connections: connections
        }
        this.actOpcuaModelerInsert(params)
      } else if (type === 'old') {
        this.nodes = nodes
        this.connections = connections
      }
      this.readFromServerVisible = false
    },
    readFromServer () {
      this.readFromServerVisible = !this.readFromServerVisible
    },
    openSendToEdge () {
      if (this.tab === null || this.tab === undefined || this.tab === -1) {
        this.$bvToast.toast(
          `${this.$t('dataCollect.modal.projectDialogDistribute')}`,
          {
            title: 'error',
            variant: 'danger',
            solid: true
          }
        )
        return
      }

      this.sendToEdgeVisible = !this.sendToEdgeVisible
    },
    restModal () {
      this.sendToEdgeVisible = false
    },
    async clickRemoveProject (item) {
      const params = {
        data: {
          id: item.id
        }
      }

      this.actOpcuaModelerDelete(params)

      if (this.openProjectList.find((e) => e.id === item.id)) {
        this.removeTab(item.id)
        EventBus.$emit('clickNode', null)
      }
    },
    async clickXmlImport (data, fileName) {
      const result = xml2js(data)

      // UA가 붙어있는 tag만 뽑아냄.
      const elements = result.elements[0].elements.filter(
        (e) => e.name.indexOf('UA') !== -1
      )

      /*
      - node 생성
      - tag attribute에 ns=1;s=0000 형식의 NodeId가 있어야 함 *0000은 숫자.
      - UA Tag 밑에 DisplayName이 있어야 함.
      - x,y는 좌표안에서의 random값
      */
      const nodes = elements.map((e) => {
        const name = e.elements.filter((e) => e.name === 'DisplayName')[0]
          .elements[0].text

        return {
          id: Number(e.attributes.NodeId.split('=')[2]),
          type: e.name.replace('UA', ''),
          name: name,
          x: Math.random() * 870,
          y: Math.random() * 720
        }
      })

      /*
      - tag attribute에 ns=1;s=0000 형식의 NodeId가 있어야 함 *0000은 숫자.
      - 현재는 attribute connection만 설정되어 있음.
      */
      const connections = []
      let connectionId = 1

      elements.map((e) => {
        const references = e.elements.find((e) => e.name === 'References')

        const source = {
          id: Number(e.attributes.NodeId.split('=')[2]),
          position: 'bottom'
        }

        if (references.elements) {
          const hasComponents = references.elements.filter(
            (e) => e.attributes.ReferenceType === 'HasComponent'
          )

          for (const hasComponent of hasComponents) {
            const destination = {
              id: Number(hasComponent.elements[0].text.split('=')[2]),
              position: 'bottom'
            }

            connections.push({
              source: source,
              id: connectionId++,
              destination: destination
            })
          }
        }
      })

      const params = {
        userId: this.$store.state.user.id,
        name: fileName.split('.')[0],
        nodeSetXml: null,
        edgeId: null,
        nodes: nodes,
        connections: connections
      }
      /**
       * @param record.insertedId
       */

      this.actOpcuaModelerInsert(params)
    },
    chartClick (node) {
      const connections = []
      if (node !== null) {
        this.$refs.chart.internalConnections.forEach((element) => {
          if (element.source.id === node.id) {
            connections.push(element)
          }
        })
      }
      EventBus.$emit('clickNode', node, connections)
    },
    async TagSettingCallChartSave (dataParams) {
      this.nodes = [...dataParams.nodes]
      this.connections = [...dataParams.connections]

      const insertNodes = dataParams.nodes.map((e) => {
        delete e.children
        delete e.parentId
        return e
      })

      const params = {
        id: dataParams.id,
        nodes: insertNodes,
        connections: dataParams.connections
      }
      await this.saveAPI(params)
      EventBus.$emit('clickNode', null)
    },

    async chartSave (nodes, connections) {
      this.nodes = [...nodes]
      this.connections = [...connections]

      const insertNodes = nodes.map((e) => {
        delete e.children
        delete e.parentId
        return e
      })

      const params = {
        id: this.openProjectList[this.tab].id,
        nodes: insertNodes,
        connections: connections
      }
      await this.saveAPI(params)
      EventBus.$emit('clickNode', null)
    },
    async saveAPI (params) {
      this.actOpcuaModelerUpdate(params)
      // tab 이름도 같이 변경 : update 되면서 tab 데이터는 변동 안되기 때문에 별도 데이터 전달
      if (params.name) {
        const selectedTab = this.openProjectList.findIndex(e => e.id === params.id)
        this.openProjectList[selectedTab].name = params.name
      }
      // await updateModelerProject(params).then(response => {
      //   if (response.data.data) {
      //     this.$bvToast.toast(`${this.$t('modal.saveMes')}`, {
      //       title: 'success',
      //       variant: 'success',
      //       solid: true
      //     })
      //     this.$emit('refreshProjectList', this.openProjectList[this.tab].id)
      //   } else {
      //     this.$bvToast.toast(`${this.$t('modal.saveDataError')}`, {
      //       title: 'error',
      //       variant: 'danger',
      //       solid: true
      //     })
      //   }
      // })
    },
    clickSaveButton () {
      this.$refs.chart.save()
    },
    clickProject (e) {
      if (!e) {
        return false
      }
      const data = JSON.parse(JSON.stringify(e))

      this.nodes = data.nodes || []
      this.connections = data.connections || []
      if (this.openProjectList.find((e) => e.id === data.id)) {
        this.tab = this.openProjectList.findIndex((e) => e.id === data.id)
      } else {
        this.openProjectList.push(data)
        setTimeout(() => (this.tab = this.openProjectList.length - 1), 10)
      }
      EventBus.$emit('clickNode', null)
    },
    dbClickTab (e) {
      // this.editDialogStatus = !this.editDialogStatus
      this.$bvModal.show('modal-modeler-editview')
      // project-edit-view 기존 name 바인딩
      EventBus.$emit('projectNameEdit', e)
      EventBus.$emit('clickNode', null)
    },
    clickTab (e) {
      const data = JSON.parse(JSON.stringify(e))
      this.nodes = data.nodes || []
      this.connections = data.connections || []
      EventBus.$emit('clickNode', null)
    },
    removeTab (id) {
      const idx = this.openProjectList.findIndex((e) => e.id === id)
      if (idx > -1) this.openProjectList.splice(idx, 1)

      // tab이 없는 경우
      if (this.openProjectList.length === 0) {
        this.nodes = []
        this.connections = []
      } else {
        this.tab = this.openProjectList.length - 1
        this.clickTab(this.openProjectList[this.tab])
      }
      EventBus.$emit('clickNode', null)
    },
    openAddProjectDialog () {
      this.addProjectDialogStatus = !this.addProjectDialogStatus
      this.addProjectName = null
      this.isSubmit = false
    },
    async addProject () {
      this.$v.$touch() // validateion 전체 체크
      this.isSubmit = true
      if (!this.$v.$invalid) { // validation 통과 시 submit 실행
        const params = {
          userId: this.$store.state.user.id,
          name: this.addProjectName,
          nodeSetXml: null,
          edgeId: null
        }
        this.actOpcuaModelerInsert(params)
        this.isSubmit = false
      }
    },
    async convertXML (usage, selectEdgeInfo) {
      // Project Validation Check
      if (this.tab === null || this.tab === undefined || this.tab === -1) {
        this.$bvToast.toast(`${this.$t('modal.noProjectSelectedData')}`, {
          title: 'error',
          variant: 'danger',
          solid: true
        })
        return
      }
      // Modeler Save
      await this.$refs.chart.save()
      // defaultXMLData Copy
      const jsonValue = Object.assign({}, this.defaultXMLData)
      // get Project Name
      const projectName = this.openProjectList[this.tab].name
      // Project 최상단 Tag 생성
      jsonValue.UAObject = [
        {
          '@': {
            NodeId: 'ns=1;s=5000',
            BrowseName: `1:${projectName}`
          },
          DisplayName: {
            '@': {
              Locale: '1'
            },
            '#': projectName
          },
          References: {
            Reference: [
              {
                '@': {
                  ReferenceType: 'Organizes',
                  IsForward: false
                },
                '#': 'i=85'
              },
              {
                '@': {
                  ReferenceType: 'HasTypeDefinition'
                },
                '#': projectName
              }
            ]
          }
        }
      ]
      // 최상위 아래 1Level HasComponent Insert
      let tempNodes = null
      const rootNodes = JSON.parse(JSON.stringify(this.nodes))

      for (const connection of this.connections) {
        tempNodes = rootNodes.filter((x) => x.id === connection.destination.id)
        rootNodes.splice(rootNodes.indexOf(tempNodes[0]), 1)
      }
      // 찾은 Node HasComponent Insert
      for (const rootNode of rootNodes) {
        const hasComponent = [
          {
            '@': {
              ReferenceType: 'HasComponent'
            },
            '#': `ns=1;s=500${rootNode.id}`
          }
        ]
        jsonValue.UAObject[0].References.Reference.push(hasComponent)
      }
      // node Insert
      for (const node of this.nodes) {
        // 자식 Node를 찾기위한 Connections Filter
        const filterConnections = this.connections.filter(
          (e) => e.source.id === node.id
        )
        // HasTypeDefinition Insert
        const reference = []
        // 자식 Node Insert
        for (const connection of filterConnections) {
          reference.push({
            '@': {
              ReferenceType: connection.type
            },
            '#': `ns=1;s=500${connection.destination.id}`
          })
        }
        // find HasTypeDefinition
        const findHasTypeDefinition = reference.find(
          (e) => e && e['@'].ReferenceType === 'HasTypeDefinition'
        )
        // HasTypeDefinition 기본 바인딩 (없는 Node)
        if (!findHasTypeDefinition && !node.name.includes('Type')) {
          reference.push({
            '@': {
              ReferenceType: 'HasTypeDefinition'
            },
            '#': 'i=58' // TODO: NodeClass마다 기본 타입 바인딩 필요.
          })
        }
        // Node Insert
        if (!jsonValue[`UA${node.type}`]) jsonValue[`UA${node.type}`] = []
        jsonValue[`UA${node.type}`].push({
          '@': {
            NodeId: `ns=1;s=500${node.id}`,
            BrowseName: `1:${node.name}`,
            AccessLevel: '3'
          },
          DisplayName: node.name,
          References: {
            Reference: reference
          }
        })
      }

      const output = js2xmlparser.parse('UANodeSet', jsonValue)

      if (usage === 'send') {
        const param = {
          id: this.openProjectList[this.tab].id, // 현재 프로젝트 id
          userId: this.$store.state.user.id,
          nodeSetXml: output
        }

        this.actOpcuaModelerOpcServerInsert(param)
        // opc server 에서 어떻게 수신 받는지 알아야함 (이후윤 프로가 알려주기로 함)
        // await createModelerProjectOpcserver(param).then(response => {
        //   if (response.data.data) {
        //     this.$bvToast.toast(`${this.$t('dataCollect.modal.addressSpaceUpdate')}`, {
        //       title: 'success',
        //       variant: 'info',
        //       solid: true
        //     })
        //   } else {
        //     this.$bvToast.toast('OPC Server Error', {
        //       title: 'error',
        //       variant: 'danger',
        //       solid: true
        //     })
        //   }
        // })
      } else if (usage === 'download') {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(output, 'text/xml')

        console.dirxml(xmlDoc)

        const filename = 'newNodel.xml'
        const pom = document.createElement('a')
        const bb = new Blob([output], { type: 'text/plain' })

        pom.setAttribute('href', window.URL.createObjectURL(bb))
        pom.setAttribute('download', filename)

        pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(
          ':'
        )
        pom.draggable = true
        pom.classList.add('dragout')

        pom.click()
      } else if (usage === 'sendToEdge') {
        const param = {
          projectId: this.openProjectList[this.tab].id, // 현재 프로젝트 id
          edgeId: selectEdgeInfo.id,
          nodeSetXml: output
        }

        this.actOpcuaModelerEdgeServerInsert(param)
        // await createModelerProjectEdgeServer(param).then(response => {
        //   if (response.data.data) {
        //     this.$bvToast.toast(`[${selectEdgeInfo.serialNum}]
        //     ${this.$t('dataCollect.modal.edgeTo')}
        //     [${this.openProjectList[this.tab].name}]
        //     ${this.$t('dataCollect.modal.projectDistributeSuccess')}`, {
        //       title: 'success',
        //       variant: 'info',
        //       solid: true
        //     })
        //     this.sendToEdgeVisible = false
        //   } else {
        //     this.$bvToast.toast(`${this.$t('dataCollect.modal.distributeFail')}`, {
        //       title: 'error',
        //       variant: 'danger',
        //       solid: true
        //     })
        //   }
        // })
      }
    },
    addNode (position) {
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: position.type,
        type: position.type,
        approvers: []
      })
    },
    onDrop (evt) {
      const dropData = JSON.parse(evt.dataTransfer.getData('data'))

      if (dropData.type === 'information') {
        const position = {
          x: evt.pageX - 410,
          y: evt.pageY - 145,
          type: dropData.name
        }
        if (position.type !== 'Types') this.addNode(position)
      } else {
        if (dropData.nodes) {
          for (const node of dropData.nodes) {
            if (this.nodes.find((e) => e.id === node.id)) {
              this.$bvToast.toast(
                `${this.$t('dataCollect.modal.noFirstDataGet')}`,
                {
                  title: 'error',
                  variant: 'danger',
                  solid: true
                }
              )
              return
            }
          }

          const h = this.$createElement
          const titleVNode = h('div', {
            domProps: {
              innerHTML: `[${dropData.name}] ${this.$t(
                'dataCollect.modal.projectModelDataGet'
              )}`
            }
          })
          const messageVNode = h('div', {
            domProps: {
              innerHTML:
                '<span style="color:red">※ ' +
                this.$t('dataCollect.modal.noSaveDataDelete') +
                '<span>'
            }
          })

          this.$bvModal
            .msgBoxConfirm([messageVNode], {
              title: [titleVNode],
              size: 'xl',
              okTitle: this.$t('button.getBtn'),
              cancelTitle: this.$t('button.cancelBtn')
            })
            .then(async (value) => {
              if (value) {
                if (dropData.nodes) {
                  this.nodes = this.nodes.concat(dropData.nodes)
                }
                if (dropData.connections) {
                  this.connections = this.connections.concat(
                    dropData.connections
                  )
                }
              }
            })
        }
      }
    }
  }
}
</script>

<style>
.tab-content {
  /* Todo: 다른방식으로 변경 */
  padding: unset;
}
.app-validation {
  color: #FF5252;
  font-size: 11px;
}

.modeler-save {
  position: absolute;
  width: 100%;
  display: flex;
  flex-flow: row-reverse;
  align-items: flex-end;
  align-content: flex-end;
}
</style>
