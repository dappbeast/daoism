import { useContractRead } from "wagmi";
import { WORK_AGREEMENT_ADDRESS } from "../constants/contracts";
import { AgreementInfo } from "../constants/types";
import WORK_AGREEMENT_ABI from "../constants/WorkAgreement.json";

export default function useAgreementInfos(): {
  data: AgreementInfo[];
  isLoading: boolean;
  error: Error | null;
} {
  const { data, isLoading, error } = useContractRead({
    address: WORK_AGREEMENT_ADDRESS,
    abi: WORK_AGREEMENT_ABI,
    functionName: "getAgreements",
  });
  return {
    data: [],
    isLoading,
    error,
  };
}
