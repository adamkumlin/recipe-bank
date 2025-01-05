import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';

export class GetUserProfileDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  joinDate: string;
}
