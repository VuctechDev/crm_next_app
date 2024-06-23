import { query } from "@/db";
import { UserType } from "@/db/users";

export interface EmailConfigType {
  _id: number;
  host: string;
  email: string;
  password: string;
  iv: string;
  port: string;
  organization: string;
  user: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface EmailConfigPublic {
  _id: number;
  email: string;
  user: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface EmailConfigCreateType {
  host: string;
  email: string;
  password: string;
  iv: string;
  port: string;
  organization: string;
  user: string;
}

export interface DBEmailConfigType extends Omit<EmailConfigType, "user"> {
  user: string;
}

const tableName = "email_configs";

export const createNewConfig = async (data: EmailConfigCreateType) => {
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
          host,
          email,
          password,
          iv,
          port,
          user,
          organization
          ) VALUES?`,
      [
        [
          data.host,
          data.email,
          data.password,
          data.iv,
          data.port,
          data.user,
          data.organization,
        ],
      ]
    )) as { insertId: number };
    console.log("NEW EMAIL CONFIG CREATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getConfig = async (userId: string) => {
  try {
    const data = await query<EmailConfigType[]>(
      `SELECT * FROM ${tableName} WHERE user = '${userId}'`
    );
    return data?.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const getConfigPublic = async (userId: string) => {
  try {
    const data = await query<DBEmailConfigType[]>(
      `SELECT createdAt, email, updatedAt, user, _id FROM ${tableName} WHERE user = '${userId}'`
    );
    return data?.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};
