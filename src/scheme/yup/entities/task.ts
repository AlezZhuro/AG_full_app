import * as yup from "yup";

export let add = yup
  .object()
  .shape({
    title: yup
      .string()
      .required()
      .trim()
      .min(1)
      .max(255),
    description: yup
      .string()
      .required()
      .trim()
      .min(1)
      .max(255),
    completed: yup.boolean().default(false),
  })
  .noUnknown(true);

  export let update = yup
  .object()
  .shape({
    title: yup
      .string()
      .required()
      .trim()
      .min(1)
      .max(255),
    description: yup
      .string()
      .required()
      .trim()
      .min(1)
      .max(255),
    completed: yup.boolean(),
  })
  .noUnknown(true);
