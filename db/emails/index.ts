import { Payload } from "@/lib/server/routeHandlers/handleCardsUpload";
import { query } from "..";
import { parseHTTPS } from "../helpers";
import { handleRequestQuery } from "../helpers/handleRequestQuery";
import { getChangedValuesQuery } from "@/lib/shared/getChangedValues";
import { getCountryName } from "@/lib/shared/getCountry";
import { UserType } from "../users";
import { OrganizationType } from "../organizations";
import { LeadType } from "../leads";

export interface EmailType {
  _id: number;
  html: string;
  subject: string;
  sentBy: UserType;
  organization: OrganizationType;
  recipient: LeadType;
  open: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailCreateType {
  html: string;
  subject: string;
  sentBy: string;
  organization: string;
  recipient: string;
}

export interface DBCommentType
  extends Omit<EmailType, "sentBy" | "organization" | "recipient"> {
  sentBy: string;
  organization: string;
  recipient: string;
}

const tableName = "emails";

export const createNewEmail = async (data: EmailCreateType) => {
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
        html,
        subject,
        sentBy,
        organization,
        recipient
        ) VALUES?`,
      [
        [
          data.html,
          data.subject,
          data.sentBy,
          data.organization,
          data.recipient,
        ],
      ]
    )) as { insertId: number };
    console.log("NEW EMAIL CREATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedEmails = async (
  filters: Record<string, string>,
  organization: string
): Promise<{
  data: EmailType[];
  total: number;
}> => {
  try {
    const total = await query<[{ total: number }]>(
      `SELECT COUNT(*) AS total FROM ${tableName} WHERE organization = ?`,
      [[organization]]
    );
    const offset = +filters?.page * +filters.limit;
    const data = await query<DBCommentType[]>(`
      SELECT 
        emails._id,
        emails.open,
        JSON_OBJECT(
          '_id', users._id,
          'firstName', users.firstName,
          'lastName', users.lastName
        ) AS sentBy,
         JSON_OBJECT(
          '_id', leads._id,
          'firstName', leads.firstName,
          'lastName', leads.lastName,
          'email', leads.email
        ) AS recipient,
        emails.createdAt,
        emails.updatedAt,
        emails.subject
        FROM ${tableName}
        JOIN users ON emails.sentBy = users._id
        JOIN leads ON emails.recipient = leads._id
        WHERE emails.organization = ${organization} 
        ORDER BY emails._id DESC 
        LIMIT ${filters?.limit}
        OFFSET ${offset} ;
        `);
    const formattedResults = data.map((row) => ({
      _id: row._id,
      sentBy: JSON.parse(row.sentBy),
      recipient: JSON.parse(row.recipient),
      createdAt: row.createdAt,
      subject: row.subject,
      updatedAt: row.updatedAt,
      open: row.open,
    })) as EmailType[];
    return { data: formattedResults, total: total?.[0]?.total ?? 0 };
  } catch (error) {
    throw error;
  }
};

export const markAsRead = async (
  _id: string
): Promise<any> => {
  try {
    const data = (await query(
      `UPDATE ${tableName} SET open = 1 WHERE _id = ${_id}`
    )) as LeadType[];
    return data?.length ? data[0] : {};
  } catch (error) {
    throw error;
  }
};

// export const getCSVExportLeads = async (
//   filters: Record<string, string>,
//   owner: string
// ): Promise<LeadType[]> => {
//   const filtersQuery = handleRequestQuery({ ...filters, owner });
//   try {
//     const data = await query<LeadType[]>(
//       `SELECT
//         firstName,
//         lastName,
//         email,
//         phone,
//         mobile,
//         role,
//         company,
//         website,
//         industry,
//         employees,
//         address,
//         zip,
//         city,
//         country,
//         description,
//         created
//         FROM ${tableName} ${filtersQuery} ORDER BY _id DESC`
//     );
//     return data.map((x) => ({ ...x, country: getCountryName(x.country) }));
//   } catch (error) {
//     throw error;
//   }
// };

// export const getLead = async (_id: string): Promise<LeadType | null> => {
//   try {
//     const data = (await query(
//       `SELECT * from ${tableName} WHERE _id = ? AND archived = 0`,
//       [[_id]]
//     )) as LeadType[];
//     return data?.length ? data[0] : null;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateLead = async (
//   values: LeadType,
//   _id: string
// ): Promise<any> => {
//   const parsedQuery = getChangedValuesQuery(values);
//   try {
//     const data = (await query(
//       `UPDATE ${tableName} SET ${parsedQuery} WHERE _id = ${_id}`
//     )) as LeadType[];
//     return data?.length ? data[0] : {};
//   } catch (error) {
//     throw error;
//   }
// };

// export const removeComment = async (_id: string): Promise<any> => {
//   try {
//     await query(`DELETE FROM ${tableName} WHERE _id = ${_id}`);
//     return true;
//   } catch (error) {
//     throw error;
//   }
// };
