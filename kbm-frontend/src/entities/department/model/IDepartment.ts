import { ILocation } from '@/entities/location/model/ILocation.ts'

export interface IDepartment {
  id: number;
  name: string;
  location: ILocation;
}