<template>
  <b-modal
    id="modal-mngUserResource-billingStatus"
    class="billingModal"
    centered
    no-close-on-backdrop
    :title="$t('MngUserResource.modal.main')"
    size="huge"
    body-class="p-0"
    button-size="sm"
  >
    <template #default>
      <div class="card-body app-info-body-scroll">
        <b-form>
          <div>
            <b-tabs
              content-class="mt-3"
              align="left"
            >
              <b-tab
                title="결제 정보"
                active
              >
                <b-row>
                  <b-col cols="4">
                    <h6> 그룹 이름 </h6>
                  </b-col>
                  <b-col>
                    <p>UVC</p>
                  </b-col>
                </b-row>
                <hr>
                <b-row>
                  <b-col cols="4">
                    <h6> 결제 정보 </h6>
                  </b-col>
                  <b-col>
                    <p>최근 결제일 : 2022.10.14</p>
                    <p>결제 금액 : 500,000 원</p>
                    <p>신용카드 ****-****-****-1253</p>
                    <p>다음 결제일은 2022년 11월 14일 입니다.</p>
                  </b-col>
                </b-row>
                <hr>
                <b-row>
                  <b-col cols="4">
                    <h6> 라이선스 </h6>
                  </b-col>
                  <b-col>
                    <p>PRO</p>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="이용 내역">
                <b-row>
                  <b-col
                    md="12"
                  >
                    <DxDataGrid
                      class="dev-dextable"
                      style="font-size: 12px;"
                      :data-source="dataSource"
                      :columns="columns"
                      :show-row-lines="true"
                      :show-borders="true"
                      :row-alternation-enabled="true"
                      :column-auto-width="true"
                      :allow-column-resizing="true"
                      :allow-column-reordering="true"
                      :hover-state-enabled="true"
                      :no-data-text="$t('Common.Message.Nodata.empty')"
                    >
                      <DxToolbar>
                        <DxScrolling
                          mode="infinite"
                        />
                        <DxItem
                          name="columnChooserButton"
                          locate-in-menu="auto"
                          location="after"
                        />
                      </dxtoolbar>
                    </DxDataGrid>
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
          </div>
        </b-form>
      </div>
    </template>
    <template #modal-footer>
      <span>
        <b-button
          dev-comment="확인"
          size="sm"
          @click="onCancelClick"
        >
          {{ $t('button.confirmBtn') }}
        </b-button>
      </span>
    </template>
  </b-modal>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import { DxDataGrid, DxScrolling, DxFilterRow, DxToolbar, DxItem } from 'devextreme-vue/data-grid'
import { data } from './billingData'
import mixinUtil from '@/lib/utils/mixinUtil'

export default {
  name: 'BillingStatusDetail',
  components: {
    DxDataGrid,
    DxScrolling,
    DxFilterRow,
    DxToolbar,
    DxItem
  },
  mixins: [mixinUtil],
  data () {
    return {
      dataSource: data,
      // TODO : data 변환 method 작업
      columns: [
        {
          caption: this.$t('MngUserResource.modal.status'),
          dataField: 'status',
          alignment: 'center',
          width: '10%'
        },
        {
          caption: this.$t('MngUserResource.modal.license'),
          dataField: 'license',
          alignment: 'center',
          width: '10%'
        },
        {
          caption: this.$t('MngUserResource.modal.price'),
          alignment: 'center',
          dataField: 'price',
          width: '10%'
        },
        {
          caption: this.$t('MngUserResource.modal.means'),
          alignment: 'center',
          dataField: 'means',
          width: '10%'
        },
        {
          caption: this.$t('MngUserResource.modal.date'),
          alignment: 'center',
          dataField: 'date',
          width: '15%'
        },
        {
          caption: this.$t('MngUserResource.modal.period'),
          alignment: 'center',
          dataField: 'period',
          width: '20%'
        }]
    }
  },
  computed: {
    ...mapGetters('Current', { currUser: 'CurrUser', currLocation: 'CurrLocation' })
  },
  methods: {
    onCancelClick () {
      this.$bvModal.hide('modal-mngUserResource-billingStatus')
    }
  }
}
</script>
<style lang="scss" scoped>
.billingModal {
  max-width: 100%;
  width: 80vw;
}
/deep/ .modal-dialog {
  max-width: 100%;
  width: 80vw;
}

</style>
