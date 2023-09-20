import * as yup from "yup";

import { getEntityColumns } from "../../utils/database";


export async function buildOrderValidator(repository, defaultOrder: string = "", defaultDir: string = "", allowedColumns: string[] = []) {
  let columns;
  if (allowedColumns.length === 0) {
    columns = await getEntityColumns(repository);
  } else {
    columns = allowedColumns;
  }

  return yup
    .object()
    .shape({
      order: yup
        .string()
        .oneOf(columns)
        .default(defaultOrder ? defaultOrder : "id"),
      dir: yup
        .mixed()
        .oneOf(["ASC", "DESC"])
        .default(defaultDir ? defaultDir : "ASC"),
    })
    .noUnknown();
}
