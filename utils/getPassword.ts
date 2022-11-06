import { LOCAL_STORAGE_PASSWORD_MAPPING_KEY } from "../constants/localStorage";

export default function getPassword(address: string): number | null {
  const localStoragePassword = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_PASSWORD_MAPPING_KEY) ?? "{}"
  );
  const password = parseInt(localStoragePassword[address]) ?? null;
  return password && !isNaN(password) ? password : null;
}
