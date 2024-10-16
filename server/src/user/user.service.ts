import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({})
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async get(id: ObjectId): Promise<User> {
    const existingUser = await this.userModel.findById(id);
    return existingUser;
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async delete(id: ObjectId) {
    const userToDelete = await this.userModel.findByIdAndDelete(id).exec();
    return userToDelete;
  }
}
