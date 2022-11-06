import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface TableRowProps {
  recipient: string;
  role: string;
  baseSalary: string;
  startDate: number;
  endDate: number | null;
}

function TablesTableRow(props: TableRowProps) {
  const [showSalary, setShowSalary] = useState(false);
  const { recipient, role, baseSalary, startDate, endDate } = props;

  // TODO: CHANGE STATUS COLORS FOR BADGES
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const recipientPrefix =
    recipient.substring(0, 6) +
    ".." +
    recipient.substring(recipient.length - 4);

  const bullets = (
    <Text fontSize={20} mr={2}>
      &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
    </Text>
  );

  return (
    <Tr borderBottom={"1px solid grey"} p={50}>
      <Td color={"white"} pl="0px" w={"200px"}>
        {recipientPrefix}
      </Td>

      <Td pl="0px" w={"200px"}>
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

      <Td pl="0px" w={"200px"}>
        <Flex direction="column">
          <Text fontSize="md" color={"white"} fontWeight="bold" minWidth="100%">
            {showSalary ? baseSalary : bullets}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            USDC Annually
          </Text>
        </Flex>
      </Td>

      <Td pl="0px" w={"200px"}>
        <Text fontSize="md" color={"white"} fontWeight="bold" pb=".5rem">
          {startDate}
        </Text>
      </Td>

      <Td pl="0px" w={"200px"}>
        <Text fontSize="md" color={"white"} fontWeight="bold" pb=".5rem">
          {endDate ? endDate : "-"}
        </Text>
      </Td>

      <Td pl="0px" w={"50px"}>
        <Button
          px="14px"
          py="12px"
          bg="pink"
          variant="no-hover"
          borderRadius={16}
        >
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
