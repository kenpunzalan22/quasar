<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { createFields, createPatient } from "models/patient";
import FormBuilder from "components/FormBuilder.vue";
import CustomInput from "components/CustomInput.vue";
import { register, update } from "src/services/auth";
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();

const fields = computed(() => [
  ...createFields(),
  {
    component: CustomInput,
    model: "password",
    attrs: {
      label: "Password",
      type: "password",
    },
    col: 6,
    guestOnly: true,
  },
]);
const form = ref({});

const onSubmit = async () => {
  $q.loading.show();
  try {
    const user = await register({
      email: form.value.email,
      password: form.value.password,
      displayName: form.value.first_name + " " + form.value.last_name,
    });

    localStorage.setItem("user", JSON.stringify(user));

    const { password, ...patientData } = form.value;

    const patient = createPatient({
      ...patientData,
      user_id: user.uid,
    });

    router.push("/");
  } catch (error) {
    $q.notify({
      color: "negative",
      message: error.message,
    });
  } finally {
    $q.loading.hide();
  }
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
          guest
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
