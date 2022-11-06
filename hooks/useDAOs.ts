import { DAOS } from "../constants/daos";
import { DAO } from "../constants/types";
import useAgreementInfos from "./useAgreementInfos";

export default function useDAOs(): {
  data: DAO[];
  isLoading: boolean;
  error: Error | null;
} {
  const { data: agreementInfos, isLoading, error } = useAgreementInfos();
  const data = DAOS.map((daoInfo) => ({
    ...daoInfo,
    agreements: agreementInfos.filter((a) => a.issuer === daoInfo.address),
  }));
  return {
    data,
    isLoading,
    error,
  };
}
