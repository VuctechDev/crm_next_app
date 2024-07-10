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

// export const getTag = async (
//   tagName: string,
//   organizationId: string
// ): Promise<TagType | null> => {
//   try {
//     const data = await query<TagType[]>(
//       `SELECT * FROM ${tableName} WHERE tag = '${tagName}' AND organization = '${organizationId}'`
//     );
//     return data?.length ? data[0] : null;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getTags = async (organization: string): Promise<TagType[]> => {
//   try {
//     const data = await query<TagType[]>(
//       `SELECT * FROM ${tableName} WHERE organization = '${organization}'`
//     );
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getPaginatedTags = async (
//   filters: Record<string, string>,
//   organizationId: string
// ): Promise<{
//   data: TagType[];
//   total: number;
// }> => {
//   try {
//     const filtersQuery = handleFilterQuery({
//       ...filters,
//       organization: organizationId,
//     });

//     console.log("filtersQuery", filtersQuery);

//     const total = (await query(
//       `SELECT COUNT(*) AS total FROM ${tableName} ${filtersQuery}`
//     )) as [{ total: number }];
//     const offset = +filters?.page * +filters.limit;
//     const data = await query<TagType[]>(
//       `SELECT * FROM ${tableName}
//       ${filtersQuery}
//       ORDER BY _id DESC
//       LIMIT ${filters?.limit}
//       OFFSET ${offset}`
//     );
//     return { data, total: total?.[0]?.total ?? 0 };
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateTag = async (
//   tagId: string,
//   data: Partial<TagCreateType>
// ) => {
//   try {
//     await query(
//       `UPDATE ${tableName}
//         SET tag = '${data?.tag}',
//         description = '${data?.description}',
//         color = '${data?.color}'
//       WHERE _id = ?`,
//       [[tagId]]
//     );
//     return { success: true };
//   } catch (error) {
//     throw error;
//   }
// };

// export const removeTag = async (tagId: string) => {
//   try {
//     await query(`DELETE FROM ${tableName} WHERE _id = ?`, [[tagId]]);
//     return { success: true };
//   } catch (error) {
//     throw error;
//   }
// };
