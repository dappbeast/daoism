import { Flex, HStack, Heading, Text } from "@chakra-ui/react";

const Nav = () => {
  const navBarElements = [
    {
      label: "kim",
      //  path: "/landing-page",
      //  icon: <Search2Icon />,
    },
    {
      label: "pepe",
      //  path: "/main-page",
      //  icon: <CalendarIcon />,
    },
    {
      label: "Connect Wallet",
    },
  ];
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      w={"100%"}
      py={8}
      px={80}
    >
      <Text>Logo Placeholder</Text>
      <HStack
        spacing={20}
        pr={8}
        alignContent={"flex-start"}
        justifyContent={"space-between"}
      >
        {navBarElements.map((element) => (
          <HStack key={element.label} spacing={3} alignItems={"center"}>
            <Heading color={"primary"} fontSize={"lg"}>
              {element.label}
            </Heading>
            {/*{element.icon}*/}
          </HStack>
        ))}
      </HStack>
    </Flex>
  );
};

export default Nav;
