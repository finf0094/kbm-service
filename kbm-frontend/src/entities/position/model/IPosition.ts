import { IDepartment } from './IDepartment'

export interface IPosition {
	id: number;
	name: string;
	department?: IDepartment;
}