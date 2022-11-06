import { useAccount } from "wagmi";
import useAgreements from "../hooks/useContributorAgreements";

export default function ContributorPage() {
  const { address } = useAccount();

  const { data: agreements, isLoading } = useAgreements(address);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Contributor {address}</h1>
      <h2>Agreements</h2>
      {agreements.map((agreement) => (
        <p key={agreement.id}>
          ID #{agreement.id} - {agreement.role} - {agreement.dao.name}
        </p>
      ))}
    </div>
  );
}
