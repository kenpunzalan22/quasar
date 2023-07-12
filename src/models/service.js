import CustomInput from "components/CustomInput.vue";
import { requiredValidator } from "src/utils/validators";
import { createInputFields, createTableColumns } from "models/functions";

const model = [
  {
    component: CustomInput,
    model: "code",
    attrs: {
      label: "Code",
      rules: [requiredValidator],
    },
    col: 12,
  },
  {
    component: CustomInput,
    model: "name",
    attrs: {
      label: "Name",
      rules: [requiredValidator],
    },
  },
];

export const createFields = (overrides = []) => createInputFields(model, overrides);

export const createColumns = () => createTableColumns(model);

export const getServices = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("services") || "[]"));
    }, 1000);
  });
};

export const createService = (data) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      let services = await getServices();
      data.id = patients.length + 1;
      services.push(data);
      localStorage.setItem("services", JSON.stringify(services));
      resolve(data);
    }, 1000);
  });
};

export const updateService = (code, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let services = await getServices();

      let index = services.findIndex((service) => service.code === code);
      if (index === -1) {
        reject("Service not found");
        return;
      }

      services[index] = { ...services[index], ...data };
      localStorage.setItem("services", JSON.stringify(services));
      resolve(services[index]);
    }, 1000);
  });
};

export const deleteService = (code) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let services = await getServices();

      let index = services.findIndex((service) => service.code === code);
      if (index === -1) {
        reject("Service not found");
        return;
      }

      services.splice(index, 1);
      localStorage.setItem("services", JSON.stringify(services));
      resolve(true);
    }, 1000);
  });
};
