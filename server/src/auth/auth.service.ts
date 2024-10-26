import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async logIn(email: string, password: string) {
    if (!password || !email) {
      throw new BadRequestException('Email or password is empty.');
    }

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const payload = {
      sub: user.id,
      username: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    if (!password || !email) {
      return null;
    }

    const user = await this.userService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }
}
