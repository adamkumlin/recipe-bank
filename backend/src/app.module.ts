import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipe/recipe.module';
import 'dotenv/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING, {
      dbName: 'RecipeBank',
    }),
    RecipeModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
