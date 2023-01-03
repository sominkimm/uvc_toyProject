<template>
  <b-container
    class="main-content"
    :fluid="true"
  >
    <b-row>
      <div
        v-show="loading"
        id="cover-bubble"
        class="text-center text-info"
      >
        <div
          class="loader-bubble loader-bubble-primary"
          style="top:40%;"
        />
      </div>
      <b-col md="12">
        <section
          class="product-cart"
          style="padding: 0px; border-radius: 0px"
        >
          <DxDataGrid
            class="dev-dextable"
            key-expr="ID"
            :data-source="dataSource"
            :summary="summary"
            :columns="columns"
            :column-min-width="100"
            :show-row-lines="true"
            :show-borders="true"
            :row-alternation-enabled="true"
            :allow-column-resizing="true"
            :allow-column-reordering="true"
            :hover-state-enabled="true"
            :no-data-text="$t('Common.Message.Nodata.empty')"
            @cell-prepared="onCellPrepared"
          >
            <DxScrolling row-rendering-mode="virtual" />
            <DxColumnFixing :enabled="false" />
            <DxFilterRow
              :visible="dxFilterRowActive"
              :between-end-text="$t('Common.Devextreme.FilterRow.betweenEndText')"
              :show-all-text="$t('Common.Devextreme.FilterRow.showAllText')"
              :operation-descriptions="{
                between: $t('Common.Devextreme.FilterRow.OperationDescriptions.between'),
                contains: $t('Common.Devextreme.FilterRow.OperationDescriptions.contains'),
                endsWith: $t('Common.Devextreme.FilterRow.OperationDescriptions.endsWith'),
                equal: $t('Common.Devextreme.FilterRow.OperationDescriptions.equal'),
                greaterThan: $t('Common.Devextreme.FilterRow.OperationDescriptions.greaterThan'),
                greaterThanOrEqual: $t('Common.Devextreme.FilterRow.OperationDescriptions.greaterThanOrEqual'),
                lessThan: $t('Common.Devextreme.FilterRow.OperationDescriptions.lessThan'),
                lessThanOrEqual: $t('Common.Devextreme.FilterRow.OperationDescriptions.lessThanOrEqual'),
                notContains: $t('Common.Devextreme.FilterRow.OperationDescriptions.notContains'),
                notEqual: $t('Common.Devextreme.FilterRow.OperationDescriptions.notEqual'),
                startsWith: $t('Common.Devextreme.FilterRow.OperationDescriptions.startsWith'),
              }"
              :reset-operation-text="$t('Common.Devextreme.FilterRow.resetOperationText')"
            />
            <!--<DxColumnChooser
            :enabled="true"
            mode="select"
            :title="$t('Common.Devextreme.ColumnChooser.title')"
          />-->
            <DxToolbar>
              <DxItem
                location="after"
                template="onDxFilterRowActiveButton"
                locate-in-menu="auto"
              />
              <DxItem
                name="columnChooserButton"
                locate-in-menu="auto"
                location="after"
              />
            </dxtoolbar>
            <template
              #buttonsCellTemplate="cell"
              dev-comment="버튼"
            >
              <b-button-group
                class="mx-1"
                size="sm"
              >
                <span
                  v-b-tooltip.hover="{
                    placement: 'auto',
                    title: checkMenuAuth('authUpdate') !== true
                      ? $t('Common.Message.NoAuth.update') : $t('button.detailBtn')
                  }"
                >
                  <b-button
                    :variant="button.variant.update"
                    dev-comment="과금 현황"
                    class="btn p-1 mr-1"
                    size="sm"
                    :disabled="checkMenuAuth('authUpdate') !== true"
                    @click.prevent.stop="openBillingStatus()"
                  >
                    <mdicon
                      name="card-text"
                      :size="15"
                    />
                  </b-button>
                </span>
              </b-button-group>
            </template>
            <template #onDxFilterRowActiveButton>
              <div class="dx-item-content dx-toolbar-item-content">
                <b-button
                  :variant="button.variant.search"
                  size="sm"
                  class="p-1 pl-3 pr-3 mr-1"
                  @click="dxFilterRowActive = !dxFilterRowActive"
                >
                  <mdicon
                    :name="dxFilterRowActive ? 'magnify-plus' : 'magnify-minus'"
                    :size="17"
                  />
                </b-button>
              </div>
            </template>
            <dx-sorting
              :ascending-text="$t('Common.DevExtreme.Sorting.ascendingText')"
              :descending-text="$t('Common.DevExtreme.Sorting.descendingText')"
              :clear-text="$t('Common.DevExtreme.Sorting.clearText')"
              :show-sort-indexes="true"
            />
          </DxDataGrid>
        </section>
      </b-col>
      <billing-status-detail />
    </b-row>
  </b-container>
</template>


<script>
import { mapGetters } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import { DxDataGrid, DxSorting, DxScrolling, DxFilterRow, DxToolbar, DxItem, DxColumnChooser, DxColumnFixing } from 'devextreme-vue/data-grid'
import { data } from './data.js'
import BillingStatusDetail from '@/views/app/sysmng/mngUserResource/components/billingStatusDetail.vue'

