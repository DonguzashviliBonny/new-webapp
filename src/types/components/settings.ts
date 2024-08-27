import { VerificationLimitsT } from "../common";
import { VerificationLevelResT } from "@/api/types/responses/user";

export type VerificationUIProps = {
  readonly verification: VerificationLevelResT["data"];
  readonly limits: VerificationLimitsT[][];
  readonly userName?: string;
  readonly hashLinkClass: string;
  readonly hashLinkId: string;
};
