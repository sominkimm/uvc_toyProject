<template>
  <div
    class="main-content"
    style="padding: 10px 5px 0 5px;"
  >
    <b-row>
      <b-col md="2">
        <b-form-select
          id="input-3"
          v-model="perPage"
          required
          @change="customPerPageChange"
        >
          <!-- @change="customPerPageChange" -->
          <template #first>
            <b-form-select-option
              :value="null"
              disabled
              class="t-font-boldest text-primary"
            >
              Rows per page
            </b-form-select-option>
          </template>
          <b-form-select-option
            v-for="option in rowPerPage"
            :key="option"
            :value="option"
          >
            {{ option }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col md="10">
        <b-pagination
          v-model="infoData.currentPage"
          limit="5"
          :total-rows="totalCount"
          :per-page="perPage"
          align="right"
          @page-click="onPageClick"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
/** *** PAGINATION *** **/
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    rowPerPage: {
      type: Array,
      default: null
    },
    totalCount: {
      type: Number,
      default: 0
    },
    onPageChange: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters('PagingInfo', { infoData: 'PagingInfo' }),
    perPage: {
      get () {
        return this.infoData.limit
      },
      set (val) {
        this.actPagingInfo({
          ...this.infoData,
          limit: val
        })
      }
    }
  },
  created () {
    this.actPagingInfo({
      ...this.infoData,
      limit: 10
    })
  },
  methods: {
    ...mapActions('PagingInfo', ['actPagingInfo']),
    customPerPageChange (customPerPage) {
      this.actPagingInfo({
        ...this.infoData,
        currentPage: 1,
        offset: 0,
        limit: customPerPage
      })

      this.onPageChange()
    },
    onPageClick (button, page) {
      const offset = this.perPage * (page - 1)

      this.actPagingInfo({
        ...this.infoData,
        offset
      })

      this.onPageChange()
    }
  }
}
</script>
<style>
</style>
