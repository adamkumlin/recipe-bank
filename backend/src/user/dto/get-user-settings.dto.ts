import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GetUserSettingsDto {
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
}
