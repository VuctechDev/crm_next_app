import * as Yup from "yup";

export const initialValues = {
  tag: "#",
  description: "",
  color: "",
};

export type InitialValues = typeof initialValues;

export const validationSchema = Yup.object().shape({
  tag: Yup.string()
    .required("requiredField")
    .max(16, "max16char")
    .min(4, "min4char")
    .matches(/^#.*/, "mustStartWith#"),
  description: Yup.string().required("requiredField").max(100, "max100char"),
  color: Yup.string().required("requiredField").max(12, "max12char"),
});
