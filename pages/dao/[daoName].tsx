import Image from "next/image";
import { useRouter } from "next/router";
import useDAO from "../../hooks/useDAO";

export default function DAOPage() {
  const { query } = useRouter();
  const daoName = query.daoName?.toString() ?? "";

  const { data: dao, isLoading } = useDAO(daoName);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!dao) {
    return <p>DAO does not exist</p>;
  }

  return (
    <div>
      <h1>{dao.name}</h1>
      <Image src={dao.logoUri} alt="Logo" width={120} height={120} />
      <h2>Agreements</h2>
      {dao.agreements.map((agreement) => (
        <p key={agreement.id}>
          ID #{agreement.id} - {agreement.role} - {dao.name} -{" "}
          {agreement.recipient}
        </p>
      ))}
    </div>
  );
}
