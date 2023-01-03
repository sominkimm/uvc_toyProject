<template>
  <span class="icon-arrow">
    <span class="when-opened">
      <i class="dd-arrow i-Arrow-Up" />
    </span>
    <span class="when-closed">
      <i class="dd-arrow i-Arrow-Down" />
    </span>
  </span>
</template>
<style>
.collapsed > a .when-opened,
:not(.collapsed) > a .when-closed {
  display: none;
}
</style>
