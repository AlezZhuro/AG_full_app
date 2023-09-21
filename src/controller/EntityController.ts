import { NextFunction, Request, Response } from "express";

import { Controller } from "./Controller";
import { getOrder, getPager } from "../services/Request";
import { APIError, HttpStatusCode } from "../error/error";

/**
 * Manipulate entities abstract class
 */
export abstract class EntityController<T> extends Controller {
  constructor(
    //
    public registry,
    //
    public addValidator = null,
    //
    // public updateValidator = null,
    //
    // public getOneRelations = null,
    //
    public getManyRelations = null,
  ) {
    super();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const data = this.collect(request);

    let pager = await getPager(data);
    let order = await getOrder(this.registry, data, this.defaultOrder, this.defaultDir);
  
    if (this.getManyRelations) {
      var [items, count] = await this.registry.repository.findAndCount({
        relations: {
          subtasks: true,
        },
        order: order,
        skip: pager.page * pager.limit,
        take: pager.limit,
      });
    } else {
      var [items, count] = await this.registry.repository.findAndCount({
        order: order,
        skip: pager.page * pager.limit,
        take: pager.limit,
      });
    }

    return { count: count * 1, items };
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const data = this.collect(request);
    let filtered = await this.addValidator.validate(data, {
      abortEarly: false,
    });
    
    const entity = await this.registry.repository.save(filtered);

    console.log({filtered, entity});
    return await this.registry.getById(entity.id, this.registry);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = await this.idValidator.validate( +request.params.id, {
        abortEarly: false,
      });

      let entity = await this.registry.repository.findOneBy({ id });

      if (!entity) {
        throw new APIError("NOT FOUND", HttpStatusCode.NOT_FOUND, "not found");
      }

      let result = await this.registry.repository.remove(entity);
      return !!result;
    } catch (error) {
      // handle error
      next(error);
    }
  }
}
