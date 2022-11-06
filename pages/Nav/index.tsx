import { Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Nav = () => {
  const navBarElements = [
    {
      label: "Get Started",
      //  path: "/landing-page",
      //  icon: <Search2Icon />,
    },
    {
      label: "Github",
      //  path: "/main-page",
      //  icon: <CalendarIcon />,
    },
    {
      label: "Docs",
    },
  ];
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"1130px"}
      py={8}
      px={40}
    >
      <Text color={"white"}>Logo Placeholder</Text>
      <HStack
        spacing={20}
        pr={8}
        alignContent={"flex-start"}
        justifyContent={"space-between"}
      >
        {navBarElements.map((element) => (
          <HStack key={element.label} spacing={3} alignItems={"center"}>
            <Heading color={"white"} fontSize={"lg"} mx={4}>
              {element.label}
            </Heading>
            {/*{element.icon}*/}
          </HStack>
        ))}
        <HStack spacing={3} alignItems={"center"}>
          <ConnectButton showBalance={false} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Nav;
