import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './schema/recipe.schema';
import { RecipeController } from 'src/recipe/recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [MongooseModule], // To be able to import RecipeModel in middleware
})
export class RecipeModule {}
