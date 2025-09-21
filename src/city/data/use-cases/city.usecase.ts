import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repositories/city.repository';
import { CreateCityDto } from '@/city/domains/dtos/createCity.dto';
import { ApiResponse } from '@/utils/api.response';
import { CityResponse } from '@/city/domains/responses/city.response';

@Injectable()
export class CityUseCase {
  constructor(private readonly cityRepository: CityRepository) {}

  async createCity(dto: CreateCityDto): Promise<ApiResponse<CityResponse>> {
    return await this.cityRepository.createCity(dto);
  }

  async getCityById(id: number) : Promise<ApiResponse<CityResponse>> {
    return await this.cityRepository.getCityById(id)
  }
}
