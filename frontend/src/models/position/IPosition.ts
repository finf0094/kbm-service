import {IDepartment} from "./IDepartment.ts";

export interface IPosition {
    id: number,
    name: string,
    department?: IDepartment
}
