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
      <b-col
        md="12"
      >
        <div class="mt-3">
          <b-card-group
            deck
            class="mb-3"
          >
            <b-card
              border-variant="light"
              header="현재 사용량"
              class="text-center"
            >
              <b-row>
                <b-col md="6">
                  <div id="chart">
                    <apexchart
                      type="radialBar"
                      height="350"
                      :options="storageData.chartOptions"
                      :series="storageData.series"
                    />
                  </div>
                </b-col>
                <b-col md="6">
                  <div id="chart">
                    <apexchart
                      type="radialBar"
                      height="350"
                      :options="edgeData.chartOptions"
                      :series="edgeData.series"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col
                  lg="6"
                  md="12"
                  sm="12"
                >
                  <b-card
                    body-class="pt-2 pb-2"
                    class
                  >
                    <div class="ul-widget-app__browser-list notification_widget mt-4 mb-4">
                      <div
                        class="ul-widget-app__browser-list-1 pl-4 pr-4 pb-2 pt-2 mb-2 mt-2"
                        style="font-size:20px;"
                        @click="check()"
                      >
                        <mdicon
                          class="ul-widget-app__roundbg-icon"
                          name="laptop"
                        />
                        <span
                          class="mr-3 ml-2"
                          style="font-size:16px;"
                        >디바이스</span>
                        <b-badge
                          variant="primary p-1"
                          class="mr-3"
                        >
                          90
                        </b-badge>
                      </div>
                      <div
                        class="ul-widget-app__browser-list-1 pl-4 pr-4 pb-2 pt-2 mb-2 mt-2"
                        style="font-size:20px;"
                        @click="check()"
                      >
                        <mdicon
                          class="ul-widget-app__roundbg-icon"
                          name="database"
                        />
                        <span
                          class="mr-3 ml-2"
                          style="font-size:16px;"
                        >총 태그</span>
                        <b-badge
                          variant="primary p-1"
                          class="mr-3"
                        >
                          120
                        </b-badge>
                      </div>
                    </div>
                  </b-card>
                </b-col>
                <b-col
                  lg="6"
                  md="12"
                  sm="12"
                >
                  <b-card
                    class="pt-3 pb-2 p-1 d-flex-column align-items-center "
                    style="font-size:18px;"
                  >
                    <p class="text-muted mt-1 mb-4">
                      <mdicon
                        name="database-arrow-down"
                        class="mr-2"
                      />
                      데이터 수집량
                    </p>
                    <p class="text-primary text-19 line-height-1 m-0">
                      {{ formattedFixedMoney(dataAmountPerDayOrigin) }}개
                    </p>
                    <p
                      style="font-size:15px;"
                      class="pt-1"
                    >
                      (일 수집량)
                    </p>
                  </b-card>
                </b-col>
              </b-row>
            </b-card>
            <b-card
              border-variant="dark"
              header="결제 정보"
              align="center"
            >
              <b-col md="12">
                <table
                  class="table"
                  style="margin-bottom:40px;"
                >
                  <tbody>
                    <tr
                      align="center"
                      style="background: #f4f4f4;border-top: 2px solid"
                    >
                      <td
                        colspan="3"
                        span
                      >
                        <b>결제 내역</b>
                      </td>
                    </tr>
                    <tr style="background: #ececec;">
                      <td md="6">
                        구분
                      </td>
                      <td>
                        내용
                      </td>
                    </tr>
                    <tr>
                      <td
                        md="6"
                      >
                        라이선스
                      </td>
                      <td
                        md="6"
                      >
                        PRO
                      </td>
                    </tr>
                    <tr>
                      <td md="6">
                        결제일
                      </td>
                      <td>
                        22/10/14
                      </td>
                    </tr>
                    <tr>
                      <td>결제 금액</td>
                      <td>
                        500,000
                      </td>
                    </tr>
                  </tbody>
                  <br>

                  <tbody>
                    <tr
                      align="center"
                      style="background: #f4f4f4;border-top: 2px solid"
                    >
                      <td
                        colspan="3"
                        span
                      >
                        <b>최근 결제 기록</b>
                      </td>
                    </tr>
                    <tr
                      style="background: #ececec;"
                    >
                      <td md="6">
                        결제일
                      </td>
                      <td>
                        라이선스
                      </td>
                    </tr>
                    <tr>
                      <td
                        md="6"
                      >
                        22/09/14
                      </td>
                      <td>
                        PRO
                      </td>
                    </tr>
                    <tr>
                      <td
                        md="6"
                      >
                        22/08/14
                      </td>
                      <td>
                        LITE
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="button"
                  class="btn btn-primary mb-4 mr-4 ml-4"
                  @click="changeLicense()"
                >
                  <mdicon
                    name="sync"
                    class="mr-2"
                    :size="17"
                  />
                  라이선스 변경
                </button>
                <button
                  v-b-toggle.collapse-e
                  type="button"
                  class="btn btn-primary mb-4 mr-4 ml-4"
                >
                  <mdicon
                    name="credit-card-edit"
                    class="mr-2"
                    :size="17"
                  />
                  결제 수단 변경
                </button>
                <b-collapse
                  id="collapse-e"
                  class="mt-5 text-center"
                >
                  <b-card>
                    <h4 class="card-title">
                      결제 수단 변경
                    </h4>

                    <b-form>
                      <b-form-group>
                        <legend
                          class="col-form-label pt-0 text-left"
                          for
                        >
                          이름
                        </legend>
                        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input-group-prepend>
                            <span
                              id="basic-addon1"
                              class="input-group-text"
                            >
                              <i class="i-Male-21 text-18" />
                            </span>
                          </b-input-group-prepend>
                          <b-input
                            id="inline-form-input-username1"
                            placeholder="이름"
                          />
                        </b-input-group>
                      </b-form-group>

                      <b-form-group class="mt-4">
                        <div class="card-input">
                          <legend
                            class="col-form-label pt-0 text-left"
                            for
                          >
                            카드 번호
                          </legend>
                          <div class="ul-widget-list__payment-method mb-1">
                            <img
                              class="mr-2"
                              src="@/assets/images/master-card.png"
                            >
                            <img
                              class="mr-2"
                              src="@/assets/images/visa.png"
                            >
                            <img
                              class="mr-2"
                              src="@/assets/images/paypal.png"
                            >
                          </div>
                        </div>
                        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input-group-prepend>
                            <span
                              id="basic-addon1"
                              class="input-group-text"
                            >
                              <i class="i-Credit-Card-2 text-18" />
                            </span>
                          </b-input-group-prepend>
                          <b-input placeholder="카드 번호" />
                        </b-input-group>
                      </b-form-group>

                      <b-row class="mt-4">
                        <b-col md="4">
                          <b-form-group>
                            <legend
                              class="col-form-label pt-0 text-left"
                              for
                            >
                              만료일
                            </legend>
                            <b-form-select
                              id="inline-form-custom-select-pref1"
                              class
                              :options=" [
                                { value: 'x', text: ' select an option' },
                                { value: 'a', text: 'January' },
                                { value: 'b', text: 'February' },


                              ]"
                            />
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group style="margin-top:25px">
                            <b-form-select
                              id="inline-form-custom-select-pref"
                              :options="[
                                { value: 'x', text: ' select an option' },
                                { value: 'a', text: 'January' },
                                { value: 'b', text: 'February' },


                              ]"
                            />
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group
                            label="CVC"
                            class="text-left"
                          >
                            <b-form-input />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-button
                        block
                        variant="outline-primary mt-4"
                      >
                        변경
                      </b-button>
                    </b-form>
                  </b-card>
                </b-collapse>
              </b-col>
            </b-card>
          </b-card-group>
        </div>
      </b-col>
    </b-row>
    <pricing
      :data="params"
    />
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'
import { DxDataGrid, DxSorting, DxScrolling, DxFilterRow, DxToolbar, DxItem, DxColumnChooser } from 'devextreme-vue/data-grid'
import { data } from './data.js'
import pricing from '@/views/app/sessions/components/pricing.vue'

