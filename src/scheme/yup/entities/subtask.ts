import * as yup from "yup";

import { id } from "../entity_id";

export let add = yup
  .object()
  .shape({
    title: yup.string().required().trim().min(1).max(255),
    description: yup.string().trim().max(255),
    completed: yup.boolean().default(false),
    task: yup.object().required().shape({ id }),
  })
  .noUnknown(true);

export let update = yup
  .object()
  .shape({
    title: yup.string().required().trim().min(1).max(255),
    description: yup.string().trim().max(255),
    completed: yup.boolean(),
    id: id,
    task: yup.object().required().shape({ id }),
  })
  .noUnknown(true);
