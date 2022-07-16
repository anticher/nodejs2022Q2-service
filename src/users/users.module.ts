import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IMDBService } from 'src/db/in-memory-db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IMDBService],
})
export class UsersModule {}
