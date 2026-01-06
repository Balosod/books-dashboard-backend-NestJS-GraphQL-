import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

//Initial migrations
// npm run migration:generate -- src/migrations/InitialSchema

// This will apply all pending migrations to the DB safely.
// npm run migration:run

// This will revert migration
// npm run migration:revert

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: join(process.cwd(), 'data/database.sqlite'), // SQLite DB file
  entities: [join(process.cwd(), 'dist/**/*.entity.js')], // All entities
  migrations: [join(process.cwd(), 'dist/migrations/*.js')], // migrations folder

  synchronize: false, // Never auto-sync schema in production

  logging: process.env.NODE_ENV === 'development', // Enable SQL logging in dev

  busyTimeout: 5000, // Wait 5s if DB is locked
};
