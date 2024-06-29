import * as Yup from "yup";

export const initialValues = {
  name: "",
  description: "",
  body: "",
};

export type InitialValues = typeof initialValues;

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("requiredField").max(40, "max40char"),
  description: Yup.string().required("requiredField").max(100, "max100char"),
  body: Yup.string().required("requiredField").max(2500, "max2500char"),
});
