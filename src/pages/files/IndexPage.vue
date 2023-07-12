<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <q-page padding>
    {{ route.name }}
  </q-page>
</template>
