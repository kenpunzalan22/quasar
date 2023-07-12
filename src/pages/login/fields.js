import CustomInput from "components/CustomInput.vue";
import { deepReplace } from "utils/objects";
import { requiredValidator } from "utils/validators";

export default (overrides = []) => {
  const fields = [
    {
      component: CustomInput,
      model: "username",
      attrs: {
        label: "Username",
        rules: [requiredValidator],
      },
      col: 12,
    },
    {
      component: CustomInput,
      model: "password",
      attrs: {
        label: "Password",
        rules: [requiredValidator],
      },
      col: 12,
    },
  ];

  return overrides.reduce((fields, override) => {
    const index = fields.findIndex((field) => field.model === override.model);

    if (index === -1) return fields;

    fields[index] = deepReplace(fields[index], override);
    return fields;
  }, fields);
};
