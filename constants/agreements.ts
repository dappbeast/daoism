import { AgreementInfo, Role } from "./types";

const AGREEMENTS: AgreementInfo[] = [
  {
    id: 1,
    issuer: "0x1",
    recipient: "0x01",
    role: Role.Designer1,
    startDate: 1651388400,
    endDate: 1669881600,
    hashedSalary: "abcdefg",
  },
  {
    id: 2,
    issuer: "0x2",
    recipient: "0x01",
    role: Role.Designer1,
    startDate: 1651388400,
    endDate: 1669881600,
    hashedSalary: "abcdefg",
  },
  {
    id: 3,
    issuer: "0x3",
    recipient: "0x01",
    role: Role.Designer1,
    startDate: 1651388400,
    endDate: 1669881600,
    hashedSalary: "abcdefg",
  },
  {
    id: 4,
    issuer: "0x1",
    recipient: "0x02",
    role: Role.Designer2,
    startDate: 1651388400,
    endDate: 1669881600,
    hashedSalary: "ageagage",
  },
  {
    id: 5,
    issuer: "0x1",
    recipient: "0x03",
    role: Role.Engineer2,
    startDate: 1651388400,
    endDate: 1669881600,
    hashedSalary: "ageageg0i13412",
  },
  {
    id: 6,
    issuer: "0x2",
    recipient: "0x04",
    role: Role.Marketing1,
    startDate: 1651388400,
    endDate: 1669881600,
    hashedSalary: "ageageg0i13412",
  },
  {
    id: 7,
    issuer: "0x3",
    recipient: "0x05",
    role: Role.Marketing2,
    startDate: 1651388400,
    endDate: 1669881600,
    hashedSalary: "ageagegage0i13412",
  },
];

export default AGREEMENTS;
