import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({ required: true, maxlength: 40 })
  title: string;

  @Prop({ required: true, maxlength: 400 })
  body: string;

  @Prop({ required: false })
  image?: string;

  @Prop({required: true })
  dateCreated: string;

  @Prop({ required: false })
  dateUpdated?: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);