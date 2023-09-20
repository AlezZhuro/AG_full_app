import * as yup from "yup";

export let id = yup
  .number()
  .typeError("id must be a number")
  .required("id is a required field")
  .integer("id must be a number")
  .positive("id must be a number");
