import useAgreements from "../hooks/useContributorAgreements";

export default function ContributorPage() {
  const walletAddress = "0x01"; // TODO: Use connected wallet

  const { data: agreements, isLoading } = useAgreements(walletAddress);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Contributor {walletAddress}</h1>
      <h2>Agreements</h2>
      {agreements.map((agreement) => (
        <p key={agreement.id}>
          ID #{agreement.id} - {agreement.role} - {agreement.dao.name}
        </p>
      ))}
    </div>
  );
}
