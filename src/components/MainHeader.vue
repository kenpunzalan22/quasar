<script setup>
import { useQuasar } from "quasar";
import { onMounted, computed } from "vue";

const $q = useQuasar();

const title = computed(() => process.env.APP_NAME);

onMounted(() => {
  if (localStorage.getItem("dark") === "true") {
    $q.dark.set(true);
  }
});

const toggleDark = () => {
  $q.dark.toggle();
  localStorage.setItem("dark", $q.dark.isActive);
};
</script>

<template>
  <q-toolbar flat class="q-pl-lg q-pr-md q-py-sm no-wrap doc-header__primary">
    <img src="~assets/favicon-96x96.png" height="50" />

    <div class="q-mx-md">
      {{ title }}
    </div>

    <q-space />

    <div class="text-size-16 gt-700">
      <q-btn
        flat
        class="text-weight-bold text-size-16 letter-spacing-300"
        style="padding: 8px 12px; min-width: 0; min-height: 0"
      >
        DOCS
      </q-btn>
      <q-btn
        flat
        class="text-weight-bold text-size-16 letter-spacing-300"
        style="padding: 8px 12px; min-width: 0; min-height: 0"
      >
        GITHUB
      </q-btn>
      <q-btn
        flat
        class="text-weight-bold text-size-16 letter-spacing-300"
        style="padding: 8px 12px; min-width: 0; min-height: 0"
      >
        WEBSITE
      </q-btn>
    </div>

    <q-btn
      round
      flat
      :icon="$q.dark.isActive ? 'wb_sunny' : 'dark_mode'"
      :color="$q.dark.isActive ? 'yellow' : 'blue'"
      @click="toggleDark"
    />
  </q-toolbar>

  <q-separator />
</template>
