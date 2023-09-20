import "dotenv/config";
import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import { ServerResponse } from "http";
import { Express, Request, Response } from "express";

import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

export const initializeRoutes = (app: Express) => {
  routes.forEach((route) => {
    (app as any)[route.method](
      [route.path],
      async (req: Request, res: Response, next: Function) => {
        try {
          const result = await new (route.controller as any)()[route.action](req, res, next);
          if (result instanceof ServerResponse) {
            return result;
          } else if (result !== null && result !== undefined) {
            return res.json(result);
          }
        } catch (error) {
          next(error);
        }
      }
    );
  });
};

export const createServer = () => {
  // create express app
  const app = express();

  if (process.env.NODE_ENV !== "production") {
    app.use(cors());
  }

  app.use(bodyParser.json());

  // register express routes from defined application routes
  initializeRoutes(app);

  // handle errors
  app.use(errorHandler);

  return app;
}
