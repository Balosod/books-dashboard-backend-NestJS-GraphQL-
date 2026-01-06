import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/database.config';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

/**
 * AppModule
 *
 * Root module of the application.
 * This is where global infrastructure modules are configured
 * and feature modules are imported.
 */
@Module({
  imports: [
    /**
     * GraphQL configuration using Apollo Driver
     *
     * - autoSchemaFile: automatically generates schema.gql
     * - context: exposes HTTP request to GraphQL resolvers
     *            (required for authentication guards)
     */

    ConfigModule.forRoot({
      isGlobal: true, // // Load .env variables globally
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),

    /**
     * TypeORM database connection
     * Configuration is extracted into a separate file
     * for better organization and scalability
     */
    TypeOrmModule.forRoot(typeOrmConfig),

    /**
     * Feature modules
     */
    AuthModule,
    BooksModule,
    HealthModule,
  ],
})
export class AppModule {}
