<script setup>
import { createColumns, getPatients } from "models/patient";
import { computed, onMounted, ref, watch } from "vue";
import AddEditDialog from "pages/patients/AddEditDialog.vue";
import DeletePatient from "./DeletePatient.vue";
import CreateAppointment from "./CreateAppointment.vue";
import ViewChats from "./ViewChats.vue";

const rows = ref([]);
const columns = computed(() => createColumns());

const dialog = ref(false);
const selectedPatient = ref({});
const loading = ref(false);

const fetchItems = () => {
  loading.value = true;
  getPatients().then((data) => {
    rows.value = data;
    loading.value = false;
  });
};

const selectItem = (item) => {
  selectedPatient.value = item;
  dialog.value = true;
};

onMounted(() => fetchItems());

watch(dialog, (value) => {
  if (!value) {
    selectedPatient.value = {};
    fetchItems();
  }
});
</script>

<template>
  <q-page padding>
    <q-card flat bordered>
      <q-toolbar flat>
        <q-toolbar-title> Patients </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="add"
          color="primary"
          @click="dialog = true"
        />
      </q-toolbar>
      <q-separator />

      <q-table
        :loading="loading"
        :rows="rows"
        :columns="[
          ...columns,
          { name: 'actions', label: 'Actions', align: 'center' },
        ]"
        row-key="name"
        flat
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="column in columns" :key="column.name" :props="props">
              {{ column.format(column.field(props.row)) }}
            </q-td>

            <q-td align="center">
              <ViewChats :patient="props.row" />

              <CreateAppointment :patient="props.row" />

              <q-btn
                round
                flat
                size="sm"
                color="orange"
                icon="edit"
                @click="selectItem(props.row)"
              />

              <DeletePatient :id="props.row.id" @reload="fetchItems" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>

    <AddEditDialog
      v-model="dialog"
      v-model:selected-patient="selectedPatient"
    />
  </q-page>
</template>
