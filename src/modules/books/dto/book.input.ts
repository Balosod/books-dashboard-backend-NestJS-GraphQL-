import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';
/**
 * BookInput
 *
 * This InputType defines the shape of data required
 * when creating a new Book via a GraphQL mutation.
 *
 * GraphQL InputTypes are used only for incoming data
 * (they cannot be queried directly like ObjectTypes).
 */
@InputType()
export class BookInput {
  /**
   * Name of the book
   * Not Nullable so it can't be omitted in the mutation
   */
  @Field()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  /**
   * Short description of the book
   *  Not Nullable so it can't be omitted in the mutation
   */
  @Field()
  @IsNotEmpty()
  @Length(10, 500)
  description: string;
}
