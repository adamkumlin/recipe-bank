import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({required: false, type: mongoose.Schema.Types.ObjectId})
  id: ObjectId;

  @Prop({ required: true, maxlength: 40 })
  title: string;

  @Prop({ required: true, maxlength: 400 })
  ingredients: string[];

  @Prop({ required: true, maxlength: 400 })
  instructions: string[];

  @Prop({required: false})
  link: string;
  
  @Prop({required: true, type: mongoose.Schema.Types.ObjectId })
  userId: ObjectId;

  @Prop({required: true })
  dateCreated: string;

  @Prop({ required: false })
  dateUpdated?: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);