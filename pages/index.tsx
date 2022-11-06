import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import useDAOs from "../hooks/useDAOs";

export default function Onboarding() {
  const { push } = useRouter();

  const { address } = useAccount();
  const { data: daos } = useDAOs();

  const walletDao = daos.find((d) => d.address === address);

  useEffect(() => {
    if (walletDao) {
      push("/dao/" + walletDao.name);
    }
  }, [push, walletDao]);

  return <Text color={"white"}>Onboarding page</Text>;
}
