import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from './models/user.model';
import { UpdatePasswordDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private list: User[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;
    const user: User = {
      login,
      password,
      version: 1,
    };
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return await this.getUser(newUser.id);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.getUserFromDB(id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('oldPassowrd is wrong', HttpStatus.FORBIDDEN);
    }
    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    await this.usersRepository.update(user.id, {
      password: user.password,
      version: user.version,
    });
    const updatedUser = await this.getUser(id);
    const { password, ...rest } = updatedUser;
    return rest;
  }

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
      id,
    });
    return user;
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      login,
    });
    console.log(user);
    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.getUserFromDB(id);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.NOT_FOUND);
    }
    const { password, ...rest } = user;
    return rest;
  }

  async getAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    const response = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    return response;
  }
}
