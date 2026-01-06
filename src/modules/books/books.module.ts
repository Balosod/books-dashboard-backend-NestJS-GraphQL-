import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './books.service';
import { BookResolver } from './books.resolver';

/**
 * BooksModule
 *
 * This module encapsulates all book-related functionality:
 * - Database entity (Book)
 * - Business logic (BookService)
 * - GraphQL resolvers (BookResolver)
 */
@Module({
  /**
   * Registers the Book entity with TypeORM.
   * This makes Repository<Book> injectable inside this module.
   */
  imports: [TypeOrmModule.forFeature([Book])],

  /**
   * Providers available within this module.
   * - BookService: contains business logic and database operations
   * - BookResolver: handles GraphQL queries and mutations
   */
  providers: [BookService, BookResolver],
})
export class BooksModule {}
