import { useState } from "react";
import { VerificationLevelT } from "@/api/types/user";
import { VerificationUIProps } from "@/types/components/settings";

const VerificationUI: React.FC<VerificationLevelT> = ({
  hashLinkClass,
  hashLinkId,
  limits,
  userName,
  verification,
}) => {
  return <>VERIFICATIONUI</>;
};

export default VerificationUI;
