export interface ICuratorDetail {
    id: number;
    fullName: string;
    birthDate: string; // Или Date, если вы хотите использовать объекты даты
    itin: string;
    curatorNumber: string;
    personalPhoneNumber: string;
    workPhoneNumber: string;
    email: string;
    education: string;
    certificateNumber: string;
    totalWorkExperience: number;
    curatorWorkExperience: number;
    workExperienceInCurrentPosition: number;
    academicDegree: string;
    academicTitle: string;
}