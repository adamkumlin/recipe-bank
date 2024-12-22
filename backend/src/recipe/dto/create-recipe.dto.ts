import {
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
  
    @IsString()
    @MaxLength(400)
    @IsNotEmpty()
    body: string;
  
    image?: string;
    
    userId: string;
  
    @IsDateString()
    @IsNotEmpty()
    dateCreated: string;
  
    @IsDateString()
    dateUpdated?: string;
  }