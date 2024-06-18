const excludeKeys = ["page", "limit"];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getCSVFileName = (query: string) => {
  const params = new URLSearchParams(query);
  const values: string[] = [];
  params.forEach((value, key) => {
    if (!excludeKeys.includes(key)) {
      values.push(capitalize(value));
    }
  });

  return values.length ? `(${values.join(", ")})` : "";
};
