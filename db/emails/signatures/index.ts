import { query } from "@/db";
import { UserType } from "@/db/users";

export interface SignatureType {
  _id: number;
  html: string;
  user: UserType;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignatureCreateType {
  html: string;
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
          html,
          user
          ) VALUES?`,
      [[data.html, data.user]]
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

export const updateSignature = async (userId: string, html: string) => {
  try {
    await query<DBCommentType[]>(
      `UPDATE ${tableName} SET html = '${html}' WHERE user = ${userId}`
    );
    return { success: true };
  } catch (error) {
    throw error;
  }
};
