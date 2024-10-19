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
    const isEmailAlreadyTaken: boolean = await this.getByEmail(createUserDto.email) ? true : false;
    if (isEmailAlreadyTaken) {
      throw new ConflictException("Email is already in use.");
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getByEmail(email: string): Promise<User> {
    const existingUser = await this.userModel.findOne({email: email}).exec();
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
