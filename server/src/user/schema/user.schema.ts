import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true, lowercase: true, maxlength: 40 })
  name: string;

  @Prop({ required: true, maxlength: 40 })
  displayName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  profileImage: string;

  @Prop({ required: true })
  joinDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
