import * as Yup from "yup";

const dev = process.env.NODE_ENV === "development";

export const initialValues = dev
  ? {
      host: "sv95.ifastnet.com",
      email: "neotech@pikado.net",
      password: "n4w55S9;rkXD*",
      port: "345",
    }
  : {
      host: "",
      email: "",
      password: "",
      port: "",
    };

export type InitialValues = typeof initialValues;

export const validationSchema = Yup.object().shape({
  host: Yup.string().required("requiredField").max(50, "max50char"),
  email: Yup.string()
    .required("requiredField")
    .max(50, "max50char")
    .email("invalidEmail"),
  password: Yup.string().required("requiredField").max(40, "max40char"),
  port: Yup.number().required("requiredField").max(99999, "max40char"),
});
