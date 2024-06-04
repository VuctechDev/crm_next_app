import { query } from "..";
import { parseHTTPS } from "../helpers";
import { handleRequestQuery } from "../helpers/handleRequestQuery";

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
  postCode: string;
  city: string;
  country: string;
  industry: string;
  employees: string;
  archived: boolean;
  description: string;
}

interface LeadInsertBody extends Omit<LeadType, "email" | "country"> {}

const tableName = "leads";

export const insertNewLead = async (data: LeadType) => {
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
                postCode, 
                city,
                country, 
                industry, 
                employees, 
                description, 
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
          data.postCode,
          data.city,
          data.country,
          data.industry,
          data.employees,
          data.description,
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
  filters: Record<string, string>
): Promise<{
  data: any;
  total: number;
}> => {
  const filtersQuery = handleRequestQuery(filters);
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

// LIMIT ${limit} OFFSET ${page * limit}`)
