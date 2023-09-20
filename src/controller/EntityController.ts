import { NextFunction, Request, Response } from "express";

import { Controller } from "./Controller";
import { getOrder, getPager } from "../services/Request";

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
}
