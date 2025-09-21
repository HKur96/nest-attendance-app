import { Controller, Post, Body } from '@nestjs/common';
import { UserUseCase } from '../../data/use-cases/user.usecase';
import { CreateUserDto } from '@/user/domains/dtos/createUser.dto';
import { SignInUserDto } from '@/user/domains/dtos/signInUser.dto';
import {
  SignInResponse,
  SignUpResponse,
} from '@/user/domains/responses/user.response';
import { ApiResponse } from '@/utils/api.response';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post('/sign-up')
  async signUpUser(
    @Body() body: CreateUserDto,
  ): Promise<ApiResponse<SignUpResponse>> {
    return await this.userUseCase.signUp(body);
  }

  @Post('/sign-in')
  async signInUser(
    @Body() body: SignInUserDto,
  ): Promise<ApiResponse<SignInResponse>> {
    return await this.userUseCase.signIn(body);
  }
}
