import { query } from "@/db";
import { UserType } from "@/db/users";
import { handleFilterQuery } from "./handleFilterQuery";

export interface TagType {
  _id: number;
  tag: string;
  description: string;
  color: string;
  organization: string;
  user: UserType;
  leadsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagCreateType {
  tag: string;
  description: string;
  color: string;
  organization: string;
}

export interface DBTagType extends Omit<TagType, "user"> {
  user: string;
}

const tableName = "tags";

export const createNewTag = async (data: TagCreateType) => {
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
          tag,
          description,
          color,
          organization
          ) VALUES?`,
      [[data.tag, data.description, data.color, data.organization]]
    )) as { insertId: number };
    console.log("NEW TAG CREATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getTag = async (
  tagName: string,
  organizationId: string
): Promise<TagType | null> => {
  try {
    const data = await query<TagType[]>(
      `SELECT * FROM ${tableName} WHERE tag = '${tagName}' AND organization = '${organizationId}'`
    );
    return data?.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const getTags = async (organization: string): Promise<TagType[]> => {
  try {
    const data = await query<TagType[]>(
      `SELECT * FROM ${tableName} WHERE organization = '${organization}'`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedTags = async (
  filters: Record<string, string>,
  organizationId: string
): Promise<{
  data: TagType[];
  total: number;
}> => {
  try {
    const filtersQuery = handleFilterQuery({
      ...filters,
      organization: organizationId,
    });

    const total = (await query(
      `SELECT COUNT(*) AS total FROM ${tableName} ${filtersQuery}`
    )) as [{ total: number }];

    const offset = +filters?.page * +filters.limit;
    const data = await query<TagType[]>(
      `SELECT t.*, 
              (SELECT COUNT(*) 
               FROM leads l 
               WHERE JSON_CONTAINS(l.tags, CAST(t._id AS CHAR)) AND l.archived != 1) AS leadsCount
       FROM ${tableName} t
       ${filtersQuery}
       ORDER BY t._id DESC 
       LIMIT ${filters?.limit} 
       OFFSET ${offset}`
    );
    return { data, total: total?.[0]?.total ?? 0 };
  } catch (error) {
    throw error;
  }
};

export const updateTag = async (
  tagId: string,
  data: Partial<TagCreateType>
) => {
  try {
    await query(
      `UPDATE ${tableName} 
        SET tag = '${data?.tag}', 
        description = '${data?.description}',
        color = '${data?.color}'
      WHERE _id = ?`,
      [[tagId]]
    );
    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const removeTag = async (tagId: string) => {
  try {
    await query(`DELETE FROM ${tableName} WHERE _id = ?`, [[tagId]]);
    return { success: true };
  } catch (error) {
    throw error;
  }
};
