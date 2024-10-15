import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./schema/recipe.schema";
import { RecipeController } from "src/recipe.controller";
import { RecipeService } from "./recipe.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Recipe.name, schema: RecipeSchema}])],
    controllers: [RecipeController],
    providers: [RecipeService],
    exports: [MongooseModule]
})

export class RecipeModule {}