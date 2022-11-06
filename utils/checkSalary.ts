import { ethers } from "ethers";

export default function checkSalary(
  salary: number,
  secret: string,
  salaryHash: ethers.utils.BytesLike
): boolean {
  const salaryBn = ethers.utils.parseEther(salary.toString());
  const computedHash = ethers.utils.sha256(
    ethers.utils.defaultAbiCoder.encode(["uint", "uint"], [secret, salaryBn])
  );
  return computedHash === salaryHash;
}
