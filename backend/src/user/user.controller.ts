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

  @Get(':email')
  async getByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.getByEmail(email);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    return await this.userService.getById(id);
  }

  @Public()
  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: ObjectId) {
    return await this.userService.delete(id);
  }
}
