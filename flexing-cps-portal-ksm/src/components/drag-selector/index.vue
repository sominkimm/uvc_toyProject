<template>
  <div
    class="vue-drag-select"
    @mousedown="onMouseDown"
  >
    <slot :selected-items="selectedItems" />
    <div
      v-if="mouseDown"
      class="vue-drag-select-box"
    />
  </div>
</template>

<script>
// Takes an array and returns a copy of the array without duplicates
function uniqueArray (array) {
  const newArray = array.concat()
  for (let i = 0; i < newArray.length; ++i) {
    for (let j = i + 1; j < newArray.length; ++j) {
      if (newArray[i] === newArray[j]) {
        newArray.splice(j--, 1)
      }
    }
  }
  return newArray
}
export default {
  name: 'VueDragSelector',
  props: {
    selectorClass: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      mouseDown: false,
      concat: false,
      startPoint: null,
      endPoint: null,
      selectedItems: []
    }
  },
  computed: {
    selectionBox () {
      // Only set styling when necessary
      if (!this.mouseDown || !this.startPoint || !this.endPoint) return {}
      const clientRect = this.$el.getBoundingClientRect()
      const scroll = this.getScroll()
      // Calculate position and dimensions of the selection box
      const left = Math.min(this.startPoint.x, this.endPoint.x) - clientRect.left - scroll.x
      const top = Math.min(this.startPoint.y, this.endPoint.y) - clientRect.top - scroll.y
      const width = Math.abs(this.startPoint.x - this.endPoint.x)
      const height = Math.abs(this.startPoint.y - this.endPoint.y)
      // Return the styles to be applied
      return {
        left,
        top,
        width,
        height
      }
    }
  },
  watch: {
    selectedItems (val) {
      this.$emit('change', val)
    }
  },
  mounted () {
    window.addEventListener('keydown', this.keydownHandler)
    this.$children.forEach((child) => {
      child.$on('click', () => {
        const included = this.selectedItems.find((item) => {
          return child.$el === item.$el
        })
        if (included) {
          this.selectedItems = this.selectedItems.filter((item) => {
            return child.$el !== item.$el
          })
        } else {
          this.selectedItems.push(child)
        }
      })
    })
  },
  beforeDestroy () {
    // Remove event listeners
    window.removeEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mousedown', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
    this.$children.forEach((child) => {
      child.$off('click')
    })
  },
  methods: {
    resetItems () {
      this.selectedItems = []
    },
    getScroll () {
      // If we're on the server, default to 0,0
      if (typeof document === 'undefined') {
        return {
          x: 0,
          y: 0
        }
      }
      return {
        x: this.$el.scrollLeft || document.body.scrollLeft || document.documentElement.scrollLeft,
        y: this.$el.scrollTop || document.body.scrollTop || document.documentElement.scrollTop
      }
    },
    onMouseDown (event) {
      // Ignore right clicks
      if (event.button === 2) return
      // Check if shift is down
      this.concat = event.shiftKey
      // Register begin point
      this.mouseDown = true
      this.startPoint = {
        x: event.pageX,
        y: event.pageY
      }
      // Start listening for mouse move and up events
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mousedown', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove (event) {
      // Update the end point position
      if (this.mouseDown) {
        this.endPoint = {
          x: event.pageX,
          y: event.pageY
        }
        const children = this.$children.length
          ? this.$children
          : this.$el.children
        if (children) {
          const selected = Array.from(children).filter((item) => {
            return this.isItemSelected(item.$el || item)
          })
          // If shift was held during mousedown the new selection is added to the current. Otherwise the new selection
          // will be selected
          this.selectedItems = this.concat ? uniqueArray(this.selectedItems.concat(selected)) : selected
        }
      }
    },
    onMouseUp () {
      // Clean up event listeners
      window.removeEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mousedown', this.onMouseMove)
      window.removeEventListener('mouseup', this.onMouseUp)
      // Reset state
      this.mouseDown = false
      this.concat = false
      this.startPoint = null
      this.endPoint = null
    },
    isItemSelected (el) {
      if (el.classList.contains(this.selectorClass)) {
        const boxA = this.selectionBox
        const boxB = {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.clientWidth,
          height: el.clientHeight
        }
        return !!(
          boxA.left <= boxB.left + boxB.width &&
            boxA.left + boxA.width >= boxB.left &&
            boxA.top <= boxB.top + boxB.height &&
            boxA.top + boxA.height >= boxB.top
        )
      }
      return false
    },
    keydownHandler (event) {
      if (event.key === 'Escape') {
        this.selectedItems = []
      }
    }
  }
}
</script>

<style>
.vue-drag-select {
  position: relative;
  user-select: none;
}
.vue-drag-select-box {
  position: absolute;
  z-index: 99;
}
</style>
