import { NextFunction, Request, Response } from "express";

import { Controller } from "./Controller";
import { getOrder, getPager } from "../services/Request";
import { NotFoundError } from "../error/error";

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
    public updateValidator = null,
    //
    public getOneRelations = null,
    //
    public getManyRelations = null,
  ) {
    super();
  }

  async all(
    request: Request,
    response?: Response,
    next?: NextFunction,
    whereCondition?: any,
  ) {
    const data = this.collect(request);

    let where;

    if (!!whereCondition && !!Object.keys(whereCondition).length) {
      where = whereCondition;
    }

    let pager = await getPager(data);
    let order = await getOrder(
      this.registry,
      data,
      this.defaultOrder,
      this.defaultDir,
    );

    if (this.getManyRelations) {
      var [items, count] = await this.registry.repository.findAndCount({
        relations: this.getManyRelations,
        order: order,
        skip: pager.page * pager.limit,
        take: pager.limit,
        where,
      });
    } else {
      var [items, count] = await this.registry.repository.findAndCount({
        order: order,
        skip: pager.page * pager.limit,
        take: pager.limit,
        where,
      });
    }

    return this.successResponse({
      count: count * 1,
      items,
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const data = this.collect(request);
    let filtered = await this.addValidator.validate(data, {
      abortEarly: false,
    });

    const entity = await this.registry.repository.save(filtered);

    return this.successResponse({
      entity: await this.registry.getById(entity.id, this.registry),
    });
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = await this.idValidator.validate(+request.params.id, {
        abortEarly: false,
      });

      let entity = await this.registry.repository.findOneBy({ id });

      if (!entity) {
        throw new NotFoundError("NOT FOUND");
      }

      let result = await this.registry.repository.remove(entity);
      return this.successResponse({
        success: !!result,
      });
    } catch (error) {
      // handle error
      next(error);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    let id = await this.idValidator.validate(request.params.id);

    let entity;
    if (this.getOneRelations) {
      entity = await this.registry.repository.findOneOrFail({
        relations: this.getOneRelations,
        where: { id },
      });
    } else {
      entity = await this.registry.repository.findOneOrFail({ where: { id } });
    }

    return this.successResponse({
      entity,
    });
  }

  async patch(request: Request, response: Response, next: NextFunction) {
    let entity = await this.getEntity(request);
    const data = this.collect(request);

    let filtered = await this.updateValidator.validate(data, {
      abortEarly: false,
    });

    // remove possible empty objects which come from yup
    for (let key in filtered)
      if (typeof request.body[key] === "undefined") delete filtered[key];

    return this.successResponse({
      entity: await this.registry.repository.save(
        Object.assign(entity, filtered),
      ),
    });
  }

  async getEntityId(request: Request): Promise<number> {
    const data = this.collect(request);

    let id = await this.idValidator.validate(data.id);

    return id;
  }

  async getEntity(request: Request) {
    const id = await this.getEntityId(request);

    return await this.registry.repository.findOneOrFail({ where: { id } });
  }
}
