import { DAOS } from "../constants/daos";
import { Agreement } from "../constants/types";
import checkSalary from "../utils/checkSalary";
import useAgreementInfos from "./useAgreementInfos";

export default function useAgreement(agreementId: number): {
  data: Agreement | null;
  isLoading: boolean;
  error: Error | null;
} {
  const { data: agreementInfos, isLoading, error } = useAgreementInfos();

  const agreementInfo =
    agreementInfos.find((a) => a.id === agreementId) ?? null;
  const daoInfo = agreementInfo
    ? DAOS.find((d) => d.address === agreementInfo.issuer)
    : null;

  return {
    data: !isLoading
      ? agreementInfo && daoInfo
        ? { ...agreementInfo, dao: daoInfo }
        : null
      : null,
    isLoading,
    error,
  };
}
