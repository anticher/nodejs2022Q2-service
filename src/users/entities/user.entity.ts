import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const createUpdateDateTransform = () => {
  return {
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  };
};

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public login: string;

  @Column()
  public password: string;

  @Column()
  public version: number;

  @CreateDateColumn(createUpdateDateTransform())
  public createdAt: number;

  @UpdateDateColumn(createUpdateDateTransform())
  public updatedAt: number;

  @Column({ nullable: true })
  @Exclude()
  public hashedRefreshToken?: string;
}
