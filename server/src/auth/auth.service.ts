import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(email: string, passwordHash: string) {
    const user = await this.userService.getByEmail(email);

    if (user?.passwordHash !== passwordHash) {

    }
  }
}
