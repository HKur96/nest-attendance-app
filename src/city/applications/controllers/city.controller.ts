import { CityUseCase } from '@/city/data/use-cases/city.usecase';
import { CreateCityDto } from '@/city/domains/dtos/createCity.dto';
import { CityResponse } from '@/city/domains/responses/city.response';
import { ApiResponse } from '@/utils/api.response';
import { Roles } from '@/utils/decorators/role.decorator';
import { AuthGuard } from '@/utils/guards/auth.guard';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Controller('city')
@UseGuards(AuthGuard)
export class CityController {
  constructor(private readonly cityUseCase: CityUseCase) {}

  @Roles(Role.ADMIN)
  @Post('/create')
  async createCity(
    @Body() body: CreateCityDto,
  ): Promise<ApiResponse<CityResponse>> {
    return this.cityUseCase.createCity(body);
  }

  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @Get(':id')
  async getCityById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ApiResponse<CityResponse>> {
    return this.cityUseCase.getCityById(id);
  }
}
