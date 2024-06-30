import { getTagEmailLeadsData } from "@/db/leads";

export const handleTagEmails = async (tags: number[]) => {
  const leads = await getTagEmailLeadsData(tags);

  console.log(tags, leads);
};
