import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props: any) {
  const { recipient, role, baseSalary, startDate, endDate } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr borderBottom={"1px solid grey"} p={6}>
      <Td color={"white"} minWidth={{ sm: "250px" }} pl="0px">
        {recipient}
      </Td>

      <Td pl="0px">
        <Badge
          bg={role === "Online" ? "green.400" : bgStatus}
          color={role === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {role}
        </Badge>
      </Td>

      <Td pl="0px">
        <Flex direction="column">
          <Text fontSize="md" color={"white"} fontWeight="bold" minWidth="100%">
            {baseSalary}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            USDC Annually
          </Text>
        </Flex>
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={"white"} fontWeight="bold" pb=".5rem">
          {startDate}
        </Text>
      </Td>

      <Td pl="0px">
        <Text fontSize="md" color={"white"} fontWeight="bold" pb=".5rem">
          {endDate}
        </Text>
      </Td>

      <Td pl="0px">
        <Button p="6px" bg="green" variant="no-hover">
          <Text
            fontSize="md"
            color={"white"}
            fontWeight="bold"
            cursor="pointer"
          >
            View
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
