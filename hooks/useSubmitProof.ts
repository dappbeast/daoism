import { BigNumber, ethers } from "ethers";
import { useEffect } from "react";
import {
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
} from "wagmi";
import { UseContractWriteConfig } from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import { WORK_AGREEMENT_ADDRESS } from "../constants/contracts";
import { LOCAL_STORAGE_PROOF_KEY } from "../constants/localStorage";
import WORK_AGREEMENT_ABI from "../constants/WorkAgreement.json";

export default function useSubmitProof(): {
  write: () => void;
  isLoading: boolean;
  isSuccess: boolean;
  hash: string | null;
} {
  const avgPolyA = [
    BigNumber.from(
      "10658735407085655039803889864625951203798056727151496024587273132393996766571"
    ),
    BigNumber.from(
      "8515389706036162277348997449266298178865999005213494270077938544193019520660"
    ),
  ];
  const avgPolyB = [
    [
      BigNumber.from(
        "18775017423532045311546282253568241709288012043937502648193039300920726915984"
      ),
      BigNumber.from(
        "10682248757090314345558312856583051789271290145849137568526478972769005300794"
      ),
    ],
    [
      BigNumber.from(
        "9720735845566932849651944229488945224894571338256333815572378391631671053778"
      ),
      BigNumber.from(
        "19124545566364613341338865828151713453412962288799821778550858972832788366140"
      ),
    ],
  ];
  const avgPolyC = [
    BigNumber.from(
      "3752928384440471056391102616816189999225330019557578780401410979019146292359"
    ),
    BigNumber.from(
      "4008629273099156108090484523423354494755820764595198319208992548345773570954"
    ),
  ];

  const hashPolyA = [
    BigNumber.from(
      "19046703294818355791280684828073347500877452533890388562393745102811535031542"
    ),
    BigNumber.from(
      "7815320880710674450990527737010572682019643566576519056578865271275545642845"
    ),
  ];
  const hashPolyB = [
    [
      BigNumber.from(
        "1341936206627159597513908184492690558096734540094121057607951533435793064608"
      ),
      BigNumber.from(
        "10084277661047054787931524198404787881224283485604988169418510626103555688770"
      ),
    ],
    [
      BigNumber.from(
        "2196074598799980213712758546768233452858872360965599704991704163427793785310"
      ),
      BigNumber.from(
        "9792953969066823860083024058589283578786417185489253348603378186155127301919"
      ),
    ],
  ];
  const hashPolyC = [
    BigNumber.from(
      "611439015396312851143602378079812335879017611319999689337086212570919920073"
    ),
    BigNumber.from(
      "8335115671945789531241162422043984491482519805600140787499187759306522800962"
    ),
  ];

  const { config } = usePrepareContractWrite({
    address: WORK_AGREEMENT_ADDRESS,
    abi: WORK_AGREEMENT_ABI,
    functionName: "submitAverageSalaryProof",
    args: [
      "0x61bF6080043bc5520d8c8BE8D44704eD0F45a8CD",
      [BigNumber.from(140450), BigNumber.from(162450)],
      avgPolyA,
      avgPolyB,
      avgPolyC,
      "0xA8Dd58135c1b0Ddc452c01d4811F5910Fb4D1C28",
      hashPolyA,
      hashPolyB,
      hashPolyC,
    ],
  });

  const { data, write } = useContractWrite(
    config as UseContractWriteConfig<readonly unknown[], string>
  );

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    write: () => write?.(),
    isLoading,
    isSuccess,
    hash: data?.hash ?? null,
  };
}
