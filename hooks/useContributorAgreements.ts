import { DAOS } from "../constants/daos";
import { Agreement } from "../constants/types";
import useAgreementInfos from "./useAgreementInfos";

export default function useContributorAgreements(contributorAddress: string): {
  data: Agreement[];
  isLoading: boolean;
  error: Error | null;
} {
  const { data: agreementInfos, isLoading, error } = useAgreementInfos();
  const agreements: Agreement[] = agreementInfos
    .filter((a) => a.recipient === contributorAddress)
    .map((a) => {
      const dao = DAOS.find((d) => d.address === a.issuer) ?? null;
      return { ...a, dao };
    })
    .filter((a) => a.dao != null) as Agreement[];

  return {
    data: agreements,
    isLoading,
    error,
  };
}
