import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipe/recipe.module';
import "dotenv/config";

@Module({
  imports: [RecipeModule, MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {dbName: "RecipeBank" })],
})
export class AppModule {}
