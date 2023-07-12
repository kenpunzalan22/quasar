<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import FormBuilder from "components/FormBuilder.vue";
import createFields from "./fields.js";

const router = useRouter();

const onSubmit = () => {
  router.push({ name: "patients" });
};

const fields = computed(() => createFields());
const form = ref({});
</script>

<template>
  <q-page class="flex flex-center">
    <q-card flat bordered style="width: 400">
      <q-card-section>
        <FormBuilder
          :fields="fields"
          title="LOGIN"
          actionTitle="Login"
          v-model="form"
          @submit="onSubmit"
        />
      </q-card-section>

      <q-card-section>
        <div align="center">
          Don't have an account?
          <q-btn
            flat
            no-caps
            class="q-px-xs"
            @click="router.push({ name: 'register' })"
          >
            Register
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
