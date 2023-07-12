<script setup>
import MainHeader from "components/MainHeader.vue";
</script>

<template>
  <q-layout view="hHh Lpr fFf">
    <q-header bordered class="doc-header header-toolbar doc-brand">
      <MainHeader />
    </q-header>

    <q-page-container class="doc-technical">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
