import "dotenv/config";
import { DataSource } from "typeorm";
import { backendOrmConfig } from "../typeorm";

export default new DataSource(backendOrmConfig);
