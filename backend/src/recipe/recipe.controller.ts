import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ObjectId } from 'mongoose';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Public()
  @Get("/user/:userId")
  getAll(@Param("userId") userId: ObjectId) {
    return this.recipeService.getAll(userId);
  }

  @Public()
  @Get("/id/:id")
  get(@Param("id") id: ObjectId) {
    return this.recipeService.get(id);
  }

  @Public()
  @Delete("/id/:id")
  delete(@Param("id") id: ObjectId) {
    return this.recipeService.delete(id);
  }
  
  @Public()
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
}
