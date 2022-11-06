import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { Role } from "../../constants/types";
import useAgreement from "../../hooks/useAgreement";
import useCreateAgreement from "../../hooks/useCreateAgreement";
import getPassword from "../../utils/getPassword";

export default function AgreementPage() {
  const { query } = useRouter();
  const agreementId = parseInt(query.agreementId?.toString() ?? "");
  const { address } = useAccount();

  const { data: agreement, isLoading, error } = useAgreement(agreementId);

  const { write } = useCreateAgreement({
    startDate: 0,
    endDate: 0,
    role: Role.Designer1,
    salary: 100_000,
  });

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
