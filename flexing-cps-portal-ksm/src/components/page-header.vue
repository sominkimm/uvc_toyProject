<template>
  <b-container
    align-self="start"
    :fluid="true"
  >
    <breadcumb
      :page="page"
      :folder="folder"
      :routing="routing"
    />
    <span v-if="description">
      {{ description }}
      <a
        href
        style="text-decoration: none; color: #008abc; cursor: pointer; margin-left:3px;"
      >가이드 문서</a>
    </span>
  </b-container>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['page', 'folder', 'routing', 'description', 'guidelink']
}
</script>
