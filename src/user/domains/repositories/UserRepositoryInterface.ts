import { CreateUserDto } from '@/user/domains/dtos/createUser.dto';
import { SignInUserDto } from '../dtos/signInUser.dto';
import { SignInResponse, SignUpResponse } from '../responses/user.response';
import { ApiResponse } from '@/utils/api.response';

export interface UserRepositoryInterface {
  signUp(user: CreateUserDto): Promise<ApiResponse<SignUpResponse>>;

  signIn(user: SignInUserDto): Promise<ApiResponse<SignInResponse>>;
}
