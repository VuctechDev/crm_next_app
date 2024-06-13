import { query } from "..";

export interface VerificationSessionType {
  _id: number;
  code: string;
  created: string;
}

const tableName = "verification_sessions";

export const createNewVerificationSession = async (
  code: string,
  _id: number
) => {
  try {
    const { insertId } = await query<{ insertId: number }>(
      `INSERT INTO ${tableName} (
        _id, 
        code
        ) VALUES ?`,
      [[_id, code]]
    );
    console.log("NEW verification_session CREATED " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getVerificationSession = async (
  code: string
): Promise<VerificationSessionType | null> => {
  try {
    const data = await query<VerificationSessionType[]>(
      `SELECT * FROM ${tableName} WHERE code = ?`,
      [[code]]
    );
    return data.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const removeVerificationSession = async (
  code: string
): Promise<boolean> => {
  try {
    await query<VerificationSessionType[]>(
      `DELETE FROM ${tableName} WHERE code = ?`,
      [[code]]
    );
    return true;
  } catch (error) {
    throw error;
  }
};
