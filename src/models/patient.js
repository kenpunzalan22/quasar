import CustomInput from "components/CustomInput.vue";
import CustomSelect from "components/CustomSelect.vue";
import {
  requiredValidator,
  phoneValidator,
  nameValidator,
  dateValidator,
  pastDateValidator,
} from "utils/validators";
import { createInputFields, createTableColumns } from "models/functions";
import { emailValidator } from "src/utils/validators";

const model = [
  {
    component: CustomInput,
    model: "last_name",
    attrs: {
      label: "Last Name",
      rules: [requiredValidator, nameValidator],
    },
    col: 6,
  },
  {
    component: CustomInput,
    model: "first_name",
    attrs: {
      label: "First Name",
      rules: [requiredValidator, nameValidator],
    },
    col: 6,
  },
  {
    component: CustomInput,
    model: "middle_name",
    attrs: {
      label: "Middle Name",
      rules: [nameValidator],
    },
    col: 6,
  },
  {
    component: CustomSelect,
    model: "suffix_name",
    attrs: {
      label: "Suffix Name",
      options: ["Jr.", "Sr.", "I", "II", "III", "IV", "V"],
    },
    col: 6,
  },
  {
    component: CustomSelect,
    model: "sex",
    attrs: {
      label: "Sex",
      options: [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
      ],
      rules: [requiredValidator],
      emitValue: true,
      mapOptions: true,
    },
    col: 6,
    format: (val) => (val === "M" ? "Male" : "Female"),
  },
  {
    component: CustomInput,
    model: "birth_date",
    attrs: {
      label: "Date of Birth",
      mask: "####-##-##",
      rules: [requiredValidator, dateValidator, pastDateValidator],
      placeholder: "YYYY-MM-DD",
    },
    col: 6,
    format: (val) => (val ? new Date(val).toDateString() : ""),
  },
  {
    component: CustomInput,
    model: "contact",
    attrs: {
      label: "Contact Number",
      mask: "###########",
      rules: [requiredValidator, phoneValidator],
      placeholder: "09123456789",
    },
    col: 6,
  },
  {
    component: CustomInput,
    model: "email",
    attrs: {
      label: "Email Address",
      rules: [emailValidator],
    },
    col: 6,
  },
];

export const createFields = (overrides = []) => createInputFields(model, overrides);

export const createColumns = () => createTableColumns(model);

export const getPatients = () => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem("patients") || "[]"));
    }, 1000);
  });
};

export const createPatient = (data) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      let patients = await getPatients();
      data.id = patients.length + 1;
      patients.push(data);
      localStorage.setItem("patients", JSON.stringify(patients));
      resolve(data);
    }, 1000);
  });
};

export const updatePatient = (id, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let patients = await getPatients();

      let index = patients.findIndex((patient) => patient.id === id);
      if (index === -1) {
        reject("Patient not found");
        return;
      }

      patients[index] = { ...patients[index], ...data };
      localStorage.setItem("patients", JSON.stringify(patients));
      resolve(patients[index]);
    }, 1000);
  });
};

export const deletePatient = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let patients = await getPatients();

      let index = patients.findIndex((patient) => patient.id === id);
      if (index === -1) {
        reject("Patient not found");
        return;
      }

      patients.splice(index, 1);
      localStorage.setItem("patients", JSON.stringify(patients));
      resolve(patients[index]);
    }, 1000);
  });
};
