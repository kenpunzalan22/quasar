<script setup>
import { ref, computed, onMounted } from "vue";
import { createFields, createAppointment } from "models/appointment";
import { useQuasar } from "quasar";
import FormBuilder from "components/FormBuilder.vue";

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
  services: {
    type: Array,
    default: () => [],
  },
});

const $q = useQuasar();
const dialog = ref(false);
const appointment = ref({});

const fields = computed(() => {
  const fields = createFields([
    {
      model: "patient_id",
      attrs: {
        options: [
          {
            label: `${props.patient.first_name} ${props.patient.last_name}`,
            value: props.patient.id,
          },
        ],
        disable: true,
      },
    },
    {
      model: "service_id",
      attrs: {
        options: props.services,
      },
    },
  ]);

  return fields;
});

const openDialog = () => {
  appointment.value.patient_id = props.patient.id;
  dialog.value = true;
};

const submit = () => {
  $q.loading.show();
  createAppointment({
    ...appointment.value,
    patient: props.patient,
    service: props.services.find(
      (s) => s.value === appointment.value.service_id
    ),
  }).then(() => {
    dialog.value = false;
    $q.loading.hide();
    $q.notify({
      color: "positive",
      message: "Appointment created successfully",
    });
  });
};
</script>

<template>
  <q-btn
    round
    flat
    size="sm"
    color="primary"
    icon="calendar_month"
    :disable="!props.patient.hospital_number"
    @click="openDialog"
  />

  <q-dialog v-model="dialog">
    <q-card flat bordered style="max-width: 500px" class="q-mt-xl">
      <q-card-section align="center">
        <FormBuilder
          :fields="fields"
          title="Create Appointment"
          action-title="Submit"
          v-model="appointment"
          @submit="submit"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
