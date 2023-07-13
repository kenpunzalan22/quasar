<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { createFields, createPatient } from "models/patient";
import FormBuilder from "components/FormBuilder.vue";

const router = useRouter();

const fields = computed(() => createFields());
const form = ref({});

const onSubmit = () => {
  createPatient(form.value);
  router.push({ name: "patients" });
};
</script>

<template>
  <q-page class="flex flex-center">
    <q-card flat bordered style="max-width: 800px" class="q-mt-xl">
      <q-card-section align="center">
        <FormBuilder
          :fields="fields"
          title="Patient Registration Form"
          actionTitle="Register"
          v-model="form"
          @submit="onSubmit"
        />
      </q-card-section>

      <q-card-section>
        <div align="center">
          Already have an account?
          <q-btn
            flat
            no-caps
            class="q-px-xs"
            @click="router.push({ name: 'login' })"
          >
            Login
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
