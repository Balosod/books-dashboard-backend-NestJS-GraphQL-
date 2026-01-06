import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './books.service';
import { Book } from './entities/book.entity';
import { BookInput } from './dto/book.input';
import { UpdateBookInput } from './dto/book.update';
import { GqlAuthGuard, AdminGuard } from '../../common/gql-auth.guard';

/**
 * BookResolver
 *
 * Handles all GraphQL queries and mutations related to books.
 * Uses guards to enforce authentication and role-based authorization.
 */
@Resolver(() => Book)
/**
 * Apply authentication globally to this resolver.
 * All queries and mutations require a valid JWT.
 */
@UseGuards(GqlAuthGuard)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  /**
   * Query: Get all books
   *
   * Accessible to any authenticated user.
   */
  @Query(() => [Book])
  getBooks() {
    return this.bookService.findAll();
  }

  /**
   * Mutation: Create a new book
   *
   * Restricted to users with the "admin" role.
   */
  @Mutation(() => Book)
  @UseGuards(AdminGuard)
  createBook(@Args('data') data: BookInput) {
    return this.bookService.create(data);
  }

  /**
   * Mutation: Update an existing book
   *
   * Allows partial updates.
   * Restricted to admins only.
   */
  @Mutation(() => Book)
  @UseGuards(AdminGuard)
  updateBook(@Args('id') id: number, @Args('data') data: UpdateBookInput) {
    return this.bookService.update(id, data);
  }

  /**
   * Mutation: Delete a book
   *
   * Returns true if deletion was successful.
   * Restricted to admins only.
   */
  @Mutation(() => Boolean)
  @UseGuards(AdminGuard)
  deleteBook(@Args('id') id: number) {
    return this.bookService.delete(id);
  }
}
