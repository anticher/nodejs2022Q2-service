import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  async login(inputData: CreateUserDto) {
    const user = await this.usersService.getUserByLogin(inputData.login);
    if (!user || user.password !== inputData.password) {
      throw new HttpException(
        'no user with such login or password does not match actual one',
        HttpStatus.FORBIDDEN,
      );
    }
    const payload = { username: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
