<template>
  <!--  Todo: vertical align-->
  <b-row
    v-if="!ready"
    class="text-center h-100"
  >
    <b-col class="text-center my-auto">
      <div class="loader-bubble loader-bubble-primary" />
    </b-col>
  </b-row>
  <div v-else>
    <slot name="contents" />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    ready: {
      type: Boolean,
      required: true
    }
  }
}
</script>
