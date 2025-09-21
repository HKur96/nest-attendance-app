import { ApiResponse } from "@/utils/api.response";
import { CreateCityDto } from "../dtos/createCity.dto";
import { CityResponse } from "../responses/city.response";

export interface CityRepositoryInterface {
    createCity(city: CreateCityDto): Promise<ApiResponse<CityResponse>>
}