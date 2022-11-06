import {
  Text,
  VStack,
  HStack,
  Heading,
  FormLabel,
  Input,
  Button,
  Select,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";

import { useRouter } from "next/router";

import { FiTrash } from "react-icons/fi";

const currencies = [
  { name: "USDC", icon: null, id: 1 },
  { name: "USDT", icon: null, id: 2 },
  { name: "Dai", icon: null, id: 3 },
];

const tokens = [
  { name: "OP", icon: null, id: 1 },
  { name: "ETH", icon: null, id: 2 },
  { name: "USDC", icon: null, id: 3 },
];

const frequencies = [
  { frequency: "Annually", id: 1 },
  { frequency: "Monthly", id: 2 },
];

const CreateAgreementForm = () => {
  const initialValues = {
    contributorAddress: "",
    role: "",
    salaryAmount: "",
    vestingAmount: "",
    startDate: "",
    endDate: "",
    vestingEndDate: "",
    currency: "USDC",
    frequency: "Annually",
    token: "OP",
  };

  const router = useRouter();

  const [values, setValues] = useState(initialValues);
  const [showEndDateInput, setShowEndDateInput] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setValues({
      ...values,
      [key]: value,
    });

    console.log(values);
  };

  const handleAddEndDate = () => {
    setShowEndDateInput(!showEndDateInput);
  };

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
              borderRadius={30}
              //className="input-gradient"
              color={"white"}
              placeholder="0x1234567"
              name="contributorAddress"
              value={values.contributorAddress}
              onChange={(e) =>
                handleInputChange("contributorAddress", e.target.value)
              }
            />
          </VStack>

          <VStack w={"50%"} alignItems={"flex-start"}>
            <FormLabel color={"white"} fontSize={24} fontWeight={800}>
              Contributor Role
            </FormLabel>
            <Input
              color={"white"}
              borderRadius={30}
              placeholder="Engineer 1"
              name="role"
              value={values.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
            />
          </VStack>
        </HStack>

        <VStack alignItems={"flex-start"} w={"100%"} mt={8}>
          <FormLabel mb={0} color={"white"} fontSize={24} fontWeight={800}>
            Base Salary
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
                color={"white"}
                borderRadius={30}
                mt={0}
                placeholder="0x1234567"
                value={values.salaryAmount}
                onChange={(e) =>
                  handleInputChange("salaryAmount", e.target.value)
                }
              />
            </VStack>

            <VStack w={"50%"} alignItems={"flex-start"}>
              <FormLabel mb={0} color={"grey"} fontWeight={400}>
                Currency
              </FormLabel>
              <Select
                id="currencies"
                size="md"
                color={"white"}
                borderRadius={30}
                //name="currency"
                value={values.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              >
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.name}>
                    {currency.name}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack w={"50%"} alignItems={"flex-start"}>
              <FormLabel mb={0} color={"grey"} fontWeight={400}>
                Frequency
              </FormLabel>
              <Select
                id="tokens"
                size="md"
                color={"white"}
                borderRadius={30}
                name="frequency"
                value={values.frequency}
                onChange={(e) => handleInputChange("frequency", e.target.value)}
              >
                {frequencies.map((frequency) => (
                  <option key={frequency.id} value={frequency.frequency}>
                    {frequency.frequency}
                  </option>
                ))}
              </Select>
            </VStack>
          </HStack>
        </VStack>

        <VStack alignItems={"flex-start"} w={"100%"} mt={8}>
          <FormLabel mb={0} color={"white"} fontSize={24} fontWeight={800}>
            Vesting
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
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  // eslint-disable-next-line react/no-children-prop
                  children="$"
                />
                <Input
                  color={"white"}
                  borderRadius={30}
                  mt={0}
                  placeholder="0x1234567"
                  value={values.vestingAmount}
                  onChange={(e) =>
                    handleInputChange("vestingAmount", e.target.value)
                  }
                />
              </InputGroup>
            </VStack>

            <VStack w={"50%"} alignItems={"flex-start"}>
              <FormLabel mb={0} color={"grey"} fontWeight={400}>
                Token
              </FormLabel>
              <Select
                id="tokens"
                size="md"
                color={"white"}
                borderRadius={30}
                name="token"
                value={values.token}
                onChange={(e) => handleInputChange("token", e.target.value)}
              >
                {tokens.map((token) => (
                  <option key={token.id} value={token.name}>
                    {token.name}
                  </option>
                ))}
              </Select>
            </VStack>

            <VStack w={"50%"} alignItems={"flex-start"}>
              <FormLabel mb={0} color={"grey"} fontWeight={400}>
                Vesting End Date
              </FormLabel>
              <Input
                borderRadius={30}
                border={"1px solid white"}
                color={"white"}
                placeholder="Engineer 1"
                name="vestingEndDate"
                value={values.vestingEndDate}
                type="date"
                onChange={(e) => {
                  handleInputChange("vestingEndDate", e.target.value);
                }}
              />
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
                color={"white"}
                borderRadius={30}
                mt={0}
                placeholder="0x1234567"
                name="startDate"
                value={values.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
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
                    color={"white"}
                    borderRadius={30}
                    mt={0}
                    placeholder="0x1234567"
                    name="endDate"
                    value={values.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    type="date"
                  />
                </VStack>
                <Button onClick={handleAddEndDate} borderRadius={200}>
                  <FiTrash />
                </Button>
              </HStack>
            ) : (
              <Button onClick={handleAddEndDate} borderRadius={30}>
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
          bg={"none"}
          border={"1px solid white"}
          borderRadius={30}
          onClick={() => router.back()}
        >
          Go back
        </Button>
        <Button
          color={"white"}
          bg={"none"}
          border={"1px solid white"}
          borderRadius={30}
          type="submit"
        >
          Send to contributor
        </Button>
      </HStack>
    </VStack>
  );
};

export default CreateAgreementForm;
