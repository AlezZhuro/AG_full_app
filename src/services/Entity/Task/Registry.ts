import { BackendConnection } from "../../../database/DataSource";
import { Task } from "../../../entity/Task";

export * from '../Registry';

export const repository = BackendConnection.getRepository(Task);
