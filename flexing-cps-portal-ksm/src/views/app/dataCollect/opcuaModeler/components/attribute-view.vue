<template>
  <b-card style="height:79vh; overflow-y: auto" class="node-wrap uvc-module">
    <b-row
      v-if="!attribute"
      class="text-center h-100"
    >
      <b-col class="text-center my-auto">
        <p class="text-30 subheading mb-1">
          {{ $t('dataCollect.description.noNodeData') }}
        </p>
        <p class="text-muted text-15">
          {{ $t('dataCollect.description.noNodeSelectedData') }}
        </p>
      </b-col>
    </b-row>
    <div v-else>
      <b-card-title>
        Node Attribute
      </b-card-title>

    
      <article class="node-box">
        <header class="tab" role="tab">
          <h5>
              <button type="button" class="tab-btn a">Attributes</button>
          </h5>
        </header>
         <ul class="module-list" role="tabpanel">
            <li>
                <div class="module-select">
                  <label
                    class="module-title"
                    for="node_class"
                  >Node id</label>
                  <select id="node_class">
                    <option>선택하세요</option>
                    <option>test 123</option>
                  </select>
                </div>
            </li> 
            <li>
               <div class="module-input">
                  <label
                    class="module-title"
                    for="node_id"
                  >Node Class</label>
                  <div class="input-wrap">
                    <input
                      id="node_id"
                      type="text"
                      placeholder="디바이스 이름을 입력하세요"
                    >
                  </div>
                </div>
            </li> 
            <li>
                <div class="module-select">
                  <label
                    class="module-title"
                    for="node_class"
                  >Node id</label>
                  <select id="node_class">
                    <option>선택하세요</option>
                    <option>test 123</option>
                  </select>
                </div>
            </li> 
            <li>
               <div class="module-input">
                  <label
                    class="module-title"
                    for="node_id"
                  >Node Class</label>
                  <div class="input-wrap">
                    <input
                      id="node_id"
                      type="text"
                      placeholder="디바이스 이름을 입력하세요"
                    >
                  </div>
                </div>
            </li> 
           
         </ul>
      </article>
      <article class="node-box">
        <header class="tab" role="tab">
          <h5>
            <button type="button" 
                    class="tab-btn b">Reference</button>
          </h5>
        </header>
         <ul class="module-list">
            <li>
               <div class="module-input">
                  <label
                    class="module-title"
                    for="node_type"
                  >Type</label>
                  <div class="input-wrap">
                    <input
                      id="node_type"
                      type="text"
                      placeholder="디바이스 이름을 입력하세요"
                    >
                  </div>
                </div>
            </li> 
            <li>
                <div class="module-select">
                  <label
                    class="module-title"
                    for="node_target"
                  >Target</label>
                  <select id="node_target">
                    <option>선택하세요</option>
                    <option>test 123</option>
                  </select>
                </div>
            </li> 
         </ul>
      </article>



      <b-card-text>
        <b-card
          no-body
          class="mb-1"
        >
          <b-card-header
            header-tag="header" 
            role="tab"  
          >
            <b-button
              v-b-toggle.attributes
              block
              variant="primary" 
            >
              Attributes
            </b-button>
          </b-card-header>
          <b-collapse
            id="attributes"
            visible
            role="tabpanel"
          >
            <b-card-body>
              <b-card-text>
                <b-row class="module-select">
                  <!-- NodeClass -->
                  <b-form-group
                    class="col-md-12"
                    label="NodeClass"
                    label-for="input-1"
                  >
                    <b-form-select
                      id="inline-form-custom-select-pref1"
                      v-model="attribute.type"
                      :options="nodeType"
                      value-field="name"
                      text-field="name"
                    />
                  </b-form-group>
                  <!-- DataType -->
                  <b-form-group
                    v-if="attribute.type === 'DataType'"
                    class="col-md-12"
                    label="DataType"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="attribute.dataType"
                      type="text"
                    />
                  </b-form-group>
                  <!-- NodeId -->
                  <b-form-group
                    class="col-md-12"
                    label="NodeId"
                    label-for="input-1"
                  >
                    <span>{{ 'ns=2;s=' + attribute.id }}</span>
                  </b-form-group>
                  <!-- IsAbstract -->
                  <b-form-group
                    class="col-md-12"
                    label="IsAbstract"
                    label-for="input-1"
                  >
                    <b-form-select
                      id="inline-form-custom-select-pref1"
                      v-model="attribute.isAbstract"
                      :options="isAbstract"
                      value-field="name"
                      text-field="name"
                    />
                  </b-form-group>
                  <!-- DisplayName -->
                  <b-form-group
                    class="col-md-12"
                    label="DisplayName"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="attribute.name"
                      type="text"
                    />
                  </b-form-group>
                  <!-- eventNotifier -->
                  <b-form-group
                    v-if="attribute.type === 'Object'"
                    class="col-md-12"
                    label="EventNotifier"
                    label-for="input-1"
                  >
                    <b-form-select
                      id="inline-form-custom-select-pref1"
                      v-model="attribute.eventNotifier"
                      :options="eventNotifier"
                      value-field="name"
                      text-field="name"
                    />
                  </b-form-group>
                  <!-- ValueRank -->
                  <b-form-group
                    v-if="attribute.type === 'VariableType'"
                    class="col-md-12"
                    label="ValueRank"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="attribute.valueRank"
                      type="text"
                    />
                  </b-form-group>
                  <!-- Value -->
                  <b-form-group
                    v-if="attribute.type === 'Variable'"
                    class="col-md-12"
                    label="Value"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="attribute.value"
                      type="text"
                    />
                  </b-form-group>
                  <!-- ValueRank -->
                  <b-form-group
                    v-if="attribute.type === 'Variable'"
                    class="col-md-12"
                    label="ValueRank"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="attribute.valueRank"
                      type="text"
                    />
                  </b-form-group>
                  <!-- AccessLevel -->
                  <b-form-group
                    v-if="attribute.type === 'Variable'"
                    class="col-md-12"
                    label="AccessLevel"
                    label-for="input-1"
                  >
                    <b-form-select
                      id="inline-form-custom-select-pref1"
                      v-model="attribute.accessLevel"
                      :options="accessLevel"
                      value-field="name"
                      text-field="name"
                    />
                  </b-form-group>
                  <!-- Historizing -->
                  <b-form-group
                    v-if="attribute.type === 'Variable'"
                    class="col-md-12"
                    label="Historizing"
                    label-for="input-1"
                  >
                    <b-form-select
                      id="inline-form-custom-select-pref1"
                      v-model="attribute.historizing"
                      :options="historizing"
                      value-field="name"
                      text-field="name"
                    />
                  </b-form-group>
                  <!-- Interval -->
                  <b-form-group
                    v-if="attribute.type === 'Variable'"
                    class="col-md-12"
                    label="Interval"
                    label-for="input-1"
                  >
                    <b-form-input
                      v-model="attribute.minimumSamplingInterval"
                      type="text"
                    />
                  </b-form-group>
                </b-row>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
        <b-card
          v-if="connections.length > 0"
          no-body
          class="mb-1"
        >
          <b-card-header
            header-tag="header"
            class="p-1"
            role="tab"
          >
            <b-button
              v-b-toggle.reference
              block
              variant="primary"
            >
              Reference
            </b-button>
          </b-card-header>
          <b-collapse
            id="reference"
            visible
            role="tabpanel"
          >
            <b-card-body>
              <b-card-text>
                <div
                  v-for="conn in connections"
                  :key="conn.id"
                >
                  <!-- Type -->
                  <b-form-group
                    class="col-md-12"
                    label="Type"
                    label-for="input-1"
                  >
                    <b-form-select
                      id="inline-form-custom-select-pref1"
                      v-model="conn.type"
                      :options="referenceType"
                      value-field="name"
                      text-field="name"
                    />
                  </b-form-group>
                  <!-- Target -->
                  <b-form-group
                    class="col-md-12"
                    label="Target"
                    label-for="input-1"
                  >
                    <span>{{ conn.destination }}</span>
                  </b-form-group>
                </div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import mixinUtil from '@/lib/utils/mixinUtil'
