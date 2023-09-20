import { id } from "../scheme/yup/entity_id";

/**
 * General controller abstract class
 */
export abstract class Controller {
  /*
   * entity id yup validator
   */
  idValidator = id;
  /*
   * default order field
   */
  defaultOrder = "id";
  /*
   * default order direction
   */
  defaultDir = "DESC";

  constructor() {}

  collect(request) {
    let data = request.body;
    data = Object.assign(data, request.query);

    return data;
  }

  successResponse(data) {
    return {
      success: true,
      ...data,
    };
  }
}
