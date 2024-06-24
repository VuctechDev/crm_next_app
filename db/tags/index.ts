import { query } from "@/db";
import { UserType } from "@/db/users";

export interface TagType {
  _id: number;
  tag: string;
  description: string;
  color: string;
  organization: string;
  user: UserType;
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

export const getTag = async (tagName: string): Promise<TagType | null> => {
  try {
    const data = await query<TagType[]>(
      `SELECT * FROM ${tableName} WHERE tag = '${tagName}'`
    );
    return data?.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const getTags = async (organizationId: string): Promise<TagType[]> => {
  try {
    const data = await query<TagType[]>(
      `SELECT * FROM ${tableName} WHERE organization = '${organizationId}'`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getConfigPublic = async (userId: string) => {
  try {
    const data = await query<DBTagType[]>(
      `SELECT createdAt, email, updatedAt, user, _id FROM ${tableName} WHERE user = '${userId}'`
    );
    return data?.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};
