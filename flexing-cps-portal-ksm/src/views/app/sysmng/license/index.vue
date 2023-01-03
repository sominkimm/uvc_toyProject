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
        <!-- 개발 필요 -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import mixinUtil from '@/lib/utils/mixinUtil'

export default {
  name: 'LiCense',
  components: {},
  mixins: [mixinUtil],
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters('License', {
      listCount: 'LicenseListCount',
      listRows: 'LicenseListRows',
      loading: 'LicenseListLoading',
      listResult: 'LicenseListResult',
      infoOpen: 'LicenseOpen'
    }),
    ...mapGetters('License', {
      infoResult: 'LicenseResult',
      insertedId: 'LicenseInsertedId',
      updatedCount: 'LicenseUpdatedCount',
      deletedCount: 'LicenseDeletedCount'
    }),
    ...mapGetters('UserMng', {
      userMngPriceOpen: 'UserMngPriceOpen'
    }),
    ...mapGetters('Current', {
      currUser: 'CurrUser'
    }),
    dataRows () {
      return this.listRows
    }
  },
  watch: {
    updatedCount (value) { // 업데이트 후 처리
      if (value !== null) {
        if (value < 0) { // 업데이트 실패
          if (!this.isDuplicated) { // 중복시 toast 발생 안하고 input창 텍스트로 반응
            this.makeToastError(this.infoResult) // 실패 시 메세지
          }
        } else if (value === 0) { // 업데이트 된 항목 없음
          this.makeToastSuccess(this.infoResult, this.$t('Common.Message.Nodata.noupdate'))
        } else if (value > 0) { // 업데이트 성공
          this.makeToastSuccess(this.infoResult) // 성공 시 메세지
        }
      }
    }
  },
  created () {
    // 권한 체크
    if (this.checkMenuAuth('authMenu') !== true) {
      this.$router.push({ name: 'notPermission' })
    } else {
      this.paramsInit()
    }
  },
  methods: {
    ...mapActions('License', ['actLicenseInit']),
    ...mapActions('License', [
      'actLicenseInsert',
      'actLicenseFileInsert'
    ]),
    ...mapActions('License', ['actLicenseList']),
    ...mapActions('License', ['actLicenseInfo']),
    ...mapActions('License', [
      'actLicenseUpdate']),
    paramsInit () {
      this.actLicenseList()
    },
    formSubmit () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
