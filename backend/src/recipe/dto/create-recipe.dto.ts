import {
  IsArray,
    IsDateString,
    IsNotEmpty,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateRecipeDto {
    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    title: string;
  
    @IsArray()
    @IsNotEmpty()
    ingredients: string[];

    @IsArray()
    @IsNotEmpty()
    instructions: string[];
  
    @IsString()
    link: string;
    
    @IsNotEmpty()
    userId: string;
  
    @IsDateString()
    @IsNotEmpty()
    dateCreated: string;
  
    @IsDateString()
    dateUpdated?: string;
  }