import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId })
  id: ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  profileImage: string;

  joinDate: string;

  @Prop({ default: true })
  alwaysRememberPassword: boolean;

  @Prop({ default: true })
  useMetric: boolean;

  @Prop({ default: true })
  useDarkTheme: boolean;

  @Prop({ default: false })
  alwaysMinimizeNavbar: boolean;

  @Prop({ default: 'english' })
  displayLanguage: string;

  @Prop({ default: 1 })
  textSize?: number;

  @Prop({default: "Lilita_One"})
  font?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
