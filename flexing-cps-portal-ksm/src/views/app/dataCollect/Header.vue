<template>
  <b-container
    align-self="start"
    fluid
  >
    <breadcumb
      :page="$t('dataAnalysis.eda')"
      :folder="$t('dataAnalysis.index')"
    />
    <span>
      {{ $t('profileMaker.description.oriDataReport') }}
      <a
        href
        style="text-decoration: none; color: #008abc; cursor: pointer; margin-left:3px;"
      >{{ $t('common.guideDocument') }}</a>
    </span>
  </b-container>
</template>
