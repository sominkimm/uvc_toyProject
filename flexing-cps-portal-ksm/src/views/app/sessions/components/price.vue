<template>
  <div class="container-price">
    <div class="row m-0">
      <div class="col-12 p-0 ">
        <div class="text-center pt-2">
          <h5 class="card-title mb-2 text-black app-license-title">
            {{ license.toUpperCase() }}
          </h5>
        </div>
        <div class="p-0 text-left card-footer font-weight-light d-flex">
          <mdicon
            name="currency-krw"
            :size="15"
            class="mr-1"
          />
          <span
            class="mr-3 d-flex align-items-center"
            style="line-height:2"
          >
            {{ $t('SignUp.description.payment') }}
            -&nbsp;{{ formattedFixedMoney(payment[license].price) }}
          </span>
        </div>
        <div class="box-left">
          <p
            class="textmuted h8"
            style="height:7vh;"
          >
            - {{ payment[license].description }}
          </p>
          <div class="h8">
            <div class="row m-0 border mb-3">
              <div class="col-6 h8 pe-0 ps-2">
                <p class="textmuted py-2 p-1">
                  Items
                </p>
                <span
                  dev-comment="용량"
                  class="d-block py-2 p-1 border-bottom"
                >
                  {{ $t('SignUp.description.volume') }}
                </span>
                <span
                  dev-comment="엣지 개수"
                  class="d-block py-2 p-1 border-bottom"
                >
                  {{ $t('SignUp.description.edgeCount') }}
                </span>
                <span
                  dev-comment="메뉴"
                  class="d-block py-2 p-1"
                >
                  {{ $t('SignUp.description.menu') }}
                </span>
              </div>
              <div class="col-6 text-center p-0">
                <p class="textmuted p-2">
                  -
                </p>
                <span
                  v-if="payment[license].volume === -1"
                  class="d-block p-2 border-bottom"
                >
                  무제한
                </span>
                <span
                  v-else
                  class="d-block p-2 border-bottom"
                >
                  {{ payment[license].volume }} GB
                </span>
                <span class="d-block p-2 border-bottom">{{ payment[license].edgeCount }}</span>
                <span class="d-block p-2">
                  <ul
                    v-for="(item, key) in payment[license].menu"
                    :key="key"
                    style="list-style-type :none;"
                  >
                    <li style="text-align:right">{{ item }}</li>
                  </ul>
                </span>
              </div>
            </div>
            <div class="h8 mb-0">
              <p class="textmuted">
                ※ {{ $t('SignUp.description.paymentAdd') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinUtil from '@/lib/utils/mixinUtil'

export default {
  name: 'Price',
  mixins: [mixinUtil],
  props: {
    payment: {
      type: Object,
      default: () => {}
    },
    license: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      expandedRows: [2],
      columns: [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Age', field: 'age', type: 'number' },
        { label: '', field: 'custom' }
      ],
      rows: [
        { id: 1, name: 'John', age: 20 },
        { id: 2, name: 'Jane', age: 24 },
        { id: 3, name: 'Susan', age: 16 }
      ]
    }
  },
  methods: {
    clicked (clickedId) {
      if (this.expandedRows.some(id => id === clickedId)) {
        this.expandedRows = this.expandedRows.filter(v => v !== clickedId)
      } else {
        this.expandedRows.push(clickedId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

p {
    margin: 0
}

.box-right {
    padding: 30px 25px;
    background-color: white;
    border-radius: 15px
}

.box-left {
    padding: 5px 5px;
    background-color: white;
    border-radius: 15px
}

.textmuted {
    color: #7a7a7a;
    font-size: x-small;
}

.p-blue {
    font-size: 14px;
    color: #1976d2
}

.fas.fa-circle {
    font-size: 12px
}

.p-org {
    font-size: 14px;
    color: #fbc02d
}

.h7 {
    font-size: 15px
}

.h8 {
    font-size: 12px
}

.h9 {
    font-size: 10px
}

.bg-blue {
    background-color: #dfe9fc9c;
    border-radius: 5px
}

.form-control {
    box-shadow: none !important
}

.card input::placeholder {
    font-size: 14px
}

::placeholder {
    font-size: 14px
}

input.card {
    position: relative
}

.far.fa-credit-card {
    position: absolute;
    top: 10px;
    padding: 0 15px
}

.app-license-title {
  font-weight:900;
  color: #16213E;
  background: #FFFFFF;
  text-shadow: 2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15);
}

.app-license-icon {
  line-height:1;
  padding-right:5px;
}

// 스마트폰 가로 + 세로
@media only screen and(min-width: 320px) and (max-width: 480px) {
  .app-license-title {
    font-size: large;
  }
}

</style>
