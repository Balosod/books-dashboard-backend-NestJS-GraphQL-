import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

/**
 * UpdateBookInput
 *
 * This InputType defines the fields that can be updated
 * for an existing Book.
 *
 */
@InputType()
export class UpdateBookInput {
  /**
   * Updated name of the book
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
