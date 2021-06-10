import { InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateHostelInput {
  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  name: string;

  slug?: string;
}
