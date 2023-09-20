import * as yup from "yup";

export let paging = yup.object().shape({
  page: yup.number().integer().min(0).default(0),
  limit: yup.number().integer().min(1).default(10),
}).noUnknown();

export const getPaging = (defaultPage = 0, defaultLimit = 10) => {
  return yup
    .object()
    .shape({
      page: yup.number().integer().min(0).default(defaultPage),
      limit: yup.number().integer().min(1).default(defaultLimit),
    })
    .noUnknown();
};

export type PagingData = Awaited<ReturnType<typeof paging['validate']>>;
