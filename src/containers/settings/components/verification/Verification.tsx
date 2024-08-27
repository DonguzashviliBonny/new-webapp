import { useUserSettingsVerificationLevelReq } from "@/api/requests/user";
// import VerificationUI from "@/components/settings/components/verification/VerificationUI";
import VerificationSkeleton from "@/components/settings/components/verification/VerificationUI-skeleton";
import { LimitsT, VerificationLimitsT } from "@/types";
// import { VerificationUIProps } from "@/types/components/settings";
import { useEffect, useState } from "react";

const VerificationContainer = ({ token, isLoading }: { token: string; isLoading: boolean }) => {
  const [
    ,
    // limits
    setLimits,
  ] = useState<VerificationLimitsT[][]>([
    [
      { type: "Fiat Deposit Limits" },
      { type: "Fiat Withdrawal Limits" },
      { type: "Crypto Deposit Limits" },
      { type: "Crypto Withdrawal Limits" },
      { type: "P2P Transaction Limits" },
    ],
  ]);
  const { data } = useUserSettingsVerificationLevelReq(token);

  const findAmount = (arr: LimitsT[], type: string) => arr.find((i) => i.type === type)?.amount;

  useEffect(() => {
    data?.verificationLevels.forEach((item) => {
      const newArr = [
        {
          type: "Fiat Deposit Limits",
          amount: findAmount(item.limits, "FiatDeposit"),
        },
        {
          type: "Fiat Withdrawal Limits",
          amount: findAmount(item.limits, "FiatWithdrawal"),
        },
        {
          type: "Crypto Deposit Limits",
          amount: findAmount(item.limits, "CryptoDeposit"),
        },
        {
          type: "Crypto Withdrawal Limits",
          amount: findAmount(item.limits, "CryptoWithdrawal"),
        },
        {
          type: "P2P Transaction Limits",
          amount: findAmount(item.limits, "P2PTransaction"),
        },
      ];
      setLimits((prev) => [...prev, newArr]);
    });
  }, [data]);

  if (!data || isLoading) return <VerificationSkeleton />;

  // const props: VerificationUIProps = {
  //   verification: data,
  //   limits,
  //   hashLinkClass: "",
  //   hashLinkId: "",
  // };

  // return <VerificationUI {...props} />;
  return <>test</>;
};

export default VerificationContainer;
