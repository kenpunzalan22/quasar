<script setup>
import { ref, computed, onMounted } from "vue";
import { createFields, createAppointment } from "models/appointment";
import { getServices } from "models/service";
import { useQuasar } from "quasar";
import FormBuilder from "components/FormBuilder.vue";

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
});

const $q = useQuasar();
const dialog = ref(false);
const appointment = ref({});
const services = ref([]);

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
        options: services.value,
      },
    },
  ]);

  return fields;
});

const openDialog = () => {
  appointment.value.patient_id = props.patient.id;
  dialog.value = true;
};

onMounted(async () => {
  services.value = await getServices().then((ser) =>
    ser.map((s) => ({ label: s.name, value: s.code }))
  );
});

const submit = () => {
  $q.loading.show();
  createAppointment({
    ...appointment.value,
    patient: props.patient,
    service: services.value.find(
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
