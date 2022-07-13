import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  private list: User[] = [];

  create(createUserDto: CreateUserDto): User {
    const user: User = createUserDto;
    user.id = uuidv4();
    this.list.push(user);
    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User | undefined {
    const user = this.list.find((item) => item.id === id);
    if (user.password === updatePasswordDto.oldPassword) {
      user.password = updatePasswordDto.newPassword;
      return user;
    }
  }

  delete(id: string): void {
    const itemIndex = this.list.findIndex((item) => item.id === id);
    this.list.splice(itemIndex, 1);
    return;
  }

  getUser(id: string): User {
    const result = this.list.find((item) => item.id === id);
    return result;
  }

  getAll(): User[] {
    return this.list;
  }

  //   GET /user/:id - get single user by id
  // Server should answer with status code 200 and and record with id === userId if it exists
  // Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  // Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

  // async findOneById(id): Promise<User> {
  //     return this.userModel.findById(id).exec();
  // }
}
