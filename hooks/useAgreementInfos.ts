import { BigNumber } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { useContractRead } from "wagmi";
import { WORK_AGREEMENT_ADDRESS } from "../constants/contracts";
import { AgreementInfo, AgreementState, Role } from "../constants/types";
import WORK_AGREEMENT_ABI from "../constants/WorkAgreement.json";
import coerce from "../utils/coerce";

type Data = {
  id: BigNumber;
  issuer: string;
  recipient: string;
  role: string;
  state: number;
  startDate: BigNumber;
  endDate: BigNumber;
  salaryHash: string;
};

function isServer() {
  return !(typeof window != "undefined" && window.document);
}

export default function useAgreementInfos(): {
  data: AgreementInfo[];
  isLoading: boolean;
  error: Error | null;
} {
  const {
    data: rawData,
    isLoading,
    error,
  } = useContractRead({
    address: WORK_AGREEMENT_ADDRESS,
    abi: WORK_AGREEMENT_ABI,
    functionName: "getAgreements",
    enabled: !isServer(),
  });
  const data = ((rawData as Data[])?.map((data) => ({
    id: data.id.toNumber(),
    issuer: getAddress(data.issuer),
    recipient: getAddress(data.recipient),
    role: coerce(Role, data.role),
    state: coerce(AgreementState, data.state),
    startDate: data.startDate.toNumber(),
    endDate: !data.endDate.isZero() ? data.endDate.toNumber() : null,
    salaryHash: data.salaryHash,
  })) ?? []) as AgreementInfo[];
  return {
    data,
    isLoading,
    error,
  };
}
