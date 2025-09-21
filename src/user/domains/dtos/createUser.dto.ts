import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Role must be either ADMIN or EMPLOYEE' })
  role?: Role;

  @IsOptional()
  @IsInt({ message: 'cityId must be an integer' })
  cityId?: number;

  @IsOptional()
  @IsInt({ message: 'buildingId must be an integer' })
  buildingId?: number;
}
