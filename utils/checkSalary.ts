import { ethers } from "ethers";

export default function checkSalary(
  salary: number,
  secret: string | number,
  salaryHash: ethers.utils.BytesLike
): boolean {
  const salaryBn = ethers.utils.parseEther(salary.toString());
  const computedHash = ethers.utils.sha256(
    ethers.utils.defaultAbiCoder.encode(
      [typeof secret === "number" ? "uint" : "string", "uint"],
      [secret, salaryBn]
    )
  );
  return computedHash === salaryHash;
}
