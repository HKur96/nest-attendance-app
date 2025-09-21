import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '@/user/domains/dtos/createUser.dto';
import {
  SignInResponse,
  SignUpResponse,
} from '@/user/domains/responses/user.response';
import { SignInUserDto } from '@/user/domains/dtos/signInUser.dto';
import { ApiResponse } from '@/utils/api.response';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(user: CreateUserDto): Promise<ApiResponse<SignUpResponse>> {
    return await this.userRepository.signUp(user);
  }

  async signIn(user: SignInUserDto): Promise<ApiResponse<SignInResponse>> {
    return await this.userRepository.signIn(user);
  }
}
