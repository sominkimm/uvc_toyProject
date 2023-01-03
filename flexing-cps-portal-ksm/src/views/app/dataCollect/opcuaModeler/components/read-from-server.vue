<template>
  <b-modal
    v-model="readFromServerDialog"
    size="huge"
    centered
    :title="$t('dataCollect.readFromServerDialog')"
    body-class="p-0"
    no-close-on-backdrop
    no-close-on-esc
  >
    <vue-perfect-scrollbar
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
      class="customizer-body ps rtl-ps-none"
    >
      <b-form
        class="p-3"
        style="max-height: 70vh"
        @submit.prevent.stop=""
      >
        <b-row>
          <b-form-group
            class="col-md-12"
            label="SERVER URL"
          >
            <b-input-group>
              <b-form-input
                v-model="serverUrl"
                type="text"
                :placeholder="$t('dataCollect.description.serverUrl')"
              />
              <b-input-group-append>
                <b-button
                  dev-comment="Server에 연결하기"
                  :variant="button.variant.connect"
                  size="sm"
                  @click="connectServer"
                >
                  {{ $t('button.serverConnectBtn') }}
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-row>
        <b-row>
          <b-form-group
            class="col-md-7"
            label="Project"
          >
            <b-card class="mb-1">
              <b-row
                v-if="treeArray.length === 0 && fetched"
                class="text-center h-100"
              >
                <b-col class="text-center my-auto">
                  <p class="text-30 subheading mb-0">
                    데이터가 없습니다.
                  </p>
                </b-col>
              </b-row>
              <loading
                :ready="fetched"
                :style="fetched ? '' : 'margin-bottom: 28px'"
              />
              <v-jstree
                v-if="treeArray.length > 0"
                ref="tree"
                :key="refreshKey"
                :data="treeArray"
                allow-batch
                text-field-name="browseName"
                @item-click="nodeClick"
              />
            </b-card>
          </b-form-group>
          <b-form-group
            class="col-md-5"
            label="Property"
          >
            <b-card
              class="mb-1"
              :class="selectNode ? 'p-2' : ''"
              :no-body="selectNode !== null"
            >
              <b-row
                v-if="!selectNode"
                class="text-center h-100"
              >
                <b-col class="text-center my-auto">
                  <p class="text-30 subheading mb-0">
                    No property
                  </p>
                </b-col>
              </b-row>
              <vue-good-table
                v-if="selectNode"
                max-height="52vh"
                :columns="columns"
                style-class="tableOne vgt-table"
                :rows="property"
              />
            </b-card>
          </b-form-group>
        </b-row>
      </b-form>
    </vue-perfect-scrollbar>
    <template #modal-footer>
      <b-button
        :variant="button.variant.cancel"
        size="sm"
        @click="$emit('update:readFromServerDialog', false)"
      >
        {{ $t('button.cancelBtn') }}
      </b-button>
      <b-button
        v-show="tab !== null && tab !== undefined && tab !== -1"
        :variant="button.variant.save"
        size="sm"
        @click="saveProject('old')"
      >
        기존 프로젝트에 모델러 덮어쓰기
      </b-button>
      <b-button
        dev-comment="모델러 생성하기"
        :variant="button.variant.addNew"
        size="sm"
        @click="saveProject('new')"
      >
        {{ $t('button.modelerCreateBtn') }}
      </b-button>
    </template>
  </b-modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import mixinUtil from '@/lib/utils/mixinUtil'

// import { readOpcServer } from '@/lib/api/opcuaModeler'
import Loading from '@/components/loading/index.vue'

import VJstree from 'vue-jstree'

