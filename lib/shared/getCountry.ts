import { countries } from "./consts/countries";

export const getCountry = (iso3: string) => {
  if (!iso3) {
    return { name: "", iso3: "", iso: "", phoneCode: "" };
  }
  const country = countries.find((x) => x.iso3 === iso3.toLowerCase());
  if (!country) {
    return { name: "", iso3, iso: "", phoneCode: "" };
  }
  return country;
};

export const getCountryName = (iso3?: string) => {
  if (!iso3) {
    return "--";
  }
  const country = countries.find((x) => x.iso3 === iso3.toLowerCase());
  if (!country) {
    return iso3;
  }
  return country.name;
};
