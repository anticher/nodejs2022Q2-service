import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { UserResponse } from './interfaces/user.model';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: 'Add new user',
    description: 'Add new user information',
  })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'User data is invalid' })
  @Post()
  register(
    @Body(new ValidationPipe({ whitelist: true })) user: CreateUserDto,
  ): UserResponse {
    return this.usersService.create(user);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Update user information',
  })
  @ApiResponse({
    status: 200,
    description: 'User has been successfully updated.',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'UserId is invalid' })
  @ApiResponse({ status: 404, description: 'User is not exist' })
  @ApiResponse({ status: 403, description: 'Old password is wrong' })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe({ whitelist: true })) passwords: UpdatePasswordDto,
  ): UserResponse {
    return this.usersService.update(id, passwords);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user information',
  })
  @ApiResponse({
    status: 204,
    description: 'User has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'UserId is invalid' })
  @ApiResponse({ status: 404, description: 'User is not exist' })
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.usersService.delete(id);
  }

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Get user information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets user information',
    type: UserResponse,
  })
  @ApiResponse({ status: 400, description: 'UserId is invalid' })
  @ApiResponse({ status: 404, description: 'User is not exist' })
  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserResponse {
    return this.usersService.getUser(id);
  }

  @ApiOperation({
    summary: 'Get all users',
    description: 'Get users information',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets users information',
    type: [UserResponse],
  })
  @Get()
  getAll(): UserResponse[] {
    return this.usersService.getAll();
  }
}
