export type Company = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
  industry: string;
  companySize: CompanySize;
  teamSize: number;
  stemOpenings: number;
};

export enum CompanySize {
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

export enum CompanyRole {
  CEO = 'CEO',
  HUMAN_RESOURCES = 'HUMAN_RESOURCES',
  TALENT_ACQUISITION = 'TALENT_ACQUISITION',
  TECHNICAL_LEAD = 'TECHNICAL_LEAD',
}

export type CompanyMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isPending: boolean;
  role: CompanyRole;
};

export type CreateMemberParams = Omit<CompanyMember, 'id'>;
