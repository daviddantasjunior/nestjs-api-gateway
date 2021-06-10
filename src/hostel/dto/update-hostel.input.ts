import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateHostelInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Invalid characters' })
  slug?: string;
}
