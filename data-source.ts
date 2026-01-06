import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',

  // Path to the SQLite database file
  // `process.cwd()` ensures the path is relative to where you run `node` or `ts-node`
  database: join(process.cwd(), 'data/database.sqlite'),

  // Entities define the database tables
  // CLI uses TypeScript source files (.ts) during development
  // The glob pattern scans all files ending with `.entity.ts` in src/** folders
  entities: [join(process.cwd(), 'src/**/*.entity.ts')],

  // Path to your migrations
  // TypeORM CLI will read these files to create/update your database schema
  migrations: [join(process.cwd(), 'src/migrations/*.ts')],

  // Do NOT automatically synchronize your schema with the database
  // This is safer for production; all changes should go through migrations
  synchronize: false,

  // Enable logging of SQL queries (useful for debugging)
  logging: true,
});
