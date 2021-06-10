import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Hostel {
  @Field(() => ID)
  _id: string;

  // @Field(() => String)
  name: string;

  // @Field(() => String)
  slug: string;
}
