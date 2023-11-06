export const objectToFormData = (
  obj: Record<string, any>,
  formData = new FormData(),
  parentKey = ""
) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const propName = parentKey !== "" ? `${parentKey}[${key}]` : key;
      const propVal = obj[key];

      if (propVal instanceof File || typeof propVal === "string") {
        formData.append(propName, propVal);
      } else if (typeof propVal === "number" || typeof propVal === "boolean") {
        formData.append(propName, JSON.stringify(propVal));
      } else if (typeof propVal === "object") {
        objectToFormData(propVal, formData, propName);
      } else if (Array.isArray(propVal)) {
        propVal.forEach((v, idx) => {
          const arrayKey = `${propName}[]`;
          if (typeof propVal === "object") {
            objectToFormData(v, formData, arrayKey);
          } else {
            formData.append(arrayKey, v);
          }
        });
      }
    }
  }

  return formData;
};
