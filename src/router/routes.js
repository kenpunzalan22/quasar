export default [
  {
    path: "/guest",
    component: () => import("layouts/GuestLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "login" },
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/login/IndexPage.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/registration/IndexPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "patients" },
      },
      {
        path: "patients",
        name: "patients",
        component: () => import("pages/patients/IndexPage.vue"),
        meta: {
          label: "Patients",
          icon: "personal_injury",
        },
      },
      {
        path: "appointments",
        name: "appointments",
        component: () => import("pages/appointments/IndexPage.vue"),
        meta: {
          label: "Appointments",
          icon: "event",
        },
      },
      {
        path: "chats",
        name: "chats",
        component: () => import("pages/chats/IndexPage.vue"),
        meta: {
          label: "Chats",
          icon: "question_answer",
        },
      },
      {
        path: "consultations",
        name: "consultations",
        component: () => import("pages/consultations/IndexPage.vue"),
        meta: {
          label: "Consultations",
          icon: "medical_services",
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
