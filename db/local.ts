import fs from "fs";
import crypto from "crypto";

export interface DBRecord {
  _id: string;
  website: string;
  fName: string;
  lName: string;
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

let state: any[] = [];

export const removeItem = (_id: string) => {
  const handler = state.filter((item) => item._id !== _id);
  state = handler;
  fs.writeFileSync(`state.json`, JSON.stringify(handler));
  console.log("REMOVED");
};

export const getItems = () => {
  return [...state];
};

export const getItem = (_id: string) => {
  return state.find((item) => item._id === _id);
};

export const initState = async () => {
  const initialState = await JSON.parse(fs.readFileSync(`state.json`, "utf8"));
  state = initialState;
  console.log("State initialized");
};

const parseHTTPS = (website: string) => {
  if (website) {
    if (!website?.startsWith("https://")) {
      if (website?.startsWith("http://")) {
        return website.replace("http://", "https://");
      }
      return `https://${website}`;
    }
    return website;
  }
  return "";
};

const getID = (length: number = 10) => {
  return crypto.randomBytes(length).toString("hex").substring(0, length);
};

export const entryModel = {
  firstName: "",
  lastName: "",
  role: "",
  company: "",
  email: "",
  phone: "",
  mobile: "",
  website: "",
  address: "",
  postCode: "",
  city: "",
  country: "",
  industry: "",
  employees: "",
  archived: false,
  description: "",
};

export const addItem = (newItem: DBRecord, _id?: string) => {
  const standardizedItem = {
    ...entryModel,
    ...newItem,
    _id: getID(),
    img: _id ?? "",
    website: parseHTTPS(newItem.website),
  };
  console.log("NEW ITEM: ", newItem);

  state = [...state, standardizedItem];
  fs.writeFileSync(`state.json`, JSON.stringify(state));
};

// const entryModel = [
//   "name",
//   "role",
//   "company",
//   "email",
//   "phone",
//   "mobile",
//   "website",
//   "address",
//   "postCode",
//   "city",
//   "country",
//   "industry",
//   "employees",
// ];
