export enum Role {
  Designer1 = "DESIGNER_1",
  Designer2 = "DESIGNER_2",
  Engineer1 = "ENGINEER_1",
  Engineer2 = "ENGINEER_2",
  Marketing1 = "MARKETING_1",
  Marketing2 = "MARKETING_2",
}

export enum AgreementState {
  Empty,
  Live,
  Cancelled,
}

export type AgreementInfo = {
  id: number;
  issuer: string;
  recipient: string;
  role: Role;
  state: AgreementState;
  startDate: number;
  endDate: number | null;
  salaryHash: string;
  salary: number | null;
  isLoggedIn: boolean;
};

export type Agreement = AgreementInfo & {
  dao: DAOInfo;
};

export type DAOInfo = {
  name: string;
  logoUri: string;
  address: string;
};

export type DAO = DAOInfo & { agreements: AgreementInfo[] };
