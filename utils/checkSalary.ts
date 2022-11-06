import { ethers } from "ethers";
import hashSalary from "./hashSalary";

export default function checkSalary(
  salary: number,
  secret: string | number,
  salaryHash: ethers.utils.BytesLike
): boolean {
  const computedHash = hashSalary(salary, secret);
  return computedHash === salaryHash;
}
