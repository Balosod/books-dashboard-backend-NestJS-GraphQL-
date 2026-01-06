import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * Book Entity
 *
 * This class serves two purposes:
 * 1. Defines the database schema (TypeORM Entity)
 * 2. Defines the GraphQL ObjectType returned in queries and mutations
 */
@ObjectType() // Exposes this class as a GraphQL type
@Entity() // Marks this class as a database table
export class Book {
  /**
   * Unique identifier for the book
   * Auto-generated primary key
   */
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name/title of the book
   */
  @Field()
  @Column({ length: 100 })
  name: string;

  /**
   * Description or summary of the book
   */
  @Field()
  @Column({ type: 'text' })
  description: string;
}