import EventBus from '@/lib/utils/event-bus'

export default {
  name: 'AttributeView',
  mixins: [mixinUtil],
  data: () => ({
    panel: [0],
    attribute: null,
    connections: null,
    nodeType: [
      { name: 'Object' },
      { name: 'ObjectType' },
      { name: 'Variable' },
      { name: 'VariableType' },
      { name: 'DataType' },
      { name: 'ReferenceType' },
      { name: 'Method' },
      { name: 'View' }
    ],
    isAbstract: [{ name: 'false' }, { name: 'true' }],
    referenceType: [
      { name: 'HasComponent' },
      { name: 'HasProperty' },
      { name: 'HasTypeDefinition' },
      { name: 'HasSubtype' },
      { name: 'HasEventSource' }
    ],
    eventNotifier: [
      { name: 'Subscribe to Events' },
      { name: 'Reserved' },
      { name: 'HistoryRead' },
      { name: 'HistoryWrite' }
    ],
    accessLevel: [
      { name: 'CurrentRead' },
      { name: 'CurrentWrite' },
      { name: 'HistoryRead' },
      { name: 'HistoryWrite' },
      { name: 'SemanticChange' },
      { name: 'StatusWrite' },
      { name: 'TimestampWrite' }
    ],
    historizing: [{ name: 'false' }, { name: 'true' }]
  }),
  mounted () {
    EventBus.$on('clickNode', this.clickNode)
  },
  beforeDestroy () {
    EventBus.$off('clickNode', this.clickNode)
  },
  methods: {
    clickNode (node, connections) {
      if (!node) {
        this.attribute = null
        this.connections = null
      }
      this.attribute = node
      this.connections = connections
    },
    saveAttribute () {
      EventBus.$emit('saveAttribute', this.attribute)
    }
  }
}
</script>
