export const handleRequestQuery = (query: Record<string, string>): string => {
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
    }
  });

  return result ? `WHERE ${result}` : "";
};
