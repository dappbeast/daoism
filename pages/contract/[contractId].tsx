import { useRouter } from "next/router";

export default function DAO() {
  const { query } = useRouter();
  const contractId = parseInt(query.contractId?.toString() ?? "");
  return <p>Contract: {contractId}</p>;
}
