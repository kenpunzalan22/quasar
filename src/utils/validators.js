import { isEmpty, isEmptyArray, isNullOrUndefined } from "./index";

// 👉 Required Validator
export const requiredValidator = (value) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return "This field is required";

  return !!String(value).trim().length || "This field is required";
};

// 👉 Email Validator
export const emailValidator = (value) => {
  if (isEmpty(value)) return true;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (Array.isArray(value))
    return (
      value.every((val) => re.test(String(val))) ||
      "The Email field must be a valid email"
    );

  return re.test(String(value)) || "The Email field must be a valid email";
};

// 👉 Password Validator
export const passwordValidator = (password) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;
  const validPassword = regExp.test(password);

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
    "Field must contain at least one uppercase, lowercase, special character and digit with min 8 chars"
  );
};

// 👉 Confirm Password Validator
export const confirmedValidator = (value, target) =>
  value === target || "The Confirm Password field confirmation does not match";

// 👉 Between Validator
export const betweenValidator = (value, min, max) => {
  const valueAsNumber = Number(value);

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Enter number between ${min} and ${max}`
  );
};

// 👉 Integer Validator
export const integerValidator = (value) => {
  if (isEmpty(value)) return true;
  if (Array.isArray(value))
    return (
      value.every((val) => /^-?[0-9]+$/.test(String(val))) ||
      "This field must be an integer"
    );

  return /^-?[0-9]+$/.test(String(value)) || "This field must be an integer";
};

// 👉 Regex Validator
export const regexValidator = (value, regex) => {
  if (isEmpty(value)) return true;
  let regeX = regex;
  if (typeof regeX === "string") regeX = new RegExp(regeX);
  if (Array.isArray(value))
    return value.every((val) => regexValidator(val, regeX));

  return regeX.test(String(value)) || "The Regex field format is invalid";
};

// 👉 Alpha Validator
export const alphaValidator = (value) => {
  if (isEmpty(value)) return true;

  return (
    /^[A-Z]*$/i.test(String(value)) || "May only contain alphabetic characters"
  );
};

// 👉 URL Validator
export const urlValidator = (value) => {
  if (isEmpty(value)) return true;
  const re =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  return re.test(String(value)) || "URL is invalid";
};

// 👉 Length Validator
export const lengthValidator = (value, length) => {
  if (isEmpty(value)) return true;

  return (
    String(value).length === length ||
    `The Min Character field must be at least ${length} characters`
  );
};

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value) => {
  if (isEmpty(value)) return true;
  const valueAsString = String(value);

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || "All Character are not valid";
};

// 👉 Philhealth Pin Validator
export const philhealthPinValidator = (value) => {
  if (isEmpty(value)) return true;
  const valueAsString = String(value);

  return /^\d{12}$/i.test(valueAsString) || "Invalid Pin. Must be 12 digits";
};

// 👉 Name Validator
export const nameValidator = (value) => {
  if (isEmpty(value)) return true;

  return (
    /^[a-zA-Z\s-ñÑ]+$/i.test(value) ||
    "Invalid Name. Names may only contain alphabetic characters, spaces, and dashes"
  );
};

// 👉 Phone Validator
export const phoneValidator = (value) => {
  if (isEmpty(value)) return true;

  return (
    /^09\d{9}$/i.test(value) ||
    "Invalid Phone. Must be 11 digits and start with 09"
  );
};

// 👉 Date Validator
export const dateValidator = (value) => {
  if (isEmpty(value)) return true;

  const regex = /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/;

  if (!regex.test(value)) {
    return "Invalid date format. Must be YYYY-MM-DD";
  }

  const [year, month, day] = value.split("-");
  const date = new Date(year, month - 1, day);

  return (
    (date.getFullYear() == year &&
      date.getMonth() + 1 == month &&
      date.getDate() == day) ||
    "Invalid date. Must be a valid date"
  );
};

// 👉 Past Date Validator
export const pastDateValidator = (value) => {
  if (isEmpty(value)) return true;

  let date = new Date(value);
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  return date <= new Date() || "Invalid Date. Must be today or a past date";
};

// 👉 Capitalized Validator
export const capitalizedValidator = (value) => {
  if (isEmpty(value)) return true;

  return value === value.toUpperCase() || "Invalid Input. Must be capitalized";
};
