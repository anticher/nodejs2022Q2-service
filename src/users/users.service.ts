import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User, UserResponse } from './interfaces/user.model';
import { v4 as uuidv4, validate as isValidUUID } from 'uuid';
import { UpdatePasswordDto } from './dto/update.dto';
import { IMDBService } from 'src/db/in-memory-db.service';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private list: User[] = [];

  constructor(
    db: IMDBService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
    this.list = db.users;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { login, password } = createUserDto;
    const user: UserEntity = {
      userId: uuidv4(),
      login,
      password,
      version: 1,
    };
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  // update(id: string, updatePasswordDto: UpdatePasswordDto): UserResponse {
  //   const user = this.list.find((item) => item.id === id);
  //   if (!user) {
  //     throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
  //   }
  //   if (user.password !== updatePasswordDto.oldPassword) {
  //     throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
  //   }
  //   user.password = updatePasswordDto.newPassword;
  //   user.updatedAt = Date.now();
  //   user.version += 1;
  //   const { password, ...rest } = user;
  //   return rest;
  // }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.getUserFromDB(id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    delete user.updatedAt;
    user.version += 1;
    await this.usersRepository.update(user.id, user);
    const updatedUser = await this.getUser(id);
    return updatedUser;
  }

  // delete(id: string): void {
  //   const itemIndex = this.list.findIndex((item) => item.id === id);
  //   if (itemIndex < 0) {
  //     throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
  //   }
  //   this.list.splice(itemIndex, 1);
  //   throw new HttpException('', HttpStatus.NO_CONTENT);
  // }

  async delete(id: string): Promise<void> {
    const user = await this.getUserFromDB(id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    await this.usersRepository.delete(user.id);
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  async getUserFromDB(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({
      userId: id,
    });
    return user;
  }

  async getUser(id: string): Promise<UserEntity> {
    const user = await this.getUserFromDB(id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    user.createdAt = Date.parse(user.createdAt.toString());
    user.updatedAt = Date.parse(user.updatedAt.toString());
    return user;
  }

  getAll(): Promise<UserEntity[]> {
    const response = this.usersRepository.find();
    return response;
  }
}
