import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public userId: string;

  @Column()
  public login: string;

  @Column()
  public password: string;

  @Column()
  public version: number;

  @CreateDateColumn()
  public createdAt?: number;

  @UpdateDateColumn()
  public updatedAt?: number;
}

export default UserEntity;
