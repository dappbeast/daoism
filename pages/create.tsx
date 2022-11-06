import {
  Text,
  VStack,
  HStack,
  Heading,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { FiTrash } from "react-icons/fi";
import useCreateAgreement from "../hooks/useCreateAgreement";
import { Role } from "../constants/types";

const currencies = [
  { name: "USDC", icon: null, id: 1 },
  { name: "USDT", icon: null, id: 2 },
  { name: "DAI", icon: null, id: 3 },
];

const CreateAgreementForm = () => {
  const router = useRouter();

  const [contributorAddress, setContributorAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role, setRole] = useState<Role>(Role.Engineer1);
  const [salary, setSalary] = useState(0);

  const [showEndDateInput, setShowEndDateInput] = useState(false);

  const handleAddEndDate = () => {
    setShowEndDateInput(!showEndDateInput);
  };

  const startDateNum = new Date(startDate).getTime() / 1000;
  const endDateNum = endDate ? new Date(endDate).getTime() / 1000 : null;

  const { write, isDisabled, isLoading, isSuccess, agreementId } =
    useCreateAgreement({
      startDate: startDateNum,
      endDate: endDateNum,
      role: role,
      salary: salary,
    });

  useEffect(() => {
    if (!isLoading && isSuccess && agreementId) {
      router.push("/agreement/" + agreementId);
    }
  }, [isLoading, isSuccess, agreementId, router]);

  return (
    <VStack
      justifyContent={"flex-start"}
      w={"1130px"}
      alignItems={"flex-start"}
      mt={58}
      mb={60}
      spacing={8}
    >
      <Heading as={"h1"} fontSize={60} color={"white"}>
        Create Agreement
      </Heading>
      <form
        style={{
          width: "100%",
        }}
      >
        <HStack display={"flex"} justifyContent={"space-between"} spacing={14}>
          <VStack w={"50%"} alignItems={"flex-start"}>
            <FormLabel color={"white"} fontSize={24} fontWeight={800}>
              Contributor Wallet Address
            </FormLabel>
            <Input
              sx={{
                background:
                  "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, .4));",
              }}
              border={"none"}
              borderRadius={30}
              color={"white"}
              placeholder="0x123..456"
              name="contributorAddress"
              value={contributorAddress}
              onChange={(e) => setContributorAddress(e.target.value)}
            />
          </VStack>

          <VStack w={"50%"} alignItems={"flex-start"}>
            <FormLabel color={"white"} fontSize={24} fontWeight={800}>
              Role
            </FormLabel>
            <Select
              sx={{
                background:
                  "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, .4));",
              }}
              border={"none"}
              id="currencies"
              size="md"
              color={"white"}
              borderRadius={30}
              value={role}
            >
              {Object.values(Role).map((role) => (
                <option key={role} value={role} onClick={() => setRole(role)}>
                  {role}
                </option>
              ))}
            </Select>
          </VStack>
        </HStack>

        <VStack alignItems={"flex-start"} w={"100%"} mt={8}>
          <FormLabel mb={0} color={"white"} fontSize={24} fontWeight={800}>
            Salary
          </FormLabel>

          <HStack
            m={0}
            display={"flex"}
            justifyContent={"space-between"}
            spacing={14}
            w={"100%"}
          >
            <VStack w={"50%"} alignItems={"flex-start"}>
              <FormLabel mb={0} color={"grey"} fontWeight={400}>
                Amount
              </FormLabel>
              <Input
                sx={{
                  background:
                    "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, .4));",
                }}
                border={"none"}
                color={"white"}
                borderRadius={30}
                mt={0}
                type="number"
                placeholder="$0.00"
                value={salary}
                onChange={(e) => setSalary(parseInt(e.target.value))}
              />
            </VStack>

            <VStack w={"50%"} alignItems={"flex-start"}>
              <FormLabel mb={0} color={"grey"} fontWeight={400}>
                Currency
              </FormLabel>
              <Select
                sx={{
                  background:
                    "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, .4));",
                }}
                border={"none"}
                id="currencies"
                size="md"
                color={"white"}
                borderRadius={30}
              >
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.name}>
                    {currency.name}
                  </option>
                ))}
              </Select>
            </VStack>
          </HStack>
        </VStack>

        <VStack w={"50%"} alignItems={"flex-start"} mt={8}>
          <FormLabel mb={0} fontSize={24} color={"white"} fontWeight={800}>
            Duration
          </FormLabel>
          <HStack spacing={4} justifyContent={"center"} alignItems={"flex-end"}>
            <VStack alignItems={"flex-start"} spacing={0}>
              <FormLabel color={"grey"} fontWeight={400}>
                Start Date
              </FormLabel>
              <Input
                sx={{
                  background:
                    "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, .4));",
                }}
                border={"none"}
                color={"white"}
                borderRadius={30}
                mt={0}
                placeholder="0x1234567"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
              />
            </VStack>
            {showEndDateInput ? (
              <HStack alignItems={"flex-end"} spacing={4}>
                <VStack alignItems={"flex-start"} spacing={0}>
                  <FormLabel color={"grey"} fontWeight={400}>
                    End Date
                  </FormLabel>
                  <Input
                    sx={{
                      background:
                        "linear-gradient(to right, rgba(26, 26, 26, 1), rgba(26, 26, 26, .4));",
                    }}
                    border={"none"}
                    color={"white"}
                    borderRadius={30}
                    mt={0}
                    placeholder="0x1234567"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="date"
                  />
                </VStack>
                <Button onClick={handleAddEndDate} borderRadius={200}>
                  <FiTrash />
                </Button>
              </HStack>
            ) : (
              <Button
                bg={"#3F3F3F"}
                onClick={handleAddEndDate}
                borderRadius={30}
                color={"white"}
              >
                Add End Date
              </Button>
            )}
          </HStack>
        </VStack>
      </form>
      <HStack
        mt={80}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        spacing={4}
      >
        <Button
          color={"white"}
          bg={"#3F3F3F"}
          borderRadius={30}
          onClick={() => router.back()}
        >
          Go back
        </Button>
        <Button
          color={"white"}
          bg={"#FF009B"}
          borderRadius={30}
          type="submit"
          isDisabled={isDisabled}
          onClick={() => write()}
        >
          Send to contributor
        </Button>
      </HStack>
    </VStack>
  );
};

export default CreateAgreementForm;
