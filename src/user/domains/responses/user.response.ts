import { Building, City } from '@prisma/client';

export class SignUpResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  cityName?: string;
  buildingName?: string;
  token: string;

  constructor(partial: Partial<SignUpResponse>) {
    Object.assign(this, partial);
  }
}

export class SignInResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  cityName?: string;
  buildingName?: string;
  token: string;

  constructor(partial: Partial<SignInResponse>) {
    Object.assign(this, partial);
  }
}