export default {
  name: 'User',
  components: {
    DxDataGrid,
    DxSorting,
    DxScrolling,
    DxFilterRow,
    DxToolbar,
    DxItem,
    BillingStatusDetail,
    DxColumnFixing
  },
  mixins: [mixinUtil],
  props: {},
  data () {
    return {
      dataAmountPerDayOrigin: 0,
      dxFilterRowActive: false,
      dataSource: data,
      // TODO : data 변환 method 작업
      columns: [
        {
          caption: this.$t('columns.groupName'),
          dataField: 'groupname',
          alignment: 'center',
          width: '100'
        },
        {
          caption: this.$t('columns.userResourceLicense'),
          dataField: 'license',
          alignment: 'center',
          format: '#%'
        },
        {
          caption: this.$t('columns.userResourceCPU'),
          alignment: 'center',
          dataField: 'cpu',
          format: '##.##%',
          width: '120'
        },
        {
          caption: this.$t('columns.userResourceCapacity'),
          dataField: 'capacity',
          alignment: 'center',
          format: '###.##GB',
          width: '120'
        },
        {
          caption: this.$t('columns.userResourceNetwork'),
          alignment: 'center',
          dataField: 'network',
          format: '###.##MB',
          width: '120'
        },
        {
          caption: this.$t('columns.userResourceDevice'),
          alignment: 'center',
          dataField: 'device',
          format: '#',
          width: '110'
        },
        {
          caption: this.$t('columns.userResourceEdge'),
          alignment: 'center',
          dataField: 'edge',
          format: '#'
        },
        {
          caption: this.$t('columns.userResourceTag'),
          alignment: 'center',
          dataField: 'tag',
          format: '#'
        },
        {
          type: 'buttons',
          alignment: 'center',
          cellTemplate: 'buttonsCellTemplate',
          fixed: true,
          fixedHeader: true,
          width: '70'
        }
      ],
      summary: {
        totalItems: [
          {
            column: 'groupname',
            summaryType: 'count',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.count'),
            valueFormat: { type: 'fixedPoint', precision: 0 }
          },
          //  cpu
          {
            column: 'cpu',
            summaryType: 'sum',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.sum'),
            valueFormat: { type: 'percent', precision: 2 }
          },
          {
            column: 'cpu',
            summaryType: 'max',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.max'),
            valueFormat: { type: 'percent', precision: 2 }
          },
          {
            column: 'cpu',
            summaryType: 'min',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.min'),
            valueFormat: { type: 'percent', precision: 2 }
          },
          //  capacity
          {
            column: 'capacity',
            summaryType: 'max',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.max'),
            valueFormat: { type: 'percent', precision: 2 }
          },
          {
            column: 'capacity',
            summaryType: 'min',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.min'),
            valueFormat: { type: 'percent', precision: 2 }
          },

          //  network

          {
            column: 'network',
            summaryType: 'max',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.max'),
            valueFormat: { type: 'fixedPoint', precision: 2 }
          },
          {
            column: 'network',
            summaryType: 'min',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.min'),
            valueFormat: { type: 'fixedPoint', precision: 2 }
          },
          //  device
          // {
          //   column: 'device',
          //   summaryType: 'max',
          //   displayFormat: this.$t('Common.Devextreme.TotalSummary.max'),
          //   valueFormat: { type: 'fixedPoint', precision: 0 }
          // },
          // {
          //   column: 'device',
          //   summaryType: 'min',
          //   displayFormat: this.$t('Common.Devextreme.TotalSummary.min'),
          //   valueFormat: { type: 'fixedPoint', precision: 0 }
          // },
          //  edge
          {
            column: 'edge',
            summaryType: 'max',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.max'),
            valueFormat: { type: 'fixedPoint', precision: 0 }
          },
          {
            column: 'edge',
            summaryType: 'min',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.min'),
            valueFormat: { type: 'fixedPoint', precision: 0 }
          },
          //  tag
          {
            column: 'tag',
            summaryType: 'max',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.max'),
            valueFormat: { type: 'fixedPoint', precision: 0 }
          },
          {
            column: 'tag',
            summaryType: 'min',
            displayFormat: this.$t('Common.Devextreme.TotalSummary.min'),
            valueFormat: { type: 'fixedPoint', precision: 0 }
          }
        ]
      },
      params: {
        User: {
          limit: null,
          offset: null,
          name: null,
          companyId: null,
          userid: null,
          active: true
        }
      }
    }
  },
  computed: {
    ...mapGetters('UserMng', {
      listCount: 'UserMngListCount',
      listRows: 'UserMngListRows',
      loading: 'UserMngListLoading',
      listResult: 'UserMngListResult'
    }),
    ...mapGetters('UserMng', {
      infoData: 'UserMngData',
      infoResult: 'UserMngResult',
      informType: 'UserMngInformType'
    }),
    ...mapGetters('UserMng', {
      infoResult: 'UserMngResult',
      insertedId: 'UserMngInsertedId',
      updatedCount: 'UserMngUpdatedCount',
      updatedCountPassword: 'UserMngUpdatedCountPassword'
    }),
    ...mapGetters('PagingInfo', { pagingInfoInfoData: 'PagingInfo' }),
    ...mapGetters('Current', { currUser: 'CurrUser', currLocation: 'CurrLocation' }),
    ...mapGetters('ProfileMaker', {
      profileListRows: 'ProfileMakerListRows'
    })
  },
  watch: {},
  created () {
    if (this.checkMenuAuth('authMenu') !== true) {
      this.$router.push({ name: 'notPermission' })
    }
  },
  methods: {
    changeLicense () {
      this.$bvModal.show('modal-session-pricing-form')
    },
    onCellPrepared (e) {
      if (e.data && e.data.cpu >= 0.80) {
        e.cellElement.style.backgroundColor = '#ffe4e1'
      }
    },
    openBillingStatus () {
      this.$bvModal.show('modal-mngUserResource-billingStatus')
    }
  }
}
</script>
