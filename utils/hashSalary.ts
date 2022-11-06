import { ethers } from "ethers";

export default function hashSalary(salary: number, secret: number): string {
  if (!salary || !secret) {
    return "";
  }
  const computedHash = ethers.utils.sha256(
    ethers.utils.defaultAbiCoder.encode(["uint", "uint"], [secret, salary])
  );
  return computedHash;
}
