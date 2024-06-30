import { countries } from "@/lib/shared/consts/countries";

export const handleFilterQuery = (query: Record<string, string>): string => {
  let result = "";

  const addCondition = (condition: string) => {
    result += result ? ` AND ${condition}` : condition;
  };

  Object.entries(query).forEach(([key, value]) => {
    if (key === "search") {
      addCondition(
        `(firstName LIKE '%${value}%' OR lastName LIKE '%${value}%' OR email LIKE '%${value}%')`
      );
    } else if (["role", "industry"].includes(key)) {
      addCondition(`${key} LIKE '%${value}%'`);
    } else if (key === "country") {
      const choices = countries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      const query = choices.reduce((prev, choice) => {
        if (prev) {
          return `${prev} OR ${key} = '${choice.iso3}'`;
        }
        return `${key} = '${choice.iso3}'`;
      }, "");

      addCondition(`(${query})`);
    } else if (["owner"].includes(key)) {
      addCondition(`${key} = '${value}'`);
    } else if (["tags"].includes(key)) {
      addCondition(`JSON_CONTAINS(${key}, '${value}', '$')`);
    }
  });

  return result ? `WHERE ${result} AND archived = 0` : "";
};
