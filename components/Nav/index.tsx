import { Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Nav = () => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"1130px"}
      py={8}
    >
      <Image
        src="/logo.png"
        style={{ marginTop: -16 }}
        height={36}
        width={120}
        alt="Logo"
      />
      <ConnectButton showBalance={false} />
    </Flex>
  );
};

export default Nav;
