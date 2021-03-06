import { Injectable } from '@nestjs/common';
import { UserRepository } from '../abstractions/user';
import {
  createParentAndChildrenDto,
  EditUserDto,
  GenericUserDto,
  PostUserDto,
  UserInfoDto,
  UserLoginDto,
} from '../dtos/user.dto';
import { Encrypter } from '../../common/abstractions/encrypter';
import { BaseError } from '../../common/errors/base';
import { ClassroomDto } from '../dtos/clasroom.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async createParentAndChildren(
    cnpj: string,
    data: createParentAndChildrenDto,
  ): Promise<void> {
    data.defaultPassword = await this.encrypter.encrypt(
      process.env.DEFAULT_USER_PASSWORD || data.defaultPassword,
    );
    return await this.userRepository.insertParentChildren(cnpj, data);
  }
  async editUser(cpf: string, editUser: EditUserDto): Promise<void> {
    return await this.userRepository.edit(cpf, editUser);
  }

  async deleteUser(cpf: string): Promise<boolean> {
    return await this.userRepository.delete(cpf);
  }

  async listUsers(cnpj: string): Promise<GenericUserDto[]> {
    return this.userRepository.getAll(cnpj);
  }

  async addUser(postUser: PostUserDto): Promise<void> {
    postUser.password = await this.encrypter.encrypt(postUser.password);
    return this.userRepository.create(postUser);
  }

  async getUserInfo(cpf: string): Promise<UserInfoDto> {
    const userInfo = await this.userRepository.getUserInfo(cpf);
    if (!userInfo) throw new BaseError('User does not found', 404);
    const { passwordHash: _, ...user } = userInfo;
    return user as UserInfoDto;
  }

  async getParentChildren(parentCpf: string) {
    const repoData = await this.userRepository.getParentChildren(parentCpf);
    if (!repoData) throw new BaseError('User does not found', 404);
    const { parent } = repoData.find((data) => data.parent.cpf == parentCpf);
    const children = repoData.map((data) => ({
      name: data.child.name,
      cpf: data.child.cpf,
      classroom: data.classroom,
    }));
    return { parent, children };
  }

  async login({ username, password }: UserLoginDto): Promise<UserInfoDto> {
    const userInfo = await this.userRepository.getUserInfo(username);
    if (!userInfo) throw new BaseError('User does not found', 404);
    const isCorrect = await this.encrypter.compare(
      password,
      userInfo.passwordHash,
    );
    if (isCorrect) {
      return userInfo;
    }
    throw new BaseError('Wrong Credentials', 401);
  }
}
