import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from './schemas/user.schema';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UpdatePasswordDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  private list: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const user: User = createUserDto;
    if (!user.login || !user.password) {
      throw new HttpException(
        'user does not contain required fields: login and password',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.id = uuidv4();
    this.list.push(user);
    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User | undefined {
    if (!isValidUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.list.find((item) => item.id === id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    return user;
  }

  delete(id: string): void {
    if (!isValidUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    const itemIndex = this.list.findIndex((item) => item.id === id);
    if (itemIndex < 0) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    this.list.splice(itemIndex, 1);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getUser(id: string): User {
    if (!isValidUUID(id)) {
      throw new HttpException('userId is invalid', HttpStatus.BAD_REQUEST);
    }
    const user = this.list.find((item) => item.id === id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  getAll(): User[] {
    return this.list;
  }
}
