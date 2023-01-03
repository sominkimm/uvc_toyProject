<template>
  <loading :ready="fetched"> 
    <template v-slot:contents>
      <b-container
        class="main-content modeler-wrap"
        :fluid="true"
      >
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="12" 
          >
            <div
               class="modeler-topbar"
            >
              
                <div class="view-change">
                  <button type="button" class="active">Modeling</button>
                  <button type="button">Tag Setting </button>
                </div>

                <div class="right">
                  <ul class="modeler-nav">
                    <li><button type="button" class="active">Read From Server</button></li>
                    <li><button type="button">Send to Edge</button></li>
                    <li><button type="button">Send to Server</button></li>
                    <li><button type="button">XML Import</button></li>
                    <li><button type="button">XML Download</button></li>
                    <li><button type="button">Add Project</button></li> 
                  </ul>
                  <ul class="modeler-view-toggle">
                    <li>
                      <button type="button" data-toggle="info"><span class="blind">Info</span></button>
                    </li>
                    <li>
                      <button type="button" data-toggle="project"><span class="blind">Project</span></button>
                    </li>
                  </ul>
                </div>
            </div>

            <div class="test">   
                <b-nav>
                  <b-navbar-nav class="ml-auto">
                    <b-button-toolbar>
                      <div v-if="mainViewItem === 0">
                        <!-- FC-733 -->
                        <!-- <b-button-group
                          size="sm"
                        >
                          <b-button
                            variant="outline-primary mx-1"
                            @click="readFromServer"
                          >
                            Read From Server
                          </b-button>
                        </b-button-group> -->
                        <b-button-group size="sm">
                          <b-button
                            variant="outline-primary mx-1"
                            @click="sendToEdge"
                          >
                            Send to Edge
                          </b-button>
                        </b-button-group>
                        <!-- <b-button-group
                          size="sm"
                        >
                          <b-button
                            variant="outline-primary mx-1"
                            @click="sendToServer"
                          >
                            Send to Server
                          </b-button>
                        </b-button-group> -->
                        <b-button-group
                          size="sm"
                        >
                          <b-button
                            variant="outline-primary mx-1"
                            @click="clickXMLImport"
                          >
                            XML Import
                          </b-button>
                        </b-button-group>
                        <b-button-group
                          size="sm"
                        >
                          <b-button
                            variant="outline-primary mx-1"
                            @click="clickXmlDownload"
                          >
                            XML Download
                          </b-button>
                        </b-button-group>
                        <b-button-group
                          size="sm"
                        >
                          <span
                            v-b-tooltip.hover="{
                              placement: 'auto',
                              title: checkMenuAuth('authCreate') !== true
                                ? $t('Common.Message.NoAuth.create') : $t('button.registerBtn')
                            }"
                          >
                            <b-button
                              variant="outline-primary mx-1"
                              class="btn p-1 mr-1"
                              :disabled="checkMenuAuth('authCreate') !== true"
                              @click="clickAddProject"
                            >
                              Add Project
                            </b-button>
                          </span>
                        </b-button-group>
                        <input
                          ref="uploader"
                          class="d-none"
                          type="file"
                          accept=".xml"
                          @change="onFileChanged"
                        >
                      </div>
                      <b-button-group
                        class="mx-1"
                        size="sm"
                      >
                        <b-button
                          v-for="(btn, key) in viewList"
                          :key="key"
                          v-b-tooltip.hover
                          :title="btn.title"
                          :pressed.sync="btn.state"
                          variant="outline-primary"
                          :class="key === 0 ? 'mr-1' : ''"
                        >
                          <i
                            :class="`fa fa-${btn.icon}`"
                          />
                        </b-button>
                      </b-button-group>
                      <b-button-group
                        class="ml-1"
                        size="sm"
                      >
                        <b-button
                          v-for="(btn, key) in mainViewItems"
                          :key="key"
                          :variant="mainViewItem === key ? 'primary' : 'outline-primary'"
                          @click="mainViewItem = key"
                        >
                          {{ btn.title }}
                        </b-button>
                      </b-button-group>
                    </b-button-toolbar>
                  </b-navbar-nav>
                </b-nav>
                
            </div>
            <b-row
              v-if="mainViewItem === 0"
              class="modeler-contents-wrap"
            >
              <b-col
                v-show="selectedViewList[0] || selectedViewList[1]"
                lg="2"
                md="12"
                sm="12"
                class="tree-wrap"
              >
                <b-row>
                  <b-col
                    v-show="selectedViewList[0]"
                    cols="12"
                  >
                    <information-view :selected-view-list="selectedViewList" />
                  </b-col>
                  <b-col v-show="selectedViewList[1]">
                    <project-view
                      ref="tree"
                      :selected-view-list="selectedViewList"
                      :tree-array="projectList"
                    />
                  </b-col>
                </b-row>
              </b-col>

              <view-model
                :selected-view-list="selectedViewList"
                @refreshProjectList="formSubmit"
              />
              <attribute-view />

              <!-- 기존 프로젝트 창 숨김
              <b-col
                :lg="selectedViewList[0] || selectedViewList[1] ? 7 : 9"
                md="12"
                sm="12"
                class="project-wrap"
              >
                <view-model
                  :selected-view-list="selectedViewList"
                  @refreshProjectList="formSubmit"
                />
              </b-col>
             -->
              <!-- 기존 노드창 숨김
              <b-col
                lg="3"
                md="12"
                sm="12"
                class="node-wrap"
              >
                <attribute-view />
              </b-col>
              -->
            </b-row>
            <b-row
              v-if="mainViewItem !== 0"
              class="modeler-contents-wrap"
            >
              <b-col
                lg="2"
                md="12"
                sm="12"
                class="tree-wrap"
              >
                <project-view
                  :selected-view-list="[false, true]"
                  :tree-array="projectList"
                />
              </b-col>
              <b-col
                lg="10"
                md="12"
                sm="12"
                class="project-wrap"
              >
                <tag-setting-view @refreshProjectList="formSubmit" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </loading>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'

