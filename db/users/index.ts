import { query } from "..";
import { OrganizationType } from "../organizations";

const tableName = "users";

export interface UserType {
  _id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  avatar: string;
  organization: OrganizationType;
  createdAt: string;
  updatedAt: string;
  status: string;
  lastLogin: string;
  username?: string;
}

export interface DBUserType extends Omit<UserType, "organization"> {
  organization: string;
}

export const createNewUser = async (data: UserType, userId: string) => {
  try {
    const { insertId } = await query<{ insertId: number }>(
      `INSERT INTO ${tableName} (
          _id, 
          email,
          firstName,
          lastName,
          birthday,
          phone,
          address,
          city,
          zip,
          country,
          avatar
        ) VALUES ?`,
      [
        [
          userId,
          data.email,
          data.firstName,
          data.lastName,
          data.birthday,
          data.phone,
          data.address,
          data.city,
          data.zip,
          data.country,
          data.avatar,
        ],
      ]
    );
    console.log("NEW USER CREATED " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (
  _id: string | number
): Promise<DBUserType | null> => {
  try {
    const data = await query<DBUserType[]>(
      `SELECT a.username, a.lastLogin, u.* 
      FROM ${tableName} u
      LEFT JOIN auth a 
      ON a._id = u._id
      WHERE a._id = ?`,
      [[_id]]
    );
    if (!data.length) {
      const authData = await query<DBUserType[]>(
        `SELECT username, lastLogin, _id 
        FROM auth 
        WHERE _id = ?`,
        [[_id]]
      );
      return authData.length ? authData[0] : null;
    }
    return data.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const updateUserFromOrganization = async (
  organizationId: number,
  role: string,
  userId: string
): Promise<{ success: boolean }> => {
  try {
    await query(
      `UPDATE ${tableName} 
      SET role = '${role}', organization = '${organizationId}'
      WHERE _id = '${userId}'`
    );
    return { success: true };
  } catch (error) {
    throw error;
  }
};
