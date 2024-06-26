import { TagType } from "@/db/tags";

const excludeKeys = ["page", "limit"];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const getCSVFileName = (query: string, data?: { tags?: TagType[] }) => {
  const params = new URLSearchParams(query);
  const values: string[] = [];
  params.forEach((value, key) => {
    if (!excludeKeys.includes(key)) {
      if (key === "tags" && data?.tags) {
        const tagName = data?.tags.find((tag) => tag._id === +value)?.tag ?? "";
        values.push(capitalize(tagName));
      } else {
        values.push(capitalize(value));
      }
    }
  });

  return values.length ? `(${values.join(", ")})` : "";
};
