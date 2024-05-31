export const handleTableQuery = (filters: Record<string, string>): string => {
  let query = "";
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (query) {
        // query += `&filter[${key}]=${value}`;
        query += `&${key}=${value}`;
      } else {
        query += `${key}=${value}`;
        // query += `filter[${key}]=${value}`;
      }
    }
  });

  return query ? "?" + query : query;
};
