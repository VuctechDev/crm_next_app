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
    } else if (["country", "role", "industry"].includes(key)) {
      addCondition(`${key} LIKE '%${value}%'`);
    } else if (["owner"].includes(key)) {
      addCondition(`${key} = '${value}'`);
    } else if (["tags"].includes(key)) {
      addCondition(`JSON_CONTAINS(${key}, '${value}', '$')`);
    }
  });

  return result ? `WHERE ${result} AND archived = 0` : "";
};
