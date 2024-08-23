// ** service
import { useCryptoAddressReq } from "@/api/requests/transactions";

// ** style
import classes from "./depositAddress.module.scss";

// ** components
import { ButtonPrimary, Card, Copy, Divider, Flex, TextView, TextViewLevelT } from "nordom-ui";
import BouncingLoader from "@/components/reusables/loader/BouncingLoader";

// ** types
import { AddressI } from "@/types";
import { TransactionTabsOutletContextType } from "@/types/components/transactions/transactionTypes";

// ** hooks
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useResponsive } from "@/hooks";

// ** 3rd party
import QRCode from "qrcode.react";

// ** icons
import { CopyIcon } from "@/assets/svg";
import { ChevronDownIcon24 } from "@/assets/svg/arrows";

const generateAddressData = {
  title: "No Arbitum One Deposit Address",
  description: "No Arbitrum One deposit address has been previously created. Please first create a deposit address.",
  btnText: "Get address",
};

const addressInfoData = {
  "minimum-deposit": "Minimum deposit",
  "minimum-amount": "More than 0.01 USDT",
  "expected-arrival": "Expected arrival",
  "arrival-time": "After 1 network confirmations",
  "warning-text": "Do not transact with sanction entities",
  "warning-text-full":
    "Deposits via smart contracts are not supported with the exception of ETH via ERC20, Arbitrum & Optimism network or BNB via BSC network.",
};

/**
 * DepositAddress
 *
 * This component displays the deposit address for a user in a modal.
 * If the user does not have a deposit address, they can click a button to generate one.
 *
 * The component uses the useCryptoAddressReq hook to fetch the deposit address from the server.
 * If the server returns a 404, the component displays a "Generate Address" button.
 * If the server returns a 200, the component displays the deposit address.
 *
 * @param {string} network - The network to generate the deposit address for.
 * @returns
 */
const DepositAddress = ({ network }: { network?: string }) => {
  const [method, setMethod] = useState<"get" | "post">("get");
  const { token } = useOutletContext<TransactionTabsOutletContextType>();

  /**
   * Fetch the deposit address from the server. If the server returns a 404, set method to "post" to
   * generate a new address on the next render.
   */
  const { data, isLoading, error } = useCryptoAddressReq(token, network ?? "", method);

  /**
   * If the user has clicked the "Generate Address" button, set the method back to "get" to fetch the
   * newly generated address on the next render.
   */
  useEffect(() => {
    if (method === "post" && !isLoading) setMethod("get");
  }, [method, isLoading]);

  /**
   * If the user has not selected a network, don't render anything.
   */
  if (!network) return <></>;

  /**
   * This function renders the deposit address or a "Generate Address" button
   * depending on the server response.
   *
   * If the server is still loading, return a loading component.
   *
   * If the server returns an error with a status code of 404, return a "Generate
   * Address" button component. When the button is clicked, set the method state
   * to "post" to generate a new address on the next render.
   *
   * If the server returns a 200 with a deposit address, return the deposit
   * address component with the address data.
   *
   * If none of the above conditions are met, return an error message.
   */
  const content = () => {
    if (isLoading) {
      // If the server is still loading, return a loading component.
      return <LoadingContent />;
    }

    if (error && error.response.status === 404) {
      // If the server returns an error with a status code of 404, return a "Generate
      // Address" button component. When the button is clicked, set the method
      // state to "post" to generate a new address on the next render.
      return (
        <GenerateAddressContent
          post={() => {
            setMethod("post");
          }}
        />
      );
    }

    if (data) {
      // If the server returns a 200 with a deposit address, return the deposit
      // address component with the address data.
      return <AddressInfo {...data.data} />;
    }

    // If none of the above conditions are met, return an error message.
    return <>Error occured in content</>;
  };

  return (
    <Card bg_color="nord900" borderRadius="8" padding="16" className={classes.depositAddressCard}>
      {content()}
    </Card>
  );
};

export default DepositAddress;

const LoadingContent = () => {
  return (
    <Flex className={classes.loadingContent}>
      <BouncingLoader />
    </Flex>
  );
};

/**
 * This component renders a button that allows the user to generate a new
 * deposit address. When the button is clicked, it calls the `post` function
 * prop, which is expected to set the `method` state to `"post"` so that the
 * parent component can generate a new address on the next render.
 */
const GenerateAddressContent = ({ post }: { post: () => void }) => {
  // Render a card with a title, description, and a button. The button should
  // have an `onClick` handler that calls the `post` function prop when clicked.
  return (
    <Flex direction="column" gap={24}>
      <Flex direction="column" gap={8}>
        <TextView size={14} weight="700">
          {
            // The title of the card. This is a static string that is defined
            // above.
            generateAddressData.title
          }
        </TextView>
        <TextView size={14} weight="400" color="nord400">
          {
            // The description of the card. This is a static string that is
            // defined above.
            generateAddressData.description
          }
        </TextView>
      </Flex>
      <div>
        <ButtonPrimary size="medium" onClick={post}>
          <TextView size={14} weight="700" role="generate-address-btn">
            {
              // The button text of the button. This is a static string that is
              // defined above.
              generateAddressData.btnText
            }
          </TextView>
        </ButtonPrimary>
      </div>
    </Flex>
  );
};

const AddressInfo: React.FC<AddressI> = (props) => {
  const [showMore, setShowMore] = useState(true);

  const textSizes = useResponsive({ mobile: 12, tablet: 14 }) as TextViewLevelT;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Card borderRadius="8" className={classes.addressInfo} bg_color="nord900">
      <Flex className={classes.addressBox}>
        <Flex justify="center">
          <Flex className={classes.qrWrapper}>
            <QRCode value={props.address} size={88} data-testId="qr-code" />
          </Flex>
        </Flex>
        <Flex direction="column" gap={4} className={classes.walletAddress}>
          <TextView weight="500" size={14}>
            Wallet Address
          </TextView>
          <Flex justify="space-between" className={classes.addressWrapper}>
            <Flex className={classes.addressBox}>
              <TextView size={16} weight="400" color="nord600">
                {props.address}
              </TextView>
            </Flex>
            <Copy textToCopy="Copied!">
              <CopyIcon />
            </Copy>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column">
        <Divider className={classes.divider} />
        <Flex direction="column" gap={12}>
          <Flex justify="space-between">
            <TextView size={textSizes} weight="400" color="nord400">
              Minimum deposit
            </TextView>
            <TextView size={textSizes} weight="500">
              More than {props.minAmount} USDT
            </TextView>
          </Flex>
          <Flex justify="space-between">
            <TextView size={textSizes} weight="400" color="nord400">
              Expected arrival
            </TextView>
            <TextView size={textSizes} weight="500">
              After {props.confirmations} network confirmations
            </TextView>
          </Flex>
        </Flex>
        {showMore && (
          <TextView size={textSizes} weight="400" color="nord400" onClick={toggleShowMore} className={classes.moreText}>
            {addressInfoData["warning-text-full"]}
          </TextView>
        )}
        <span onClick={toggleShowMore} className={classes.showMoreBtn}>
          <Flex align="center" justify="center">
            <TextView size={12}>{showMore ? "Less" : "More"}</TextView>
            <div className={`${classes.dropdownArrow} ${showMore ? classes.arrowUp : ""}`} data-testId="arrow-icon">
              <ChevronDownIcon24 />
            </div>
          </Flex>
        </span>
      </Flex>
    </Card>
  );
};
