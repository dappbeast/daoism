import {
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface TableRowProps {
  recipient: string;
  role: string;
  baseSalary: number | null;
  startDate: number;
  endDate: number | null;
  agreementId: number;
}

function TablesTableRow(props: TableRowProps) {
  const [showSalary, setShowSalary] = useState(false);
  const { recipient, role, baseSalary, startDate, endDate, agreementId } =
    props;

  const { push } = useRouter();

  // TODO: CHANGE STATUS COLORS FOR BADGES
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const badgeColors = {
    ENGINEER: "rgba(86, 106, 255, .35)",
    DESIGNER: "rgba(255, 0, 155, .35)",
    MARKETING: "rgba(127, 17, 224, .35)",
  };

  const badgeTextColor = {
    ENGINEER: "rgba(86, 106, 255, 1)",
    DESIGNER: "rgba(255, 0, 155, 1)",
    MARKETING: "rgba(127, 17, 224, 1)",
  };

  const badgeRole = role.substring(0, role.length - 2);

  const recipientPrefix =
    recipient.substring(0, 6) +
    ".." +
    recipient.substring(recipient.length - 4);

  const bullets = (
    <Text fontSize={20} mr={2}>
      &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
    </Text>
  );

  const startDateString = new Date(startDate * 1000 ?? 0).toLocaleDateString();
  const endDateString = new Date(endDate ?? 0).toLocaleDateString();

  return (
    <Tr borderBottom={"1px solid grey"} p={50}>
      <Td color={"white"} pl="0px" w={"200px"}>
        {recipientPrefix}
      </Td>

      <Td pl="0px" w={"200px"}>
        <Badge
          //bg={role === "Online" ? "green.400" : bgStatus}
          //color={role === "Online" ? "white" : colorStatus}
          bg={badgeColors[badgeRole]}
          fontSize="16px"
          px={4}
          py={4}
          borderRadius="8px"
          color={badgeTextColor[badgeRole]}
        >
          {role}
        </Badge>
      </Td>

      <Td pl="0px" w={"200px"}>
        <Flex direction="column">
          <Text fontSize="md" color={"white"} fontWeight="bold" minWidth="100%">
            {baseSalary !== null ? baseSalary : bullets}
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            USDC Annually
          </Text>
        </Flex>
      </Td>

      <Td pl="0px" w={"200px"}>
        <Text fontSize="md" color={"white"} fontWeight="bold" pb=".5rem">
          {startDateString}
        </Text>
      </Td>

      <Td pl="0px" w={"200px"}>
        <Text fontSize="md" color={"white"} fontWeight="bold" pb=".5rem">
          {endDate ? endDateString : "-"}
        </Text>
      </Td>

      <Td pl="0px" w={"50px"}>
        <Button
          px={6}
          py={6}
          variant="no-hover"
          borderRadius={30}
          sx={{
            background:
              "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, .4));",
          }}
        >
          <Text
            fontSize="md"
            color={"white"}
            fontWeight="bold"
            cursor="pointer"
            onClick={() => push(`/agreement/${agreementId}`)}
          >
            View
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
