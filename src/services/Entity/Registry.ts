import { FindOptionsWhere } from "typeorm";

export const getById = async (id: number, context) => {
  return await context.repository.findOneBy({ id });
};

export const getManyBy = async <T>(where: FindOptionsWhere<T>, context): Promise<T[]> => {
  return await context.repository.findBy(where);
};
