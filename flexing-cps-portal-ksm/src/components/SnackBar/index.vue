<template>
  <b-snackbar
    v-model="show"
    :color="color"
    :timeout="5000"
    :top="true"
    multi-line
  >
    {{ message }}
    <template #action="{ attrs }">
      <b-btn
        v-bind="attrs"
        text
        @click="show = false"
      >
        Close
      </b-btn>
    </template>
  </b-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  data: () => ({
    show: true,
    message: '',
    color: ''
  }),
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>
