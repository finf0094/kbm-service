import {IItem} from "./IItem.ts";

export interface IDepartment {
    id: number,
    name: string,
    location?: IItem,
}

