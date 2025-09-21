import { PrismaModule } from '@/infra/config/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CityController } from './applications/controllers/city.controller';
import { CityRepository } from './data/repositories/city.repository';
import { CityUseCase } from './data/use-cases/city.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [CityController],
  providers: [CityRepository, CityUseCase],
})
export class CityModule {}
