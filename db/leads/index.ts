import { Payload } from "@/lib/server/routeHandlers/handleCardsUpload";
import { query } from "..";
import { parseHTTPS } from "../helpers";
import { handleRequestQuery } from "../helpers/handleRequestQuery";
import { getChangedValuesQuery } from "@/lib/shared/getChangedValues";

export interface LeadType {
  _id: number;
  website: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  industry: string;
  employees: string;
  archived: boolean;
  description: string;
  created: string;
}

const tableName = "leads";

export const insertNewLead = async (data: LeadType, payload: Payload) => {
  const webite = parseHTTPS(data.website);
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
                firstName, 
                lastName, 
                role, 
                company, 
                email, 
                phone, 
                mobile, 
                address, 
                zip, 
                city,
                country, 
                industry, 
                employees, 
                description, 
                createdBy,
                owner,
                website,
                archived
            ) VALUES?`,
      [
        [
          data.firstName,
          data.lastName,
          data.role,
          data.company,
          data.email,
          data.phone,
          data.mobile,
          data.address,
          data.zip,
          data.city,
          data.country,
          data.industry,
          data.employees,
          data.description,
          payload.createdBy,
          payload.owner,
          webite,
          0,
        ],
      ]
    )) as { insertId: number };
    console.log("NEW LEAD CREATED " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getLeads = async (
  filters: Record<string, string>,
  owner: string
): Promise<{
  data: any;
  total: number;
}> => {
  const filtersQuery = handleRequestQuery({ ...filters, owner });
  try {
    const total = (await query(
      `SELECT COUNT(*) AS total FROM ${tableName} ${filtersQuery}`
    )) as [{ total: number }];
    console.log("TOT: ", total);
    const offset = +filters?.page * +filters.limit;
    const data = await query(
      `SELECT * from ${tableName} ${filtersQuery} ORDER BY _id DESC LIMIT ${filters?.limit} OFFSET ${offset} `
    );
    return { data, total: total?.[0]?.total ?? 0 };
  } catch (error) {
    throw error;
  }
};

export const getLead = async (_id: string): Promise<LeadType | null> => {
  try {
    const data = (await query(`SELECT * from ${tableName} WHERE _id = ? `, [
      [_id],
    ])) as LeadType[];
    return data?.length ? data[0] : null;
  } catch (error) {
    throw error;
  }
};

export const updateLead = async (
  values: LeadType,
  _id: string
): Promise<any> => {
  const parsedQuery = getChangedValuesQuery(values);
  try {
    const data = (await query(
      `UPDATE ${tableName} SET ${parsedQuery} WHERE _id = ${_id}`
    )) as LeadType[];
    return data?.length ? data[0] : {};
  } catch (error) {
    throw error;
  }
};
