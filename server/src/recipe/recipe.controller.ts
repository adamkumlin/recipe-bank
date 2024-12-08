import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ObjectId } from 'mongoose';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get(":userId")
  getAll(@Param("userId") userId: ObjectId) {
    return this.recipeService.getAll(userId);
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
