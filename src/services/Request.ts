import { Request } from "express";
import { Pager } from "../interface/Pager";

import { buildOrderValidator } from "../scheme/yup/dynamic";
import { getPaging } from "../scheme/yup/pager";

export const getOrder = async (
  registry,
  data,
  defaultOrder: string,
  defaultDir: string,
  allowedColumns: string[] = []
): Promise<object> => {
  const orderValidator = await buildOrderValidator(registry.repository, defaultOrder, defaultDir, allowedColumns);
  let o = await orderValidator.validate(data);
  return { [o.order]: o.dir };
};

export const getPager = async (request: Request, defaultPage = 0, defaultLimit = 10): Promise<Pager> => {
  const paging = getPaging(defaultPage, defaultLimit);

  const p = await paging.validate(request);
  return p;
};
