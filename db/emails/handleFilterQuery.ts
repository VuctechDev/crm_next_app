export const handleFilterQuery = (query: Record<string, string>): string => {
  let result = "";

  const addCondition = (condition: string) => {
    result += result ? ` AND ${condition}` : condition;
  };

  Object.entries(query).forEach(([key, value]) => {
    if (key === "search") {
      addCondition(
        `(emails.to LIKE '%${value}%' OR 
          emails.subject LIKE '%${value}%'
        )`
      );
    } else if (["status"].includes(key)) {
      if (value === "sent") {
        addCondition(`emails.open = 0`);
      } else {
        addCondition(`emails.open = 1`);
      }
    } else if (["organization"].includes(key)) {
      addCondition(`emails.organization = ${value}`);
    }
  });

  return result ? `WHERE ${result}` : "";
};
// WHERE emails.organization = ${organization}
