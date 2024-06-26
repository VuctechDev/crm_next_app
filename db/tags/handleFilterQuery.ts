export const handleFilterQuery = (query: Record<string, string>): string => {
  let result = "";

  const addCondition = (condition: string) => {
    result += result ? ` AND ${condition}` : condition;
  };

  Object.entries(query).forEach(([key, value]) => {
    if (key === "search") {
      addCondition(`(tag LIKE '%${value}%' OR description LIKE '%${value}%')`);
    } else if (["organization"].includes(key)) {
      addCondition(`organization = '${value}'`);
    }
  });

  return result ? `WHERE ${result}` : "";
};
