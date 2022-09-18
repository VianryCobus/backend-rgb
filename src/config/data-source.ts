import { DataSource } from 'typeorm';
import databaseConfig from './ormconfig_mysql';

export const AppDataSource = new DataSource(databaseConfig);
