import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongoose';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetUserProfileDto } from './dto/get-user-profile.dto';
import { GetUserSettingsDto } from './dto/get-user-settings.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Public()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Public()
  @Get('/profile/:id')
  async getById(@Param('id') id: string): Promise<GetUserProfileDto> {
    const user = await this.userService.getById(id);

    const dto = new GetUserProfileDto();
    dto.email = user.email;
    dto.joinDate = user.joinDate;

    return dto;
  }

  @Public()
  @Get('/settings/:id')
  async getSettingsById(@Param('id') id: string): Promise<GetUserSettingsDto> {
    const user = await this.userService.getById(id);

    const dto = new GetUserSettingsDto();
    dto.alwaysRememberPassword = user.alwaysRememberPassword;
    dto.displayLanguage = user.displayLanguage;
    dto.useDarkTheme = user.useDarkTheme;
    dto.useMetric = user.useMetric;

    return dto;
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId) {
    return await this.userService.delete(id);
  }
}
