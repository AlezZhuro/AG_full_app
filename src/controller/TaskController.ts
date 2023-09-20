import { Task } from "../entity/Task";
import { EntityController } from "./EntityController";
import { add as addSchema } from '../scheme/yup/entities/task';
import * as Registry from "../services/Entity/Task/Registry";

export class TaskController extends EntityController<Task> {
  constructor(
    registry = Registry,
    addValidator = addSchema,
    getManyRelations = ['subtasks'],
  ) {
    super(registry, addValidator, getManyRelations);
  }
}
