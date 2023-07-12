<template>
  <q-input v-bind="{ ...defaultAttrs, ...$attrs }" v-on="$attrs" />
</template>

<script setup>
const defaultAttrs = {
  outlined: true,
  standout: "bg-primary text-white",
};
</script>
