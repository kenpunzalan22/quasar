import { createTableColumns } from "models/functions";
import { api } from "boot/axios"

const model = [
  {
    model: "id",
    attrs: {
      label: "ID",
    },
  },
  {
    model: "hospital_number",
    attrs: {
      label: "Hospital Number",
    },
  },
  {
    model: "timestamp",
    attrs: {
      label: "Date",
    },
    field: (row) => row.timestamp,
    format: (val) => val.substring(0, 10),
  },
  {
    model: "type",
    attrs: {
      label: "type",
    },
    field: (row) => row.type,
    format: (val) => val === 'T' ? 'Online' : 'Face to Face',
  },
  {
    model: "patlast",
    attrs: {
      label: "Patient",
    },
    field: (row) => `${row.patlast}, ${row.patfirst}`,
  },
  {
    model: "department_name",
    attrs: {
      label: "Service",
    },
  },
];

export const createColumns = () => createTableColumns(model);

export const getEncounters = async (date = null) => {
  const response = await api.get("/api/encounters" + (date ? "?date=" + date : ""))

  return response.data.data
};

export const createEncounter = async (encounter) => {
  const response = await api.post("/api/encounters", encounter)

  return response.data
}
