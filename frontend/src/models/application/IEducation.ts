
export interface IEducation {
    id: number,
    dateIssued: string,
    educationalInstitution: string,
    specialization: string,
    degreeDiploma: EducationDegrees
}

export type IEducationWithoutId = Omit<IEducation, 'id'>;

export enum EducationDegrees {
    BACHELOR, MASTER, ASSOCIATE, DOCTORAL
}