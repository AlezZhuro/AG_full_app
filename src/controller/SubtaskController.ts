import { NextFunction, Request, Response } from "express";
import { EntityController } from "./EntityController";
import { Subtask } from "../entity/Subtask";
import {
  add as addSchema,
  update as updateSchema,
} from "../scheme/yup/entities/task";
import * as Registry from "../services/Entity/Subtask/Registry";
import * as TaskRegistry from "../services/Entity/Task/Registry";
import { NotFoundError } from "../error/error";

export class SubtaskController extends EntityController<Subtask> {
  constructor(
    registry = Registry,
    addValidator = addSchema,
    updateValidator = updateSchema,
    getOneRelations = ["task"],
  ) {
    super(registry, addValidator, updateValidator, getOneRelations);
  }

  async allSubtask(request: Request, response: Response, next: NextFunction) {
    try {
      const { taskEntity, taskId } = await this.getParentEntityById(request);

      const where = { task: { id: taskId } };

      const subtasks = await this.all(request, response, next, where);

      return {
        task: taskEntity,
        subtasks,
      };
    } catch (error) {
      // handle error
      next(error);
    }
  }

  async createSubtask(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { taskEntity, taskId } = await this.getParentEntityById(request);

      const data = this.collect(request);

      let filtered = await this.addValidator.validate(Object.assign(data, {task: {id: taskId}}), {
        abortEarly: false,
      });      

      const entity = await this.registry.repository.save(filtered);

      return await this.registry.getById(entity.id, this.registry);
    } catch (error) {
      // handle error
      next(error);
    }
  }

  async getParentEntityById(request: Request) {
    const taskId = await this.getEntityId(request);

    const taskEntity = await this.registry.getById(taskId, TaskRegistry);

    if (!taskEntity) {
      throw new NotFoundError("Task not found");
    }

    return { taskEntity, taskId };
  }
}
