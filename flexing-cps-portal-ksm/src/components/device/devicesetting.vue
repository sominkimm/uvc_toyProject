<template>
  <div>
    <div
      class="customizer"
      :class="{ open: isOpen }"
    >
      <div
        class="handle"
        @click="isOpen = !isOpen"
      >
        <i class="i-Gear spin" />
      </div>
      <vue-perfect-scrollbar
        :settings="{ suppressScrollX: true, wheelPropagation: false }"
        class="customizer-body ps rtl-ps-none"
      >
        <div>
          <div class="layoutJSON">
            Displayed as <code>[x, y, w, h]</code>:
            <div class="columns">
              <div
                v-for="item in layout"
                :key="item.i"
              >
                <b>{{ item.i }}</b>: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
              </div>
            </div>
          </div>
        </div>
        <br>
        <div
          class="droppable-element"
          draggable="true"
          unselectable="on"
          @drag="drag"
          @dragend="dragend"
        >
          Droppable Element (Drag me!)
        </div>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, defineComponent } from '@/vue-wrapper.js'
import { GridLayout, GridItem } from 'vue-grid-layout'
const mouseXY = { x: null, y: null }
const DragPos = { x: null, y: null, w: 1, h: 1, i: null }

export default defineComponent({
  components: { GridLayout, GridItem },
  props: {
    layout: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const state = reactive({ layout: props.layout, isOpen: false })
    function drag (e) {
      const parentRect = document
        .getElementById('content')
        .getBoundingClientRect()
      let mouseInGrid = false
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true
      }
      if (
        mouseInGrid === true &&
        state.layout.findIndex(item => item.i === 'drop') === -1
      ) {
        state.layout.push({
          x: (state.layout.length * 2) % (this.colNum || 12),
          y: state.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 1,
          h: 1,
          i: 'drop'
        })
      }
      const index = state.layout.findIndex(item => item.i === 'drop')
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[
            state.layout.length
          ].$refs.item.style.display = 'none'
        } catch (err) {
          console.error(err)
        }
        const el = this.$refs.gridlayout.$children[index]
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left
        }
        const new_pos = el.calcXY(
          mouseXY.y - parentRect.top,
          mouseXY.x - parentRect.left
        )
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent(
            'dragstart',
            'drop',
            new_pos.x,
            new_pos.y,
            1,
            1
          )
          DragPos.i = String(index)
          DragPos.x = state.layout[index].x
          DragPos.y = state.layout[index].y
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent(
            'dragend',
            'drop',
            new_pos.x,
            new_pos.y,
            1,
            1
          )
          state.layout = state.layout.filter(obj => obj.i !== 'drop')
        }
      }
    }
    function dragend (e) {
      const parentRect = document
        .getElementById('content')
        .getBoundingClientRect()
      let mouseInGrid = false
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        alert(
          `Dropped element props:\n${JSON.stringify(
            DragPos,
            ['x', 'y', 'w', 'h'],
            2
          )}`
        )
        this.$refs.gridlayout.dragEvent(
          'dragend',
          'drop',
          DragPos.x,
          DragPos.y,
          1,
          1
        )
        state.layout = state.layout.filter(obj => obj.i !== 'drop')
        // UNCOMMENT below if you want to add a grid-item
        /*
                this.layout.push({
                    x: DragPos.x,
                    y: DragPos.y,
                    w: 1,
                    h: 1,
                    i: DragPos.i,
                });
                this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
                try {
                    this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display="block";
                } catch {
                }
                */
      }
    }
    onMounted(
      document.addEventListener(
        'dragover',
        e => {
          mouseXY.x = e.clientX
          mouseXY.y = e.clientY
        },
        false
      )
    )

    return { ...toRefs(state), drag, dragend }
  }
})
</script>

<style lang="scss" scoped>
.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
.vue-grid-layout {
  background: #eee;
}
.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
.vue-grid-item .static {
  background: #cce;
}
.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}
.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}
.vue-grid-item .minMax {
  font-size: 12px;
}
.vue-grid-item .add {
  cursor: pointer;
}
.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
</style>
