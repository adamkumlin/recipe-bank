import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsBoolean()
  alwaysRememberPassword?: boolean;

  @IsOptional()
  @IsBoolean()
  useMetric?: boolean;

  @IsOptional()
  @IsBoolean()
  useDarkTheme?: boolean;

  @IsOptional()
  @IsString()
  displayLanguage?: string;

  @IsOptional()
  @IsBoolean()
  alwaysMinimizeNavbar?: boolean;

  @IsOptional()
  @IsNumber()
  fontSize?: number;

  @IsOptional()
  @IsString()
  font?: string;
}
