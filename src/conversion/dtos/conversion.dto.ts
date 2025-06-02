import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsOptional, IsIn, IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType('ConversionInput')
export class ConversionInputDto {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsIn(['sale', 'lead', 'signup', 'purchase', 'other'])
  conversionType: string;

  @Field({ nullable: true })
  @IsNumber()
  @Min(0)
  conversionValue: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  timestamp: string;
}
