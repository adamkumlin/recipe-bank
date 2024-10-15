import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [RecipeModule, MongooseModule.forRoot(process.env.DB_CONNECTION_STRING)],
})
export class AppModule {}
