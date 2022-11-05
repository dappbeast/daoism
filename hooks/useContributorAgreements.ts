import { useEffect, useState } from "react";
import AGREEMENTS from "../constants/agreements";
import DAOS from "../constants/daos";
import { Agreement } from "../constants/types";

export default function useContributorAgreements(contributorAddress: string): {
  data: Agreement[];
  isLoading: boolean;
  error: Error | null;
} {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => setIsLoading(false);
  }, [contributorAddress]);

  const agreementInfos = AGREEMENTS.filter(
    (a) => a.recipient === contributorAddress
  );
  const agreements: Agreement[] = agreementInfos
    .map((a) => {
      const dao = DAOS.find((d) => d.address === a.issuer) ?? null;
      return { ...a, dao };
    })
    .filter((a) => a.dao != null) as Agreement[];

  return {
    data: !isLoading ? agreements : [],
    isLoading,
    error: null,
  };
}
