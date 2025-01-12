import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class GetUserSettingsDto {
  @IsBoolean()
  alwaysRememberPassword: boolean;

  @IsBoolean()
  useMetric: boolean;

  @IsBoolean()
  useDarkTheme: boolean;

  @IsString()
  displayLanguage: string;

  @IsBoolean()
  alwaysMinimizeNavbar: boolean;

  @IsNumber()
  fontSize: number;

  @IsString()
  font: string;
}
