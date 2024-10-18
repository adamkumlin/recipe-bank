import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import "dotenv/config";
import { UserModule } from "src/user/user.module";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [UserModule, JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: 300}
    })],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard]
})

export class AuthModule {}