import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { BookInput } from './dto/book.input';
import { UpdateBookInput } from './dto/book.update';

/**
 * BookService
 *
 * Contains all business logic related to books.
 * Handles database operations using TypeORM Repository.
 */
@Injectable()
export class BookService {
  constructor(
    /**
     * Inject the Book repository provided by TypeOrmModule.forFeature()
     */
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
  ) {}

  /**
   * Fetch all books
   */
  findAll(): Promise<Book[]> {
    return this.repo.find();
  }

  /**
   * Create a new book
   */
  create(data: BookInput): Promise<Book> {
    return this.repo.save(data);
  }

  /**
   * Update an existing book
   * Allows partial updates
   */
  async update(id: number, data: UpdateBookInput): Promise<Book> {
    const book = await this.repo.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    Object.assign(book, data);
    return this.repo.save(book);
  }

  /**
   * Delete a book by ID
   * Returns true if deletion was successful
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
