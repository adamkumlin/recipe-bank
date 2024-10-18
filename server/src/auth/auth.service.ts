import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Incorrect email or password.");
    }

    const payload = {
      sub: user.id,
      username: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
