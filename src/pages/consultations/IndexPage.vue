<script setup>
import { createColumns, getEncounters } from "models/encounter";
import { computed, watchEffect, ref } from "vue";

const date = ref(new Date().toISOString().substring(0, 10));
const rows = ref([]);
const columns = computed(() => createColumns());

const loading = ref(false);

watchEffect(() => {
  loading.value = true;
  getEncounters(date.value).then((data) => {
    rows.value = data;
    loading.value = false;
  });
});
</script>

<template>
  <q-page padding>
    <q-card flat bordered>
      <q-toolbar flat>
        <q-toolbar-title> Encounters </q-toolbar-title>

        <q-input
          dense
          outlined
          class="q-my-sm"
          v-model="date"
          mask="date"
          readonly
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date minimal v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-toolbar>
      <q-separator />

      <q-table
        :loading="loading"
        :rows="rows"
        :columns="columns"
        row-key="name"
        flat
      />
    </q-card>
  </q-page>
</template>
