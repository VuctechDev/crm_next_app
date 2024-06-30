import { query } from "@/db";
import { UserType } from "@/db/users";
import { handleFilterQuery } from "./handleFilterQuery";

export interface EmailTemplateType {
  _id: number;
  name: string;
  description: string;
  body: string;
  user: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateCreateType {
  name: string;
  description: string;
  body: string;
  user: string;
}

export interface DBTemplateType
  extends Omit<EmailTemplateType, "user" | "organization"> {
  user: string;
}

const tableName = "email_templates";

export const createNewTemplate = async (data: TemplateCreateType) => {
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
        name,
        description,
        body,
        user
        ) VALUES?`,
      [[data.name, data.description, data.body, data.user]]
    )) as { insertId: number };
    console.log("NEW TEMPLATE CREATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getTemplates = async (
  userId: string
): Promise<EmailTemplateType[]> => {
  try {
    const data = await query<EmailTemplateType[]>(
      `SELECT * FROM ${tableName} WHERE user = '${userId}'`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedTemplates = async (
  filters: Record<string, string>,
  user: string
): Promise<{
  data: EmailTemplateType[];
  total: number;
}> => {
  const filtersQuery = handleFilterQuery({ ...filters, user });
  try {
    const total = await query<[{ total: number }]>(
      `SELECT COUNT(*) AS total FROM ${tableName} ${filtersQuery}`
    );
    const offset = +filters?.page * +filters.limit;
    const data = await query<EmailTemplateType[]>(
      `SELECT * FROM ${tableName} 
      ${filtersQuery} 
      ORDER BY _id DESC 
      LIMIT ${filters?.limit}
      OFFSET ${offset};`
    );

    return { data: data, total: total?.[0]?.total ?? 0 };
  } catch (error) {
    throw error;
  }
};

export const updateTemplate = async (
  _id: string,
  data: Partial<TemplateCreateType>
) => {
  try {
    await query<TemplateCreateType[]>(
      `UPDATE ${tableName} 
      SET body = '${data.body}', name = '${data.name}', description = '${data.description}' 
      WHERE _id = ${_id}`
    );
    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const deleteTemplate = async (_id: string) => {
  try {
    await query<DBTemplateType[]>(
      `DELETE FROM ${tableName} WHERE _id = ${_id}`
    );
    return { success: true };
  } catch (error) {
    throw error;
  }
};
