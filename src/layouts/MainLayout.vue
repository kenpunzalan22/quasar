<script setup>
import { computed } from "vue";
import routes from "src/router/routes";
import MainHeader from "components/MainHeader.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { logout } from "src/services/auth";

const $q = useQuasar();
const router = useRouter();

const tabs = computed(() =>
  routes
    .find((r) => r.path === "/auth")
    ?.children?.filter((r) => r.meta && r.meta.label)
    .map((r) => ({
      label: r.meta.label,
      icon: r.meta.icon,
      to: r.path,
    }))
);

const attemptLogout = () => {
  $q.loading.show();
  logout()
    .then(() => {
      localStorage.removeItem("user");
      router.push({ name: "login" });
    })
    .catch((error) => {
      $q.notify({
        color: "negative",
        message: "Logout failed.",
      });
    })
    .finally(() => {
      $q.loading.hide();
    });
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="doc-header header-toolbar doc-brand">
      <MainHeader />

      <q-toolbar flat class="q-pl-lg q-pr-md no-wrap doc-header__secondary">
        <q-tabs align="right">
          <q-route-tab
            v-for="(tab, index) in tabs"
            :key="index"
            no-caps
            :label="tab.label"
            :to="tab.to"
            style="
              padding: 8px 12px;
              min-width: 0;
              min-height: 0;
              font-weight: 700;
            "
            content-class="text-weight-bold text-size-14 letter-spacing-100"
          />
        </q-tabs>

        <q-space />

        <q-btn
          flat
          class="text-weight-bold text-size-14 letter-spacing-100"
          style="
            padding: 8px 12px;
            min-width: 0;
            min-height: 0;
            font-weight: 700;
          "
          @click="attemptLogout"
        >
          Logout
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="doc-technical">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
