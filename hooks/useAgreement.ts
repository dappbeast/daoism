import { useEffect, useState } from "react";
import AGREEMENTS from "../constants/agreements";
import DAOS from "../constants/daos";
import { Agreement } from "../constants/types";

export default function useAgreement(agreementId: number): {
  data: Agreement | null;
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
  }, [agreementId]);

  const agreementInfo = AGREEMENTS.find((a) => a.id === agreementId) ?? null;
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
    error: null,
  };
}
