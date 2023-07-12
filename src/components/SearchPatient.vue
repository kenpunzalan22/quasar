<template>
  <q-input
    v-bind="{ ...defaultAttrs, ...$attrs, ...props }"
    v-on="$attrs"
    @click="dialog = true"
  />

  <q-dialog v-model="dialog">
    <q-card flat bordered style="max-width: 800px" class="q-mt-xl">
      <q-card-section>
        <div
          align="center"
          class="text-weight-bold text-size-16 letter-spacing-300 q-mt-md q-mb-lg"
        >
          Search Hospital Record
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="row" @submit.prevent="search">
          <div class="col-12 col-sm-6 col-md-3 q-pa-xs">
            <CustomInput
              hide-bottom-space
              v-model="data.patlast"
              label="Last Name"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3 q-pa-xs">
            <CustomInput
              hide-bottom-space
              v-model="data.patfirst"
              label="First Name"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3 q-pa-xs">
            <CustomInput
              hide-bottom-space
              v-model="data.patmiddle"
              label="Middle Name"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3 q-pa-xs">
            <q-btn
              color="primary"
              class="full-width"
              type="submit"
              :loading="loading"
            >
              Search
            </q-btn>
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="rows"
          :columns="[
            ...columns,
            { name: 'actions', label: 'Actions', align: 'center' },
          ]"
          row-key="name"
          flat
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="column in columns" :key="column.name" :props="props">
                {{ props.row[column.field] }}
              </q-td>

              <q-td align="center">
                <q-btn
                  flat
                  size="sm"
                  color="primary"
                  @click="select(props.row)"
                >
                  Select
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import CustomInput from "components/CustomInput.vue";
import { searchPatient } from "src/models/patient";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const defaultAttrs = {
  outlined: true,
  standout: "bg-primary text-white",
  readonly: true,
};

const data = reactive({
  patlast: "",
  patfirst: "",
  patmiddle: "",
});

const dialog = ref(false);
const loading = ref(false);
const rows = ref([]);

const search = () => {
  loading.value = true;
  searchPatient(data.patlast, data.patfirst, data.patmiddle)
    .then((data) => {
      rows.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
};

const select = (row) => {
  emit("update:modelValue", row.hospital_number);
  console.log(row.hospital_number);
  dialog.value = false;
};

const columns = [
  {
    name: "hospital_number",
    label: "Hospital Number",
    field: "hospital_number",
    sortable: true,
  },
  { name: "patlast", label: "Last Name", field: "patlast", sortable: true },
  { name: "patfirst", label: "First Name", field: "patfirst", sortable: true },
  {
    name: "patmiddle",
    label: "Middle Name",
    field: "patmiddle",
    sortable: true,
  },
  {
    name: "patsuffix",
    label: "Suffix Name",
    field: "patsuffix",
    sortable: true,
  },
  { name: "patsex", label: "Sex", field: "patsex", sortable: true },
  { name: "patbdate", label: "Birthdate", field: "patbdate", sortable: true },
];
</script>
