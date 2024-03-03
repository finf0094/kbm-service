import { IDepartment } from '@/entities/department/model/IDepartment'

export interface IPosition {
	id: number;
	name: string;
	department?: IDepartment;
}