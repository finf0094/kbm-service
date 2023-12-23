import {IErrorResponse} from "./IErrorResponse.ts";

export interface CustomError {
    data: IErrorResponse,
    status: string
}