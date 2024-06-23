import { query } from "..";
import { UserType } from "../users";
import { OrganizationType } from "../organizations";
import { LeadType } from "../leads";
import { handleFilterQuery } from "./handleFilterQuery";

export interface EmailType {
  _id: number;
  html: string;
  subject: string;
  sentBy: UserType;
  organization: OrganizationType;
  recipient: LeadType;
  recipientEmail: string;
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
  to: string;
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
        recipient,
        recipientEmail
        ) VALUES?`,
      [
        [
          data.html,
          data.subject,
          data.sentBy,
          data.organization,
          data.recipient,
          data.to,
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
  const filtersQuery = handleFilterQuery({ ...filters, organization });
  try {
    const total = await query<[{ total: number }]>(
      `SELECT COUNT(*) AS total FROM ${tableName} ${filtersQuery}`
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
        CASE 
            WHEN emails.recipient != 0 THEN JSON_OBJECT(
              '_id', leads._id,
              'firstName', leads.firstName,
              'lastName', leads.lastName,
              'email', leads.email
            )
            ELSE NULL
        END AS recipient,
        emails.createdAt,
        emails.updatedAt,
        emails.subject, 
        emails.recipientEmail
      FROM ${tableName} AS emails
      JOIN users ON emails.sentBy = users._id
      LEFT JOIN leads ON emails.recipient = leads._id AND emails.recipient != 0
      ${filtersQuery}
      ORDER BY emails._id DESC 
      LIMIT ${filters?.limit}
      OFFSET ${offset};`);
    const formattedResults = data.map((row) => ({
      _id: row._id,
      sentBy: JSON.parse(row.sentBy),
      recipient: JSON.parse(row.recipient),
      createdAt: row.createdAt,
      subject: row.subject,
      updatedAt: row.updatedAt,
      open: row.open,
      recipientEmail: row.recipientEmail,
    })) as EmailType[];
    return { data: formattedResults, total: total?.[0]?.total ?? 0 };
  } catch (error) {
    throw error;
  }
};

export const markAsRead = async (_id: string): Promise<any> => {
  try {
    const data = (await query(
      `UPDATE ${tableName} SET open = 1 WHERE _id = ${_id}`
    )) as LeadType[];
    return data?.length ? data[0] : {};
  } catch (error) {
    throw error;
  }
};
