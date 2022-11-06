import { LOCAL_STORAGE_PASSWORD_MAPPING_KEY } from "../constants/localStorage";

export default function logIn(address: string, password: string) {
  const localStoragePassword = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_PASSWORD_MAPPING_KEY) ?? ""
  );
  localStorage.setItem(
    LOCAL_STORAGE_PASSWORD_MAPPING_KEY,
    JSON.stringify({
      ...localStoragePassword,
      [address]: password,
    })
  );
}