export default {
  name: 'User',
  components: {
    DxDataGrid,
    DxSorting,
    DxScrolling,
    DxFilterRow,
    DxToolbar,
    DxItem,
    pricing

  },
  mixins: [mixinUtil],
  props: {},
  data () {
    return {
      dataAmountPerDayOrigin: 0,
      storageData: {
        series: [50],
        colors: ['#ffffff'],
        chartOptions: {
          chart: {
            height: 350,
            radius: 50,
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '40%',
                backgroundColor: '#000'
              },
              track: { background: '#333' },
              dataLabels: {
                showOn: 'always',
                name: {
                  offsetY: -10,
                  show: true,
                  color: 'black',
                  fontSize: '20px'
                },
                value: {
                  color: 'black',
                  fontSize: '18px',
                  show: true,
                  formatter: function () {
                    const storage = '7.5' + 'GB' + '/15GB'
                    return storage
                  }
                }
              }
            }
          },
          labels: ['용량'],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                show: false
              }
            }
          }]
        }
      },
      edgeData: {
        series: [80],
        colors: ['#ffffff'],
        chartOptions: {
          chart: {
            height: 350,
            radius: 50,
            type: 'radialBar'
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '40%',
                color: '#000'
              },
              track: { background: '#333' },
              dataLabels: {
                showOn: 'always',
                name: {
                  offsetY: -10,
                  show: true,
                  color: 'black',
                  fontSize: '20px'
                },
                value: {
                  color: 'black',
                  fontSize: '18px',
                  show: true,
                  formatter: function () {
                    const edgeValue = '4개/5개'
                    return edgeValue
                  }
                }
              }
            }
          },
          // stroke: {
          //   lineCap: 'round'
          // },
          labels: ['엣지']
        }
      },
      dxFilterRowActive: false,
      dataSource: data,
      // TODO : data 변환 method 작업
      columns: [
        {
          caption: this.$t('columns.groupName'),
          dataField: 'groupname',
          alignment: 'center'
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
          format: '##.##%'
        },
        {
          caption: this.$t('columns.userResourceCapacity'),
          dataField: 'capacity',
          alignment: 'center',
          format: '###.##GB'
        },
        {
          caption: this.$t('columns.userResourceNetwork'),
          alignment: 'center',
          dataField: 'network',
          format: '###.##MB'
        },
        {
          caption: this.$t('columns.userResourceDevice'),
          alignment: 'center',
          dataField: 'device',
          format: '#'
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
      informType: 'UserMngInformType',
      insertedId: 'UserMngInsertedId',
      updatedCount: 'UserMngUpdatedCount',
      updatedCountPassword: 'UserMngUpdatedCountPassword'
    }),
    ...mapGetters('PagingInfo', { pagingInfoInfoData: 'PagingInfo' }),
    ...mapGetters('Current', { currUser: 'CurrUser', currLocation: 'CurrLocation' }),
    ...mapGetters('ProfileMaker', {
      profileListRows: 'ProfileMakerListRows'
    }),
    profileDataRows () {
      return this.profileListRows
    }
  },
  watch: {

  },
  created () {
  },
  mounted () {
    this.dataAmountFunc()
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
    // 데이터 수집량 : 프로파일 태그 수 / 수집 속도 X 86400s
    dataAmountFunc () {
      const sumArr = []
      this.profileDataRows.map((v) => {
        const tagCount = v.requests.length
        if (v.Devices.length > 0 && tagCount > 0) {
          v.Devices.map((m) => {
            if (m.collectionSpeed) {
              const speedValue = m.collectionSpeed
              sumArr.push((1000 / speedValue) * 86400 * tagCount)
            }
          })
        }
      })
      this.dataAmountPerDayOrigin = Math.floor(sumArr.reduce((a, b) => a + b, 0))
      return this.dataAmountPerDayOrigin
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
