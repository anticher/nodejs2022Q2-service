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
    type: User,
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
  ) {
    return this.authService.login(user);
  }
}
