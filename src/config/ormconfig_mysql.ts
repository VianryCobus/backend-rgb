import { DataSourceOptions } from 'typeorm';

// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
require('dotenv').config();

// const mysqlCobsConfig: MysqlConnectionOptions = {
//   type: 'mysql',
//   host: process.env.MYSQL_HOST,
//   port: Number(process.env.MYSL_PORT),
//   username: process.env.MYSQL_USERNAME,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   entities: ['dist/src/models/**/*.entity.js'],
//   migrations: ['dist/src/models/migrations/**/*.js'],
//   migrationsTableName: 'migrations',
//   synchronize: false,
// };

const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/src/models/**/*.entity.js'],
  migrations: ['src/models/migrations/*{.ts,.js}'],
  // migrationsTableName: 'migrations',
  logging: true,
  migrationsRun: true,
};

export default databaseConfig;