import EventBus from '@/lib/utils/event-bus'

import Loading from '@/components/loading/index.vue'
import InformationView from '@/views/app/dataCollect/opcuaModeler/components/information-model.vue'
import ProjectView from '@/views/app/dataCollect/opcuaModeler/components/project-view.vue'
import ViewModel from '@/views/app/dataCollect/opcuaModeler/components/view-model.vue'
import AttributeView from '@/views/app/dataCollect/opcuaModeler/components/attribute-view.vue'
import TagSettingView from '@/views/app/dataCollect/opcuaModeler/components/tag-setting-view.vue'

export default {
  name: 'Modeling',
  components: {
    Loading,
    InformationView,
    ProjectView,
    ViewModel,
    AttributeView,
    TagSettingView
  },
  mixins: [mixinUtil],
  data: () => ({
    mainViewItem: 0,
    mainViewItems: [
      {
        title: 'Modeling View',
        icon: 'call_split'
      },
      {
        title: 'Tag Setting View',
        icon: 'bookmark'
      }
    ],
    viewList: [
      {
        title: 'Information View',
        subtitle: 'I',
        icon: 'info',
        action: 'ctrl+i',
        state: true
      },
      {
        title: 'Project View',
        subtitle: 'P',
        icon: 'list',
        action: 'ctrl+p',
        state: true
      }
    ],
    treeArray: null,
    fetched: false,
    projectList: []
  }),
  computed: {
    ...mapGetters('OpcuaModeler', { insertedId: 'OpcuaModelerInsertedId' }),
    ...mapGetters('OpcuaModeler', {
      listCount: 'OpcuaModelerListCount',
      listRows: 'OpcuaModelerListRows',
      loading: 'OpcuaModelerListLoading',
      listResult: 'OpcuaModelerListResult',
      infoOpen: 'OpcuaModelerOpen'
    }),
    ...mapGetters('Current', { currUser: 'CurrUser', currLocation: 'CurrLocation' }),
    selectedViewList () {
      return this.viewList.map(btn => btn.state)
    },
    dataRows () {
      return this.listRows
    }
  },
  watch: {
    loading (value) {
      if (value === false) {
        this.projectList = this.formatterRows(this.dataRows)
        this.$refs.tree.initializeData(this.projectList)
      }
    }
  },
  created () {
    if (this.checkMenuAuth('authMenu') !== true) {
      this.$router.push({ name: 'notPermission' })
    } else {
      this.formSubmit()
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keydownHandler)
  },
  methods: {
    ...mapActions('OpcuaModeler', ['actOpcuaModelerList']),
    formSubmit (insertedId) {
      // this.$store.state.user.id
      this.actOpcuaModelerList(this.currUser.id)
      this.fetched = true
      this.mainViewItem = 0

      if (insertedId) { // 뭐에 쓰는거고?
        EventBus.$emit(
          'clickProject',
          this.treeArray.filter(e => e.id === insertedId)[0]
        )
      }
    },
    formatterRows (rows) {
      for (const project of rows) {
        // icon, disabled 설정
        if (project.nodes) {
          project.nodes.map(e => {
            e.disabled = true
            if (e.type === 'Object') {
              e.icon = 'fa fa-cube'
            } else if (e.type === 'Variable') {
              e.icon = 'fa fa-tag'
            } else if (e.type === 'Method') {
              e.icon = 'fa fa-angle-double-left '
            } else if (e.type === 'View') {
              e.icon = 'fa fa-eye'
            } else if (e.type.includes('Type')) {
              e.icon = 'fa fa-file-text'
            }
          })
        }

        // project 하위에 object children 생성
        project.children = [
          {
            id: +new Date() + project.id,
            name: 'Objects',
            children: [],
            disabled: true
          },
          {
            id: +new Date() + project.id + 1,
            name: 'Types',
            children: [],
            disabled: true
          }
        ]
        // connetion에 있는 정보를 가지고 parentId 부여
        for (const connection of project.connections || []) {
          const nodeIndex = project.nodes.findIndex(
            e => e.id === connection.destination.id
          )
          project.nodes[nodeIndex].parentId = connection.source.id
        }
        // treeList 변환
        const list = project.nodes || []
        let node
        let i
        const map = {}
        const roots = []
        for (i = 0; i < list.length; i += 1) {
          map[list[i].id] = i
          list[i].children = []
        }
        for (i = 0; i < list.length; i += 1) {
          node = list[i]
          if (node.parentId) {
            list[map[node.parentId]].children.push(node)
          } else {
            roots.push(node)
          }
        }
        const objectNodes = JSON.parse(JSON.stringify(roots))

        // project 하위에 treeList 삽입
        // Objects 구성
        this.removeTypeNode(objectNodes)
        project.children[0].children = objectNodes

        // types 구성
        let typeNodes = this.findTypeNodes(JSON.parse(JSON.stringify(roots)))

        if (typeNodes) {
          this.removeTypeNode(typeNodes)
        } else {
          typeNodes = []
        }
        project.children[1].children = typeNodes
      }
      return rows
    },
    clickXmlDownload () {
      EventBus.$emit('convertXML', 'download')
    },
    clickXMLImport () {
      this.$refs.uploader.click()
    },
    onFileChanged () {
      const file = this.$refs.uploader.files[0]

      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = evt => {
        EventBus.$emit('clickXmlImport', evt.target.result, file.name)
      }
      reader.onerror = evt => {
        console.error(evt)
      }
    },
    readFromServer () {
      EventBus.$emit('readFromServer')
    },
    sendToEdge () {
      EventBus.$emit('sendToEdge')
    },
    sendToServer () {
      EventBus.$emit('convertXML', 'send')
    },
    clickAddProject () {
      EventBus.$emit('clickAddProject')
    },
    keydownHandler (event) {
      if (
        (event.ctrlKey && event.key === 'i') ||
          (event.ctrlKey && event.key === 'I')
      ) {
        this.viewList[0].state = !this.viewList[0].state
        event.preventDefault()
      }
      if (
        (event.ctrlKey && event.key === 'p') ||
          (event.ctrlKey && event.key === 'P')
      ) {
        this.viewList[1].state = !this.viewList[1].state
        event.preventDefault()
      }
    },
    findTypeNodes (items, findTypeNodes) {
      if (!findTypeNodes) findTypeNodes = []

      return items.reduce((acc, item) => {
        if (item.type.includes('Type')) {
          findTypeNodes.push(JSON.parse(JSON.stringify(item)))
        }

        if (item.children.length === 0) {
          return findTypeNodes
        }

        if (item.children) {
          return this.findTypeNodes(item.children, findTypeNodes)
        }
        return findTypeNodes
      }, null)
    },
    removeTypeNode (items) {
      return items.reduce((acc, item) => {
        item.children.map(e => {
          const index = item.children.findIndex(item => item.id === e.id)
          if (e.type.includes('Type')) {
            for (const ite of item.children[index].children) {
              item.children.push(ite)
            }
            item.children.splice(index, 1)
          }
        })

        if (item.children.length === 0) {
          return item
        }

        if (item.children) {
          return this.removeTypeNode(item.children)
        }

        return item
      }, null)
    }
  }
}
</script>
