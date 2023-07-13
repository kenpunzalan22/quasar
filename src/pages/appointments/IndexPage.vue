<script setup>
import { getAppointments, createColumns } from "models/appointment";
import { onMounted, ref, computed } from "vue";
import DeleteAppointment from "./DeleteAppointment.vue";

const appointments = ref([]);
const columns = computed(() => createColumns());
const loading = ref(false);

const fetchItems = () => {
  loading.value = true;
  getAppointments().then((data) => {
    appointments.value = data;
    loading.value = false;
  });
};

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <q-page padding>
    <q-card flat bordered>
      <q-toolbar flat>
        <q-toolbar-title> Appointments </q-toolbar-title>
      </q-toolbar>

      <q-table
        :loading="loading"
        :rows="appointments"
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
              <delete-appointment :id="props.row.id" @reload="fetchItems" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>
