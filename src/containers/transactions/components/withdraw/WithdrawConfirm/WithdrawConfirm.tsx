import useTransactionsStore from "@/store/transactionsStore";

import classes from "./withdrawConfirm.module.scss";
import { ButtonPrimary, ButtonSecondary, Card, Divider, Flex, TextView, TextViewLevelT } from "nordom-ui";
import { WarningIcon } from "@/assets/svg";
import { formatAmountToString } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "@/hooks";
import { useCallback, useEffect, useState } from "react";
import { useWithdrawConfrimReq } from "@/api/requests/transactions";
import { PostWithdrawReqT } from "@/api/types/requests/transaction";
import { useOidc } from "@/oidc/oidc";
import SuccessCard from "@/components/reusables/cards/statusCard/StatusCard";

const WithdrawConfirm = () => {
  const navigate = useNavigate();
  const {
    oidcTokens: { accessToken },
  } = useOidc({ assertUserLoggedIn: true });
  const { withdrawCryptoData: data } = useTransactionsStore();
  const [status, setStatus] = useState<number>(0);

  const titleSizes: TextViewLevelT = useResponsive({ mobile: 16, tablet: 20 });
  const subtitleSizes: TextViewLevelT = useResponsive({ mobile: 14, tablet: 16 });

  const { mutate, isPending } = useWithdrawConfrimReq();

  const handleConfirm = () => {
    mutate(
      { token: accessToken, filter: data ? data : ({} as PostWithdrawReqT) },
      {
        onSuccess: (data) => {
          setStatus(data.status);
        },
      }
    );
  };

  const navigateBack = useCallback(() => {
    navigate(`/transactions/withdraw/crypto/btc`);
  }, [navigate]);

  useEffect(() => {
    if (!data) return navigateBack();
  }, [data, navigateBack]);

  if (status || isPending)
    return (
      <SuccessCard
        loading={isPending}
        status="success"
        title="Transaction Completed"
        subtitle="Your transaction is successfully processed. Funds have been transferred to the recipient."
        btn={{ text: "Done", onClick: () => navigate("/") }}
      />
    );

  return (
    <div className={classes.withdrawConfirm}>
      <Card className={classes.headerWrapper}>
        <Flex direction="column" gap={8}>
          <TextView size={titleSizes} weight="700" upperCase>
            Transaction Overview
          </TextView>
          <TextView color="nord400" weight="400" size={subtitleSizes}>
            Please doublecheck the information before you confirm
          </TextView>
        </Flex>
      </Card>
      <Divider className={classes.divider} />
      <Card className={classes.detailsWrapper}>
        <Flex gap={8} className={classes.warningBox}>
          <WarningIcon />
          <TextView size={14} weight="500" color="warning">
            Before you confirm the transaction, please doublecheck the wallet credentials
          </TextView>
        </Flex>
        <Flex direction="column" gap={8}>
          <TextView size={14} weight="500">
            Transaction details:
          </TextView>
          <Divider />
          <Detail name="Amount withdrawing" value={`${data?.amount} ${data?.asset}`} />
          <Detail name="Rate" value={`1${data?.asset} = ${formatAmountToString(data?.rate.toFixed(2) || "")} USD`} />
          <Detail name="Network" value={data?.network} />
          <Detail
            name="Transaction fee"
            value={`${data?.fee} ${data?.asset} ≈ ${data && (data?.fee * data?.rate).toFixed(2)} USD`}
          />
          <Detail name="Wallet address" value={data?.address} />
        </Flex>
        <Flex className={classes.btnWrapper} gap={16}>
          <ButtonSecondary className={classes.cancelBtn} onClick={navigateBack}>
            <TextView size={16} weight="700">
              Cancel
            </TextView>
          </ButtonSecondary>
          <ButtonPrimary className={classes.confirmBtn} onClick={handleConfirm}>
            <TextView size={16} weight="700">
              Confirm
            </TextView>
          </ButtonPrimary>
        </Flex>
      </Card>
    </div>
  );
};

export default WithdrawConfirm;

const Detail = ({ name, value }: { name: string; value?: string }) => {
  return (
    <Flex justify="space-between">
      <TextView size={14} weight="500" color="nord400">
        {name}
      </TextView>
      <TextView size={14} weight="500">
        {value ? value : ""}
      </TextView>
    </Flex>
  );
};
