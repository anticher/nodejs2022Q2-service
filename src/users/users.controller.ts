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
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { UserResponse } from './interfaces/user.model';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body(new ValidationPipe()) user: CreateUserDto): UserResponse {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) passwords: UpdatePasswordDto,
  ): UserResponse {
    return this.usersService.update(id, passwords);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): void {
    return this.usersService.delete(id);
  }

  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserResponse {
    return this.usersService.getUser(id);
  }

  @Get()
  getAll(): UserResponse[] {
    return this.usersService.getAll();
  }
}
