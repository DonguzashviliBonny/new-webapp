import { Flex, Stepper, TextView } from "nordom-ui";
import classes from "./withdrawCrypto.module.scss";
import { useState } from "react";

const WithdrawCrypto = () => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className={classes.withdrawCryptoWrapper}>
      <Stepper
        currentStep={step}
        steps={[
          {
            title: (
              <Flex justify="space-between">
                <TextView size={14} weight="700">
                  Amount
                </TextView>
                {/* <Flex align="center">
        </Flex> */}
              </Flex>
            ),
            content: <></>,
          },
        ]}
      />
    </div>
  );
};

export default WithdrawCrypto;
