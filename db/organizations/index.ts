import { query } from "..";

const tableName = "organizations";

export interface OrganizationType {
  _id: number;
  industry: string;
  name: string;
  website: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export const createNewOrganization = async (
  data: OrganizationType,
  userId: string
) => {
  try {
    const { insertId } = await query<{ insertId: number }>(
      `INSERT INTO ${tableName} (
          name,
          industry,
          website,
          address,
          city,
          zip,
          country,
          createdBy
        ) VALUES ?`,
      [
        [
          data.name,
          data.industry,
          data.website,
          data.address,
          data.city,
          data.zip,
          data.country,
          userId,
        ],
      ]
    );
    console.log("NEW ORGANIZATION CREATED " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getOrganization = async (
  _id: string
): Promise<OrganizationType | null> => {
  try {
    const data = await query<OrganizationType[]>(
      `SELECT * FROM ${tableName} 
      WHERE _id = ?`,
      [[_id]]
    );
    return data.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};
