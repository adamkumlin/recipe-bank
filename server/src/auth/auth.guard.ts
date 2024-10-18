import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import "dotenv/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = "Bearer" + (request.headers.authorization?.split(" ") ?? undefined);
        if (!token) {
            throw new UnauthorizedException("Invalid token.");
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            )
            request["user"] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
    
}