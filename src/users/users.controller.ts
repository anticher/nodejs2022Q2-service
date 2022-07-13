import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { UpdatePasswordDto } from './dto/update.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() user: User): CreateUserDto {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() passwords: UpdatePasswordDto): User {
    return this.usersService.update(id, passwords);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.usersService.delete(id);
  }

  @Get(':id')
  getById(@Param('id') id: string): User {
    return this.usersService.getUser(id);
  }

  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }
}
