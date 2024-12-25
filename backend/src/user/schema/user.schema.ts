import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required: false, type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;
  
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  profileImage: string;

  @Prop({ required: true })
  joinDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
