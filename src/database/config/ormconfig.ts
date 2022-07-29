import { DataSource } from 'typeorm';

const source = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [__dirname + '../../**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: ['src/database/migrations/*.ts'],
});

export default source;
