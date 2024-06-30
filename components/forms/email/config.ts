import * as Yup from "yup";

const dev = process.env.NODE_ENV === "development";

export const initialValues = dev
  ? {
      from: "",
      to: "",
      tags: [],
      template: "",
      signature: "Default",
      subject: "New Subject",
      body: "",
    }
  : {
      from: "",
      to: "",
      tags: [],
      template: "",
      signature: "Default",
      subject: "",
      body: "",
    };

export type InitialValues = typeof initialValues;

export const validationSchema = Yup.object().shape({
  from: Yup.string().required("requiredField").max(50, "max50char"),
  // to: Yup.string()
  //   .required("requiredField")
  //   .max(60, "max60char")
  //   .email("invalidEmail"),
  body: Yup.string().required("requiredField").max(3000, "max3000char"),
  subject: Yup.string().required("requiredField").max(150, "max150char"),
  // port: Yup.number().required("requiredField").max(99999, "max40char"),
});
