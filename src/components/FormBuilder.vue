<script setup>
import { ref, computed } from "vue";

const form = ref(null);
const props = defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    required: false,
  },
  actionTitle: {
    type: String,
    default: "Submit",
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["submit", "update:modelValue"]);

const onSubmit = () => {
  form.value.validate().then((success) => {
    if (success) {
      emit("submit");
    }
  });
};

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <slot name="title">
    <div
      align="center"
      class="text-weight-bold text-size-16 letter-spacing-300 q-mt-md q-mb-lg"
      v-if="props.title"
    >
      {{ props.title }}
    </div>
  </slot>

  <q-form ref="form" class="row" @submit.prevent="onSubmit">
    <div
      v-for="field in props.fields"
      :key="field.model"
      :class="`col-${field.col || 12} q-mb-md`"
    >
      <component
        :is="field.component"
        v-bind="field.attrs"
        v-model="model[field.model]"
        class="q-mx-sm"
      />
    </div>

    <slot name="action">
      <q-btn color="primary" class="q-mt-lg full-width" type="submit">
        {{ props.actionTitle }}
      </q-btn>
    </slot>
  </q-form>
</template>
