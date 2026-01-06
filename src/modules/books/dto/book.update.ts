import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

/**
 * UpdateBookInput
 *
 * This InputType defines the fields that can be updated
 * for an existing Book.
 *
 * All fields are optional so the client can update
 * only the fields they want (partial updates).
 */
@InputType()
export class UpdateBookInput {
  /**
   * Updated name/title of the book
   * Not Nullable so it can't be omitted in the mutation
   */
  @Field()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  /**
   * Updated description of the book
   * Not Nullable so it can't be omitted in the mutation
   */
  @Field()
  @IsNotEmpty()
  @Length(10, 500)
  description: string;
}
