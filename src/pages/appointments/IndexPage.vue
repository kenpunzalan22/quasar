<script setup>
import { getAppointments, createColumns } from "models/appointment";
import { createEncounter } from "src/models/encounter";
import { onMounted, ref, computed } from "vue";
import DeleteAppointment from "./DeleteAppointment.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const appointments = ref([]);
const columns = computed(() => createColumns());
const loading = ref(false);

const hospital = computed(() => JSON.parse(localStorage.getItem("hospital")));

const fetchItems = () => {
  loading.value = true;
  getAppointments().then((data) => {
    appointments.value = data;
    loading.value = false;
  });
};

const generateEncounter = (appointment) => {
  $q.dialog({
    title: "Generate Encounter",
    message: "Are you sure you want to generate an encounter?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    $q.loading.show();
    console.log(appointment);
    createEncounter({
      hospital_number: appointment.patient.hospital_number,
      department_code: appointment.service.value,
      type: appointment.type,
    })
      .then(() => {
        $q.notify({
          message: "Encounter generated successfully",
          color: "positive",
        });
        $q.loading.hide();
      })
      .catch(() => {
        $q.notify({
          message: "Failed to generate encounter",
          color: "negative",
        });
        $q.loading.hide();
      });
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
              <q-btn
                v-if="hospital"
                color="primary"
                flat
                dense
                round
                icon="assignment_add"
                @click="generateEncounter(props.row)"
              />

              <delete-appointment :id="props.row.id" @reload="fetchItems" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>
