import guest from "src/middlewares/guest";
import hospital from "src/middlewares/hospital";
import auth from "src/middlewares/auth";

export default [
  {
    path: "/",
    redirect: to => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        const hospital = JSON.parse(localStorage.getItem("hospital"));

        if (hospital) {
          return { name: "patients" };
        } else {
          return { name: "appointments" };
        }
      } else {
        return { name: "login" };
      }
    }
  },
  {
    path: "/guest",
    meta: {
      middleware: [guest]
    },
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
    meta: {
      middleware: [auth]
    },
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
          middleware: [hospital],
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
          middleware: [hospital],
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