export default {
  name: 'ReadFromServer',
  components: { VJstree, Loading },
  mixins: [mixinUtil],
  props: {
    readFromServerDialog: {
      type: Boolean,
      default: false
    },
    tab: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      serverUrl: 'opc.tcp://220.90.129.98:62721',
      treeArray: [],
      fetched: true,
      refreshKey: 0,
      selectNode: null,
      flatArray: [],
      property: [],
      columns: [
        {
          label: 'Attribute',
          field: 'attribute'
        },
        {
          label: 'Value',
          field: 'value'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('OpcuaModeler', { infoData: 'OpcuaModelerData' }),
    ...mapGetters('OpcuaModeler', {
      serverReadCount: 'OpcuaModelerServerReadCount'
    })
  },
  watch: {
    serverReadCount (value) {
      // opcuaModeler 에서만 사용하는 임시값 - 기존 로직 유지 위해 사용
      // todo: 추후 리팩토링때 중복된 코드 등 처리할것
      if (value !== null) {
        if (value < 0) { //  실패
          // this.makeToastError(this.infoResult) // 실패 시 메세지
          this.makeToastError(this.infoData) // 실패 시 메세지
          if (this.infoData.opcServerType === 'connectServer') {
            this.fetched = true
          }
        } else if (value > 0) { //  성공
          // this.makeToastSuccess(this.infoResult) // 성공 시 메세지
          this.makeToastSuccess(this.infoData) // 성공 시 메세지
          if (this.infoData.opcServerType === 'connectServer') {
            this.formatConnectServer(this.infoData.opcServer)
          } else {
            this.formatSaveServer(this.infoData.opcServer)
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('OpcuaModeler', ['actOpcuaModelerOpcServerInfo']),
    async nodeClick (node, item) {
      this.selectNode = item
      this.property = [
        {
          attribute: 'nodeId',
          value: this.selectNode.nodeId
        },
        {
          attribute: 'browseName',
          value: this.selectNode.browseName
        },
        {
          attribute: 'typeDefinition',
          value: this.selectNode.typeDefinition
        },
        {
          attribute: 'dataType',
          value: this.selectNode.dataValue
            ? this.selectNode.dataValue.value.dataType
            : null
        },
        {
          attribute: ' dataValue',
          value: this.selectNode.dataValue
            ? this.selectNode.dataValue.value.value
            : null
        }
      ]
    },
    async saveProject (type) {
      if (!this.selectNode) {
        this.$bvToast.toast('노드를 선택해주세요.', {
          title: 'error',
          variant: 'danger',
          solid: true
        })
        return
      }

      const params = {
        url: this.serverUrl,
        nodeId: this.selectNode.nodeId,
        type
      }

      // TODO: return 값이 불명확함 (성공 데이터를 리턴 받았는데 data 값이 없으면 오류라고 표시 )
      // 생성하기인데 왜 get? 서버 데이터 불러와야 해서
      this.actOpcuaModelerOpcServerInfo(params)
      // await readOpcServer(params).then(response => {
      //   if (response.data.data) {
      //     this.$bvToast.toast(`${this.$t('modal.readOpcServer')}`, {
      //       title: 'success.',
      //       variant: 'success',
      //       solid: true
      //     })
      //     let jsonData = JSON.stringify(response.data.data)

      //     jsonData = jsonData.replace(
      //       /organizes|hasComponent|hasProperty/g,
      //       'children'
      //     )
      //     const objData = JSON.parse(jsonData)

      //     const treeData = { children: [objData] }

      //     this.flatArray = []

      //     const flatten = (children, extractChildren, level, parent) =>
      //       Array.prototype.concat.apply(
      //         children.map(x => ({
      //           ...x,
      //           level: level || 1,
      //           parent: parent || null,
      //           id: Number(x.nodeId.split('=')[2]),
      //           type: 'Object',
      //           name: x.browseName,
      //           y: level === 1 || !level ? 40 : (level - 1) * 100 + 40
      //         })),

      //         children.map(x =>
      //           flatten(
      //             extractChildren(x) || [],
      //             extractChildren,
      //             (level || 1) + 1,
      //             Number(x.nodeId.split('=')[2])
      //           )
      //         )
      //       )

      //     const extractChildren = x => x.children
      //     const nodes = flatten(extractChildren(treeData), extractChildren).map(
      //       x => delete x.children && x
      //     )

      //     if (nodes.length > 30) {
      //       this.$bvToast.toast(
      //         '노드의 개수가 30개 초과인 프로젝트는 생성할 수 없습니다.',
      //         {
      //           title: 'error',
      //           variant: 'danger',
      //           solid: true
      //         }
      //       )
      //       return
      //     }

      //     let count = 0
      //     let level = 1

      //     nodes.sort(function (a, b) {
      //       return a.level - b.level
      //     })

      //     for (const node of nodes) {
      //       if (node.level !== level) {
      //         count = 0
      //         level = node.level
      //       }

      //       node.x = count * 130 + 20
      //       count++
      //     }

      //     const connections = []

      //     for (const node of nodes) {
      //       if (node.parent) {
      //         connections.push({
      //           destination: {
      //             id: node.id,
      //             position: 'top'
      //           },
      //           source: {
      //             id: node.parent,
      //             position: 'bottom'
      //           },
      //           type: 'HasComponent'
      //         })
      //       }
      //     }
      //     this.$emit('saveReadFromServer', nodes, connections, type)
      //   } else {
      //     this.$bvToast.toast(`${this.$t('modal.readFromServerError')}`, {
      //       title: 'error',
      //       variant: 'danger',
      //       solid: true
      //     })
      //   }
      // })
    },
    async connectServer () {
      const params = {
        url: this.serverUrl,
        nodeId: 'ns=0;i=84',
        type: 'connectServer'
        // nodeId: 'ns=2;i=138'
      }
      this.treeArray = []
      this.fetched = false

      // TODO: return 값이 불명확함 (성공 데이터를 리턴 받았는데 data 값이 없으면 오류라고 표시 )
      this.actOpcuaModelerOpcServerInfo(params)
      // await readOpcServer(params).then(response => {
      //   if (response.data.data) {
      //     this.$bvToast.toast(`${this.$t('modal.readOpcServer')}`, {
      //       title: 'success.',
      //       variant: 'success',
      //       solid: true
      //     })

      //     let jsonData = JSON.stringify(response.data.data)

      //     jsonData = jsonData.replace(
      //       /organizes|hasComponent|hasProperty/g,
      //       'children'
      //     )

      //     const objData = JSON.parse(jsonData)

      //     this.treeArray.push(objData)

      //     this.fetched = true
      //     this.refreshKey++
      //   } else {
      //     this.$bvToast.toast(`${this.$t('modal.readFromServerError')}`, {
      //       title: 'error',
      //       variant: 'danger',
      //       solid: true
      //     })
      //     this.fetched = true
      //   }
      // })
    },
    formatSaveServer (val) {
      let jsonData = JSON.stringify(val)

      jsonData = jsonData.replace(
        /organizes|hasComponent|hasProperty/g,
        'children'
      )
      const objData = JSON.parse(jsonData)

      const treeData = { children: [objData] }

      this.flatArray = []

      const flatten = (children, extractChildren, level, parent) =>
        Array.prototype.concat.apply(
          children.map(x => ({
            ...x,
            level: level || 1,
            parent: parent || null,
            id: Number(x.nodeId.split('=')[2]),
            type: 'Object',
            name: x.browseName,
            y: level === 1 || !level ? 40 : (level - 1) * 100 + 40
          })),

          children.map(x =>
            flatten(
              extractChildren(x) || [],
              extractChildren,
              (level || 1) + 1,
              Number(x.nodeId.split('=')[2])
            )
          )
        )

      const extractChildren = x => x.children
      const nodes = flatten(extractChildren(treeData), extractChildren).map(
        x => delete x.children && x
      )

      if (nodes.length > 30) {
        this.$bvToast.toast(
          '노드의 개수가 30개 초과인 프로젝트는 생성할 수 없습니다.',
          {
            title: 'error',
            variant: 'danger',
            solid: true
          }
        )
        return
      }

      let count = 0
      let level = 1

      nodes.sort(function (a, b) {
        return a.level - b.level
      })

      for (const node of nodes) {
        if (node.level !== level) {
          count = 0
          level = node.level
        }

        node.x = count * 130 + 20
        count++
      }

      const connections = []

      for (const node of nodes) {
        if (node.parent) {
          connections.push({
            destination: {
              id: node.id,
              position: 'top'
            },
            source: {
              id: node.parent,
              position: 'bottom'
            },
            type: 'HasComponent'
          })
        }
      }

      this.$emit('saveReadFromServer', nodes, connections, this.infoData.opcServerType)
    },
    formatConnectServer (val) {
      let jsonData = JSON.stringify(val)
      jsonData = jsonData.replace(
        /organizes|hasComponent|hasProperty/g,
        'children'
      )

      const objData = JSON.parse(jsonData)

      this.treeArray.push(objData)

      this.fetched = true
      this.refreshKey++
    }
  }
}
</script>

<style>
.modal .modal-huge {
  max-width: 100%;
  width: 80vw;
}
</style>
