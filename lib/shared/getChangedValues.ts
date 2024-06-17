export const getChangedValues = <T>(newValues: any, initialValues: any): T => {
  const changedValues = {} as T;
  (Object.keys(newValues) as (keyof T)[]).forEach((key) => {
    if (key && newValues[key] !== initialValues[key]) {
      changedValues[key] = newValues[key];
    }
  });
  return changedValues;
};

export const getChangedValuesQuery = (values: Record<any, any>): string => {
  const entries = Object.entries(values);
  if (!entries?.length) {
    throw new Error("nothingChanged");
  }
  let query = "";
  entries.forEach(([key, value]) => {
    if (query) {
      query += ` , ${key} = '${value}'`;
    } else {
      query += `${key} = '${value}'`;
    }
  });
  return query;
};
