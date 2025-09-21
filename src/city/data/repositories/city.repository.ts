import { CreateCityDto } from '@/city/domains/dtos/createCity.dto';
import { CityRepositoryInterface } from '@/city/domains/repositories/CityRepositoryInterface';
import { CityResponse } from '@/city/domains/responses/city.response';
import { PrismaService } from '@/infra/config/prisma/prisma.service';
import { ApiResponse } from '@/utils/api.response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CityRepository implements CityRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createCity(dto: CreateCityDto): Promise<ApiResponse<CityResponse>> {
    try {
      const newCity = await this.prismaService.city.create({
        data: {
          name: dto.name,
          latitude: dto.latitude,
          longitude: dto.longitude,
          radiusMeters: dto.radius_meters,
        },
      });
      return ApiResponse.success(
        'Create a city succesfully',
        new CityResponse(newCity),
      );
    } catch (error) {
      return ApiResponse.error('Unexpected error');
    }
  }

  async getCityById(id: number): Promise<ApiResponse<CityResponse>> {
    try {
      const city = await this.prismaService.city.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          latitude: true,
          longitude: true,
        },
      });

      if (!city) {
        return ApiResponse.error('City not found', 404);
      }

      return ApiResponse.success(
        'Get city successfully',
        new CityResponse(city),
      );
    } catch (error) {
      return ApiResponse.error('Unexpected error');
    }
  }
}
