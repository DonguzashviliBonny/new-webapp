import { VerificationLevelT } from "@/api/types/user";
import { VerificationLimitsT } from "../common";

export type VerificationUIProps = {
  readonly verification: VerificationLevelT;
  readonly limits: VerificationLimitsT[][];
  readonly userName?: string;
  readonly hashLinkClass: string;
  readonly hashLinkId: string;
};
