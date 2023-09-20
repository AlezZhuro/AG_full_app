import { HttpStatusCode } from "../error/error";

/**
 * 
  {
    errors: {
      name: ['Name is required'],
      gender: ['Gender is required'],
    }
  }  
*/

export const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(HttpStatusCode.BAD_REQUEST).send({ errors: error.errors });
  } else if (error.name === 'EntityNotFoundError') {
    return response.status(HttpStatusCode.NOT_FOUND).send({ errors: [error.message] });
  } else if (error.name === "BaseError") {
    return response.status(HttpStatusCode.BAD_REQUEST).send({ errors: [error.message] });
  } else if (error.name === "AuthenticationError") {
    return response.status(403).send({ errors: [error.message] });
  } else if (error instanceof SyntaxError) {
    return response.status(HttpStatusCode.BAD_REQUEST).send({ errors: ["request syntax error"] });
  } else {
    return response.status(HttpStatusCode.BAD_REQUEST).send({ errors: ["error has happened"] });
  }
};

process.on("uncaughtException", (error: Error) => {
  process.env["NODE_ENV"] === "development" && console.trace();
  process.exit(1);
});

