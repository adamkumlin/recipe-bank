import {
    IsNotEmpty,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class UpdateRecipeDto {
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @MaxLength(400)
    @IsNotEmpty()
    body: string;
  
    image?: string;
  }