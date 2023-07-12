import { isObject } from "./index";

/**
 * Recursively replaces properties in an object with the corresponding properties from a replacement object.
 * Nested properties are also replaced.
 *
 * @param {Object} original - The original object to perform replacement on.
 * @param {Object} replacement - The replacement object containing properties to merge into the original object.
 * @returns {void}
 */
export const deepReplace = (original, replacement) => {
  let obj = Object.assign({}, original);

  for (const key in replacement) {
    if (isObject(replacement[key])) {
      obj[key] = deepReplace(obj[key], replacement[key]);
      continue;
    }

    obj[key] = replacement[key];
  }

  return obj;
};
