import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import useAgreement from "../../hooks/useAgreement";

export default function AgreementPage() {
  const { query } = useRouter();
  const agreementId = parseInt(query.agreementId?.toString() ?? "");

  const { data: agreement, isLoading } = useAgreement(agreementId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!agreement) {
    return <p>Agreement does not exist</p>;
  }

  return (
    <div>
      <h1>Agreement {agreement.id}</h1>
      <p>{JSON.stringify(agreement)}</p>
    </div>
  );
}
