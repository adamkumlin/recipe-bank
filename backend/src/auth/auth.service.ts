import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/schema/user.schema';

const bcrypt = require('bcryptjs');
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    if (!password || !email) {
      throw new BadRequestException('Email or password is empty.');
    }

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    const payload = { username: email};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
