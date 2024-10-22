import { query } from "@/db";
import { OrganizationType } from "../organizations";

export interface UsageType {
  _id: number;
  period: string;
  cards: number;
  csv: number;
  emails: number;
  createdLeads: number;
  organization: OrganizationType;
  createdAt: string;
  updatedAt: string;
}

export interface UsageCreateType {
  period: string;
  organization: string;
}

export interface DBUsageType extends Omit<UsageType, "organization"> {
  organization: number;
}

const tableName = "usages";

export const createNewUsage = async (data: UsageCreateType) => {
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
          period,
          organization
          ) VALUES?`,
      [[data.period, data.organization]]
    )) as { insertId: number };
    console.log("NEW USAGE CREATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const updateUsage = async (
  data: UsageCreateType,
  organizationId: string,
  period: string
) => {
  try {
    const { insertId } = (await query(
      `UPDATE ${tableName} 
      SET 
      WHERE organization = '${organizationId}' AND period = '${period}'`
    )) as { insertId: number };
    console.log("USAGE UPDATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getUsage = async (organizationId: string, period: string) => {
  try {
    const data = await query<UsageType[]>(
      `SELECT * FROM ${tableName} WHERE period = '${period}' AND organization = '${organizationId}'`
    );
    return data[0] ? data[0] : null;
  } catch (error) {
    throw error;
  }
};
