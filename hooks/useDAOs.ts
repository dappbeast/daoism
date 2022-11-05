import { useEffect, useState } from "react";
import AGREEMENTS from "../constants/agreements";
import DAOS from "../constants/daos";
import { DAO } from "../constants/types";

export default function useDAOs(): {
  data: DAO[];
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
  }, []);

  const data = DAOS.map((daoInfo) => ({
    ...daoInfo,
    agreements: AGREEMENTS.filter((a) => a.issuer === daoInfo.address),
  }));
  return {
    data: !isLoading ? data : [],
    isLoading,
    error: null,
  };
}
