import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto) {
    const saltOrRounds = 10;
    user.password = await bcrypt.hash(user.password, saltOrRounds);
    return this.usersService.create(user);
  }

  async login(inputData: CreateUserDto) {
    const user = await this.usersService.getUserByLogin(inputData.login);
    const isPasswordsMatch = await bcrypt.compare(
      inputData.password,
      user.password,
    );
    if (!user || !isPasswordsMatch) {
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
