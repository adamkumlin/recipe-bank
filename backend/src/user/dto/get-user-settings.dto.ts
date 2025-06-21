import { IsBoolean, IsString } from 'class-validator';

export class GetUserSettingsDto {
  @IsBoolean()
  alwaysRememberPassword: boolean;

  @IsBoolean()
  useDarkTheme: boolean;

  @IsString()
  displayLanguage: string;

  @IsBoolean()
  alwaysMinimizeNavbar: boolean;
}
