import { DAO } from "../constants/types";
import useDAOs from "./useDAOs";

export default function useDAO(daoNameOrAddress: string): {
  data: DAO | null;
  isLoading: boolean;
  error: Error | null;
} {
  const { data: daos, isLoading, error } = useDAOs();
  return {
    data:
      daos.find(
        (dao) =>
          dao.address.toLowerCase() === daoNameOrAddress.toLowerCase() ||
          dao.name.toLowerCase() === daoNameOrAddress.toLowerCase()
      ) ?? null,
    isLoading,
    error,
  };
}
