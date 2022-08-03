import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants/jwt.constants';
import { jwtRefreshConstants } from './constants/jwt-refresh.constants';
import { RefreshTokenDto } from './dto/refresh.dto';
import { Tokens } from './models/tokens.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto): Promise<User> {
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
    return await this.getTokens(user);
  }

  async getTokens(user: User): Promise<Tokens> {
    const payload = { username: user.login, sub: user.id };
    const refreshToken = this.getJwtRefreshToken(user.id);
    await this.usersService.updateRefresh(user.id, refreshToken);
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
      refreshToken,
    };
  }

  getJwtRefreshToken(userId: string): string {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: jwtRefreshConstants.secret,
      expiresIn: jwtRefreshConstants.accessTokenExpTime,
    });
    return token;
  }

  async refresh(refreshTokenBody: RefreshTokenDto): Promise<Tokens> {
    try {
      const result = await this.jwtService.verifyAsync(
        refreshTokenBody.refreshToken,
        {
          secret: jwtRefreshConstants.secret,
        },
      );
      const user = await this.usersService.getUserFromDB(result.userId);
      if (user.hashedRefreshToken === refreshTokenBody.refreshToken) {
        return await this.getTokens(user);
      }
      return result;
    } catch (e) {
      throw new HttpException(
        'refresh token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
