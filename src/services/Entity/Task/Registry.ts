import { BackendConnection } from "../../../database/DataSource";
import { Task } from "../../../entity/Task";

export const repository = BackendConnection.getRepository(Task);
