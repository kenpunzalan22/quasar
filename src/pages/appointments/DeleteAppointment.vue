<script setup>
import { useQuasar } from "quasar";
import { deleteAppointment } from "models/appointment";

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(["reload"]);

const $q = useQuasar();

const deleteItem = () => {
  $q.dialog({
    title: "Confirm",
    message: `Are you sure you want to delete?`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    $q.loading.show();
    await deleteAppointment(props.id);
    $q.loading.hide();
    emit("reload");
  });
};
</script>

<template>
  <q-btn round flat size="sm" color="red" icon="delete" @click="deleteItem" />
</template>
