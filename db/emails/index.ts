import { query } from "..";
import { UserType } from "../users";
import { OrganizationType } from "../organizations";
import { LeadType } from "../leads";
import { handleFilterQuery } from "./handleFilterQuery";

export interface EmailType {
  _id: number;
  body: string;
  from: string;
  subject: string;
  user: UserType;
  organization: OrganizationType;
  lead: LeadType;
  tag: number;
  to: string;
  open: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailCreateType {
  from: string;
  body: string;
  subject: string;
  user: string;
  organization: string;
  lead: string;
  to: string;
}

export interface DBCommentType
  extends Omit<EmailType, "user" | "organization" | "lead"> {
  user: string;
  organization: string;
  lead: string;
}

const tableName = "emails";

export const createNewEmail = async (
  data: EmailCreateType[]
): Promise<EmailType[]> => {
  const values = data.map((item) => [
    item.subject,
    item.user,
    item.organization,
    item.lead,
    item.to,
    item.from,
  ]);
  try {
    const data = await query<Promise<EmailType[]>>(
      `INSERT INTO ${tableName} (
        subject,
        user,
        organization,
        lead,
        \`to\`, 
        \`from\`
        ) VALUES ? RETURNING _id, subject, user, organization, lead, \`to\`, \`from\``,
      values
    );
    console.log("NEW EMAIL CREATED: ");
    return data;
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
        ) AS user,
        CASE 
            WHEN emails.lead != 0 THEN JSON_OBJECT(
              '_id', leads._id,
              'firstName', leads.firstName,
              'lastName', leads.lastName,
              'email', leads.email
            )
            ELSE NULL
        END AS lead,
        emails.createdAt,
        emails.updatedAt,
        emails.subject, 
        emails.to,
        emails.from
      FROM ${tableName} AS emails
      JOIN users ON emails.user = users._id
      LEFT JOIN leads ON emails.lead = leads._id AND emails.lead != 0
      ${filtersQuery}
      ORDER BY emails._id DESC 
      LIMIT ${filters?.limit}
      OFFSET ${offset};`);
    const formattedResults = data.map((row) => ({
      _id: row._id,
      user: JSON.parse(row.user),
      lead: JSON.parse(row.lead),
      createdAt: row.createdAt,
      subject: row.subject,
      updatedAt: row.updatedAt,
      open: row.open,
      to: row.to,
      from: row.from,
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
