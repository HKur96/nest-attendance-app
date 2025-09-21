export class CityResponse {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  radius_meters: number;

  constructor(partial: Partial<CityResponse>) {
    Object.assign(this, partial);
  }
}
