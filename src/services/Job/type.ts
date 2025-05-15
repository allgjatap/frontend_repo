import { Company } from '../Company/type';

export enum JobExperience {
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  MID_SENIOR = 'MID_SENIOR',
  SENIOR = 'SENIOR',
}

export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  FREELANCE = 'FREELANCE',
}

export enum JobWorkplace {
  ON_SITE = 'ON_SITE',
  HYBRID = 'HYBRID',
  REMOTE = 'REMOTE',
}

export enum JobEducation {
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum JobDepartment {
  SUSTAINABILITY_ENVIRONMENT = 'SUSTAINABILITY_ENVIRONMENT',
  ARCHITECTURE_CIVIL = 'ARCHITECTURE_CIVIL',
  ENGINEERING = 'ENGINEERING',
  PHYSICS_GEOSCIENCES = 'PHYSICS_GEOSCIENCES',
  DIGITAL_TRANSFORMATION_IT = 'DIGITAL_TRANSFORMATION_IT',
  INCL_DATA_SCIENCE_AI = 'INCL_DATA_SCIENCE_AI',
  MATHEMATIC = 'MATHEMATIC',
  BIOLOGY_CHEMISTRY = 'BIOLOGY_CHEMISTRY',
  MEDICINE_HEALTH = 'MEDICINE_HEALTH',
}

export type Job = {
  id: string;
  title: string;
  department: JobDepartment;
  workplace: JobWorkplace;
  location: string;
  employmentType: EmploymentType;
  experience: JobExperience;
  education: JobEducation;
  language: string;
  from: number;
  to: number;
  currency: string;
  description: string;
  technicalSkills: string;
  softSkills: string;
  isPublished: boolean;
  applicants: number;
  createdAt: Date;
  company: Company;
};

export type JobListParams = {
  page: number;
  search: string;
};

export type CreateJobParams = {
  title: string;
  department: JobDepartment;
  workplace: JobWorkplace;
  location: string;
  employmentType: EmploymentType;
  experience: string;
  education: JobEducation;
  language: string;
  from: number;
  to: number;
  currency: string;
  description: string;
};

export type UpdateJobParams = CreateJobParams & { id: string };

export type PublishJobParams = {
  id: string;
  technicalSkills: string;
  softSkills: string;
};

export type ApplicateJobParams = {
  id: string;
  file?: File;
  url?: string;
};
