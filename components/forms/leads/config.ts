import phoneCheck from "phone";
import * as Yup from "yup";

const dev = process.env.NODE_ENV === "development";

export const initialValues = dev
  ? {
      firstName: "Igor",
      lastName: "Djukic",
      email: "igor@neotechsolutions.org",
      role: "Tech Lead",
      phone: "+38160248484",
      mobile: "+38160248483",
      company: "Meotech Solutions",
      industry: "IT",
      employees: "20",
      website: "https://www.neotechsolutions.co",
      tags: [],
      address: "Visegradska 1a",
      city: "Beograd",
      zip: "21000",
      country: { name: "", iso3: "", iso: "", phoneCode: "" },
      description: "The best company!",
    }
  : {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      phone: "",
      mobile: "",
      company: "",
      industry: "",
      employees: "",
      website: "",
      tags: [],
      address: "",
      city: "",
      zip: "",
      country: { name: "", iso3: "", iso: "", phoneCode: "" },
      description: "",
    };

export type InitialValues = typeof initialValues;

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("requiredField").max(40, "max40char"),
  lastName: Yup.string().required("requiredField").max(40, "max40char"),
  role: Yup.string().required("requiredField").max(40, "max40char"),
  email: Yup.string().required("requiredField").max(40, "max40char"),
  phone: Yup.string().max(40, "max40char").min(4, "min4char"),
  mobile: Yup.string()
    .nullable()
    .test("phoneValidation", "invalidPhoneNumber", function (value) {
      if (!value) {
        return true;
      }
      return phoneCheck(value).isValid;
    }),
  company: Yup.string().required("requiredField").max(40, "max40char"),
  industry: Yup.string().max(40, "max40char"),
  employees: Yup.string().max(20, "max20char"),
  description: Yup.string().max(200, "max200char").nullable(),
  address: Yup.string().max(50, "max50char"),
  city: Yup.string().required("requiredField").max(50, "max50char"),
  zip: Yup.string().max(12, "max12char"),
  country: Yup.object()
    .required("requiredField")
    .shape({
      iso3: Yup.string().required("requiredField"),
      iso: Yup.string(),
      name: Yup.string(),
      phoneCode: Yup.string(),
    }),
  website: Yup.string()
    .required("requiredField")
    .url("mustBeURL")
    // .matches(
    //   /^https:\/\/(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
    //   "mustBeURL"
    // )
    .matches(/^https:\/\//, "mustStartHTTPS"),
});
