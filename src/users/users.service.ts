import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User, UserResponse } from './interfaces/user.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UpdatePasswordDto } from './dto/update.dto';
import { IMDBService } from 'src/db/in-memory-db.service';

@Injectable()
export class UsersService {
  private list: User[] = [];

  constructor(db: IMDBService) {
    this.list = db.users;
  }

  create(createUserDto: CreateUserDto): UserResponse {
    const user: User = createUserDto;
    user.id = uuidv4();
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    user.version = 1;
    this.list.push(user);
    const { password, ...rest } = user;
    return rest;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): UserResponse {
    const user = this.list.find((item) => item.id === id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    const { password, ...rest } = user;
    return rest;
  }

  delete(id: string): void {
    const itemIndex = this.list.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    this.list.splice(itemIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getUser(id: string): UserResponse {
    const user = this.list.find((item) => item.id === id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    const { password, ...rest } = user;
    return rest;
  }

  getAll(): UserResponse[] {
    const response = this.list.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    return response;
  }
}
