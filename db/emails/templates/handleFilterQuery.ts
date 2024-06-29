export const handleFilterQuery = (query: Record<string, string>): string => {
  let result = "";

  const addCondition = (condition: string) => {
    result += result ? ` AND ${condition}` : condition;
  };

  Object.entries(query).forEach(([key, value]) => {
    if (key === "search") {
      addCondition(
        `(name LIKE '%${value}%' OR 
          description LIKE '%${value}%'
        )`
      );
    } else if (["user"].includes(key)) {
      addCondition(`${key} = '${value}'`);
    }
  });

  return result ? `WHERE ${result}` : "";
};
