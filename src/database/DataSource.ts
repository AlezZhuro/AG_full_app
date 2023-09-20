import { DataSource } from "typeorm";
import { backendOrmConfig } from "../typeorm";

export const BackendConnection = new DataSource(backendOrmConfig);

export const initializeDatabaseConnections = () => Promise.all([
  BackendConnection.initialize(),
]);

export const destroyDatabaseConnections = () => Promise.all([
  BackendConnection.destroy(),
]);
