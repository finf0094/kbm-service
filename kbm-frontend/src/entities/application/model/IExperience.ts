
export interface IExperience {
    id: number,
    company: string,
    position: string,
    jobResponsibilities: string,
    workStart: string,
    workEnd: string
}

export type IExperienceWithoutId = Omit<IExperience, 'id'>