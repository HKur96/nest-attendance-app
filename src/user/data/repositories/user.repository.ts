import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/config/prisma/prisma.service';
import { UserRepositoryInterface } from '../../domains/repositories/UserRepositoryInterface';
import { CreateUserDto } from '@/user/domains/dtos/createUser.dto';
import { SignInUserDto } from '@/user/domains/dtos/signInUser.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  SignInResponse,
  SignUpResponse,
} from '@/user/domains/responses/user.response';
import { ApiResponse } from '@/utils/api.response';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(user: CreateUserDto): Promise<ApiResponse<SignUpResponse>> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser) {
        return ApiResponse.error('Email already registered')
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          role: user.role,
          cityId: user.cityId,
          buildingId: user.buildingId,
        },
        include: {
          city: { select: { name: true } },
          building: { select: { name: true } },
        },
      });

      // Generate JWT token
      const token = await this.jwtService.signAsync({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      return ApiResponse.success(
        'User registered succesfully',
        new SignUpResponse({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          cityName: newUser.city.name || null,
          buildingName: newUser.building.name || null,
          token,
        }),
      );
    } catch (err) {
      return ApiResponse.error('Unexpected error');
    }
  }

  async signIn(user: SignInUserDto): Promise<ApiResponse<SignInResponse>> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: user.email },
        include: {
          city: { select: { name: true } },
          building: { select: { name: true } },
        },
      });

      if (!existingUser) {
        return ApiResponse.error('Email not registered')
      }

      const passwordMatch = await bcrypt.compare(user.password, user.password);

      if (!passwordMatch) {
        return ApiResponse.error('Invalid email or password')
      }

      const token = await this.jwtService.signAsync({
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      });

      return ApiResponse.success(
        'Login Succesful',
        new SignInResponse({
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          token,
          role: existingUser.role,
          buildingName: existingUser.building.name || null,
          cityName: existingUser.name || null,
        }),
      );
    } catch (error) {
      return ApiResponse.error('Unexpected error');
    }
  }
}
