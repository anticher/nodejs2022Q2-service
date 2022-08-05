import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create.dto';
import { User } from 'src/users/models/user.model';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh.dto';
import { Tokens } from './models/tokens.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Add new user',
    description: 'Add new user information',
  })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'User data is invalid' })
  @Public()
  @HttpCode(201)
  @Post('signup')
  register(
    @Body(new ValidationPipe({ whitelist: true })) user: CreateUserDto,
  ): Promise<User> {
    return this.authService.signup(user);
  }

  @ApiOperation({
    summary: 'login user',
    description: 'Input login info',
  })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully logined.',
    type: Tokens,
  })
  @ApiResponse({ status: 400, description: 'User data is invalid' })
  @ApiResponse({
    status: 403,
    description: 'No user with such login or password',
  })
  @Public()
  @HttpCode(200)
  @Post('login')
  async login(
    @Body(new ValidationPipe({ whitelist: true })) user: CreateUserDto,
  ): Promise<Tokens> {
    return this.authService.login(user);
  }

  @ApiOperation({
    summary: 'refresh tokens',
    description: 'Get new access and refresh tokens',
  })
  @ApiResponse({
    status: 200,
    description: 'Return tokens in body if dto is valid',
    type: Tokens,
  })
  @ApiResponse({
    status: 400,
    description: 'Dto is invalid (no refreshToken in body)',
  })
  @ApiResponse({
    status: 403,
    description: 'Refresh token is invalid or expired',
  })
  @Public()
  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @Body(new ValidationPipe({ whitelist: true }))
    refreshTokenBody: RefreshTokenDto,
  ): Promise<Tokens> {
    return this.authService.refresh(refreshTokenBody);
  }
}
