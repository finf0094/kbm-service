export interface IUpdateCurator {
    id?: number;
    fullName?: string;
    birthDate?: string; // Или Date
    itin?: string;
    curatorNumber?: string;
    personalPhoneNumber?: string;
    workPhoneNumber?: string;
    email?: string;
    education?: string;
    certificateNumber?: string;
    totalWorkExperience?: number;
    curatorWorkExperience?: number;
    workExperienceInCurrentPosition?: number;
    academicDegree?: string;
    academicTitle?: string;
}