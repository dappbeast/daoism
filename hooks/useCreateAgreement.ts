import { BigNumber, ethers } from "ethers";
import { useEffect, useMemo } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { UseContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import { WORK_AGREEMENT_ADDRESS } from "../constants/contracts";
import { LOCAL_STORAGE_AGREEMENT_MAPPING_KEY } from "../constants/localStorage";
import { Role } from "../constants/types";
import WORK_AGREEMENT_ABI from "../constants/WorkAgreement.json";
import getPassword from "../utils/getPassword";
import hashSalary from "../utils/hashSalary";
import useAgreementInfos from "./useAgreementInfos";

type CreateAgreementInputs = {
  startDate: number;
  endDate: number | null;
  role: Role;
  salary: number;
};

export default function useCreateAgreement({
  startDate,
  endDate,
  role,
  salary,
}: CreateAgreementInputs): {
  write: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  isSuccess: boolean;
  agreementId: number | null;
} {
  const { data: agreements } = useAgreementInfos();
  const nextId = useMemo(() => {
    return agreements.sort((a, b) => b.id - a.id)[0].id + 1;
  }, [agreements]);

  const { address } = useAccount();
  const password = getPassword(address ?? "");

  const isEnabled =
    !isNaN(startDate) &&
    (!endDate || !isNaN(endDate)) &&
    startDate > 0 &&
    !!address &&
    !!password &&
    !!salary;

  const { config } = usePrepareContractWrite({
    address: WORK_AGREEMENT_ADDRESS,
    abi: WORK_AGREEMENT_ABI,
    functionName: "issueAgreement",
    args: isEnabled
      ? [
          [
            address,
            BigNumber.from(startDate),
            BigNumber.from(endDate ?? 0),
            ethers.utils.formatBytes32String(role),
            hashSalary(salary, password),
          ],
        ]
      : [],
    enabled: isEnabled,
  });

  const { data, write } = useContractWrite(
    config as UseContractWriteConfig<readonly unknown[], string>
  );

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      const localStorageAgreement = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_AGREEMENT_MAPPING_KEY) ?? "{}"
      );
      localStorage.setItem(
        LOCAL_STORAGE_AGREEMENT_MAPPING_KEY,
        JSON.stringify({
          ...localStorageAgreement,
          [nextId]: salary,
        })
      );
    }
  }, [isSuccess, nextId, salary]);

  return {
    write: () => write?.(),
    isLoading,
    isSuccess,
    isDisabled: !isEnabled,
    agreementId: isSuccess ? nextId : null,
  };
}
