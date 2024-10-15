import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Recipe } from './schema/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable({})
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async getAll(): Promise<Recipe[]> {
    return await this.recipeModel.find().exec();
  }

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(createRecipeDto);
    return createdRecipe.save();
  }

  async update(
    id: ObjectId,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipeModel.findByIdAndUpdate(id, updateRecipeDto).exec();
  }

  async delete(id: ObjectId) {
    const RecipeToDelete = await this.recipeModel.findByIdAndDelete(id).exec();
    return RecipeToDelete;
  }
}
