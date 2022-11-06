import { LOCAL_STORAGE_PASSWORD_MAPPING_KEY } from "../constants/localStorage";

export default function getPassword(address: string) {
  const localStoragePassword = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_PASSWORD_MAPPING_KEY) ?? "{}"
  );
  return localStoragePassword[address];
}
