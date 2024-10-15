import {
    IsDateString,
    IsNotEmpty,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class UpdateRecipeDto {
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @MaxLength(400)
    @IsNotEmpty()
    body: string;
  
    image?: string;
  }