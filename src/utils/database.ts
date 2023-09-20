import { Repository } from "typeorm";

export async function getEntityColumns(repository) {
  let metadata = await repository.metadata.columns;
  return metadata.map((a) => a.databaseName);
}

export function getEntityColumnsMeta(repository) {
  return repository.metadata.columns;
}
