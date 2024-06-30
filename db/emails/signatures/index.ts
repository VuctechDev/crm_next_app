import { query } from "@/db";
import { UserType } from "@/db/users";

export interface SignatureType {
  _id: number;
  body: string;
  user: UserType;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignatureCreateType {
  body: string;
  user: string;
}

export interface DBCommentType
  extends Omit<SignatureType, "user" | "organization"> {
  user: string;
}

const tableName = "email_signatures";

export const createNewSignature = async (data: SignatureCreateType) => {
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
          body,
          user
          ) VALUES?`,
      [[data.body, data.user]]
    )) as { insertId: number };
    console.log("NEW EMAIL CREATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getSignature = async (userId: string) => {
  try {
    const data = await query<DBCommentType[]>(
      `SELECT * FROM ${tableName} WHERE user = '${userId}'`
    );
    return data?.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const updateSignature = async (userId: string, body: string) => {
  try {
    await query<DBCommentType[]>(
      `UPDATE ${tableName} SET body = '${body}' WHERE user = ${userId}`
    );
    return { success: true };
  } catch (error) {
    throw error;
  }
};
