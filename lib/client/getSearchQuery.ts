import parse from "query-string";

export const getSearchQuery = (key: string) => {
  if (typeof window !== "undefined") {
    const parsed = parse.parse(window?.location?.search);
    return (parsed[key] as string) ?? "";
  }
  return "";
};
