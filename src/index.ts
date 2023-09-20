import "dotenv/config";
import "reflect-metadata";
import * as path from "path";
import { initializeDatabaseConnections } from "./database/DataSource";
import { createServer } from "./server";

global.appRoot = path.resolve(__dirname);

initializeDatabaseConnections()
  .then(async () => {
    const app = createServer();

    // start express server
    const port = process.env["APP_PORT"] || 3000;
    app.listen(port);

    console.log(`Express server has started on port ${port}. Open http://localhost:${port} to see results`);
  })
  .catch((error) => console.log(error));
