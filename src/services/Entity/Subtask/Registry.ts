import { BackendConnection } from "../../../database/DataSource";
import { Subtask } from "../../../entity/Subtask";

export * from '../Registry';

export const repository = BackendConnection.getRepository(Subtask);
