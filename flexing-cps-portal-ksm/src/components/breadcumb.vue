<template>
  <div>
    <div class="breadcrumb">
      <slot name="header">
        <h1>{{ page }}</h1>
        <ul>
          <li>
            <a
              style="cursor: pointer;"
              @click="routerPush(routing)"
            >
              {{ folder }}
            </a>
          </li>
          <li>{{ page }}</li>
        </ul>
      </slot>
    </div>
    <div class="separator-breadcrumb border-top" />
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['page', 'folder', 'routing'],
  methods: {
    routerPush (addr) {
      this.$router.push(addr)
    }
  }
}
</script>
