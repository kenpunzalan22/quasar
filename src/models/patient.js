import CustomInput from "components/CustomInput.vue";
import CustomSelect from "components/CustomSelect.vue";
import SearchPatientComponent from "components/SearchPatient.vue";
import {
  requiredValidator,
  phoneValidator,
  nameValidator,
  dateValidator,
  pastDateValidator,
} from "utils/validators";
import { createInputFields, createTableColumns } from "models/functions";
import { emailValidator } from "src/utils/validators";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "src/boot/firebaseConnection";
import { api } from "boot/axios"

const model = [
  {
    component: SearchPatientComponent,
    model: "hospital_number",
    attrs: {
      label: "Hospital Number",
    },
    col: 6,
    authOnly: true,
  },
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
      rules: [requiredValidator, emailValidator],
    },
    col: 6,
  },
];

export const createFields = (overrides = []) =>
  createInputFields(model, overrides);

export const createColumns = () => createTableColumns(model);

export const getPatients = async () => {
  // return new Promise((resolve) => {
  //   setTimeout(function () {
  //     resolve(JSON.parse(localStorage.getItem("patients") || "[]"));
  //   }, 1000);
  // });

  const querySnapshot = await getDocs(collection(db, "patients"));

  let patients = [];
  querySnapshot.forEach((doc) => {
    patients.push({ ...doc.data(), id: doc.id });
  });

  return patients;
};

export const createPatient = async (data) => {
  // return new Promise((resolve) => {
  //   setTimeout(async () => {
  //     let patients = await getPatients();
  //     data.id = patients.length + 1;
  //     patients.push(data);
  //     localStorage.setItem("patients", JSON.stringify(patients));
  //     resolve(data);
  //   }, 1000);
  // });

  const docRef = await addDoc(collection(db, "patients"), data);

  return docRef.id;
};

export const updatePatient = async (id, data) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     let patients = await getPatients();

  //     let index = patients.findIndex((patient) => patient.id === id);
  //     if (index === -1) {
  //       reject("Patient not found");
  //       return;
  //     }

  //     patients[index] = { ...patients[index], ...data };
  //     localStorage.setItem("patients", JSON.stringify(patients));
  //     resolve(patients[index]);
  //   }, 1000);
  // });

  await setDoc(doc(db, "patients", id), data);

  return id
};

export const deletePatient = async (id) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     let patients = await getPatients();

  //     let index = patients.findIndex((patient) => patient.id === id);
  //     if (index === -1) {
  //       reject("Patient not found");
  //       return;
  //     }

  //     patients.splice(index, 1);
  //     localStorage.setItem("patients", JSON.stringify(patients));
  //     resolve(patients[index]);
  //   }, 1000);
  // });

  await deleteDoc(doc(db, "patients", id));

  return id
};

export const searchPatient = async (lastName = null, firstName = null, middleName = null) => {
  const query = {}

  if (lastName && lastName.length > 0) {
    query.patlast = lastName
  }

  if (firstName && firstName.length > 0) {
    query.patfirst = firstName
  }

  if (middleName && middleName.length > 0) {
    query.patmiddle = middleName
  }

  const response = await api.get("/api/patients?" + Object.entries(query).map(([key, val]) => `${key}=${val}`).join('&'))

  return response.data.data
}
