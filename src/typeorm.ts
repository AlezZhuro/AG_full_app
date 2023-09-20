import { DataSourceOptions } from "typeorm";

function buildBackendConnectionOptions() {
  const connectionParams = {
    host: process.env.TYPEORM_BACKEND_HOST,
    username: process.env.TYPEORM_BACKEND_USERNAME,
    password: process.env.TYPEORM_BACKEND_PASSWORD,
    port: +process.env.TYPEORM_BACKEND_PORT || 3306,
    database: process.env.TYPEORM_BACKEND_DATABASE,
    logging: process.env.TYPEORM_BACKEND_LOGGING === "true" ? true : false,
    synchronize: false,
    timezone: "+00:00",
  };

  const entitiesDir = [__dirname + "/entity/**/*.{ts,js}"];

  const options: DataSourceOptions = {
    type: "postgres",
    ...connectionParams,
    entities: entitiesDir,
    migrationsRun: false,
    migrationsTransactionMode: "all",
    migrations: [__dirname + "/migration/**/*{.ts,.js}"],
  };

  return options;
}

export const backendOrmConfig = buildBackendConnectionOptions();
