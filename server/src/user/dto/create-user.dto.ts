import {
  IsDateString,
  IsLowercase,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  @IsLowercase()
  name: string;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  profileImage?: string;

  @IsNotEmpty()
  @IsDateString()
  joinDate: string;
}
