import { DataSourceOptions } from 'typeorm';
require('dotenv').config();

const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/models/**/*.entity.ts'],
  migrations: ['src/models/migrations/*{.ts,.js}'],
  // migrationsTableName: 'migrations',
  logging: true,
};

export default databaseConfig;
