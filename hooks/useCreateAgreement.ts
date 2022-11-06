import { BigNumber, ethers } from "ethers";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { UseContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import { WORK_AGREEMENT_ADDRESS } from "../constants/contracts";
import { Role } from "../constants/types";
import WORK_AGREEMENT_ABI from "../constants/WorkAgreement.json";
import hashSalary from "../utils/hashSalary";

type CreateAgreementInputs = {
  startDate: number;
  endDate: number | null;
  role: Role;
  salary: number;
  password: string;
};

export default function useCreateAgreement({
  startDate,
  endDate,
  role,
  salary,
  password,
}: CreateAgreementInputs): {
  write: () => void;
  isLoading: boolean;
  isSuccess: boolean;
} {
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: WORK_AGREEMENT_ADDRESS,
    abi: WORK_AGREEMENT_ABI,
    functionName: "issueAgreement",
    args: [
      [
        address,
        BigNumber.from(startDate),
        BigNumber.from(endDate ?? 0),
        ethers.utils.formatBytes32String(role),
        hashSalary(salary, password),
      ],
    ],
  });
  const { data, write } = useContractWrite(
    config as UseContractWriteConfig<readonly unknown[], string>
  );

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    write: () => write?.(),
    isLoading,
    isSuccess,
  };
}
