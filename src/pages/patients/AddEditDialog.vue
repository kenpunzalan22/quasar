<script setup>
import { computed } from "vue";
import { createFields, createPatient, updatePatient } from "models/patient";
import FormBuilder from "components/FormBuilder.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  selectedPatient: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "update:selectedPatient"]);

const fields = computed(() => createFields());

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const patient = computed({
  get: () => props.selectedPatient,
  set: (value) => emit("update:selectedPatient", value),
});

const submit = async () => {
  $q.loading.show();
  if (patient.value.id) {
    await updatePatient(patient.value.id, patient.value);
  } else {
    await createPatient(patient.value);
  }
  $q.loading.hide();
  dialog.value = false;
};
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card flat bordered style="max-width: 800px" class="q-mt-xl">
      <q-card-section align="center">
        <FormBuilder
          :fields="fields"
          :title="patient.id ? 'Edit Patient' : 'Add New Patient'"
          :actionTitle="patient.id ? 'Update' : 'Create'"
          v-model="patient"
          @submit="submit"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
