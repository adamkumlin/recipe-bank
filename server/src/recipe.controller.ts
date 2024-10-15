import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecipeService } from './recipe/recipe.service';
import { CreateRecipeDto } from './recipe/dto/create-recipe.dto';
import { ObjectId } from 'mongoose';
import { UpdateRecipeDto } from './recipe/dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('all')
  getAll() {
    return this.recipeService.getAll();
  }

  @Post('create')
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return await this.recipeService.create(createRecipeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return await this.recipeService.update(id, updateRecipeDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: ObjectId) {
    return await this.recipeService.delete(id);
  }
}
