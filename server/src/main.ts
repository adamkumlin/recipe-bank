import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 36000000 },
  //   }),
  //   passport.initialize(),
  //   passport.session()
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(3001);
}
bootstrap();
