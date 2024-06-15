import { query } from "..";

export interface AuthType {
  _id: number;
  username: string;
  password: string;
  verified: number;
  lastLogin: string;
  failedAttempts: string;
}

const tableName = "auth";

export const createNewAuth = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const { insertId } = await query<{ insertId: number }>(
      `INSERT INTO ${tableName} (
        username, 
        password
      ) VALUES ?`,
      [[data.username, data.password]]
    );
    console.log("NEW AUTH CREATED " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getAuth = async (username: string): Promise<AuthType | null> => {
  try {
    const data = await query<AuthType[]>(
      `SELECT * FROM ${tableName} 
      WHERE username = ?`,
      [[username]]
    );
    return data.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const verifyAuth = async (_id: string): Promise<AuthType | null> => {
  try {
    const data = await query<AuthType[]>(
      `UPDATE ${tableName} 
      SET verified = 1
      WHERE _id = ?`,
      [[_id]]
    );
    return data.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const updateLastLogin = async (
  _id: number
): Promise<AuthType | null> => {
  try {
    const data = await query<AuthType[]>(
      `UPDATE ${tableName} 
      SET lastLogin = CURRENT_TIMESTAMP
      WHERE _id = ?`,
      [[_id]]
    );
    return data.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};
