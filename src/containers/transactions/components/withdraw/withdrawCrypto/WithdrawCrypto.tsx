import { ButtonPrimary, Flex, Input, LabeledValueT, Stepper, TextView } from "nordom-ui";
import classes from "./withdrawCrypto.module.scss";
import { useEffect, useState } from "react";
import CurrencySelect from "@/components/reusables/select/currencySelect/CurrencySelect";
import { Link, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import {
  transactionAssetType,
  TransactionTabsOutletContextType,
} from "@/types/components/transactions/transactionTypes";
import NetworkSelect from "@/components/reusables/select/networkSelect/NetworkSelect";
import { useCryptoNetworksReq, useWithdrawCryptoReq } from "@/api/requests/transactions";
import { NetworksT } from "@/types";
import { formatAmountToString, formatReplaceComma } from "@/utils";
import useTransactionsStore from "@/store/transactionsStore";
import BouncingLoader from "@/components/reusables/loader/BouncingLoader";

const WithdrawCrypto = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { setWithdrawCryptoData } = useTransactionsStore();
  const { token, asset, assets } = useOutletContext<TransactionTabsOutletContextType>();

  const [step, setStep] = useState<number>(0);
  const [chosenAsset, setChosenAsset] = useState<transactionAssetType | undefined>();
  const [selectedNetwork, setSelectedNetwork] = useState<NetworksT>();
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const { data: networkData, isLoading: networkLoading } = useCryptoNetworksReq(token, asset);
  const { mutate: mutateWithdraw } = useWithdrawCryptoReq();

  // This function is used to handle the choosing of an asset
  const handleChooseAsset = (value: string) => {
    // If the chosen asset is not valid, return
    if (!chosenAsset?.code) return;

    // Replace the current asset in the URL with the newly chosen asset
    const url = window.location.pathname;
    const newUrl = url.replace(chosenAsset.code.toLowerCase(), value.toLowerCase());

    // Set the step to 0 and navigate to the new URL
    navigate(newUrl, { replace: true });
  };

  // This function is used to handle the choosing of a network
  const handleChooseNetwork = (option: LabeledValueT) => {
    // If the network is already selected, delete it from the search params
    if (searchParams.get("network")) searchParams.delete("network");

    // Add the newly chosen network to the search params
    searchParams.append("network", option.content);

    // Set the search params and set the step to 2
    setSearchParams(searchParams);
  };

  // This effect is used to set the chosen asset when the component is mounted
  useEffect(() => {
    // If the assets data is not available, return
    if (!assets.data) return;

    // Find the chosen asset based on the current asset in the URL
    const chosen = assets.data.data.find((el) => el.code.toLowerCase() === asset.toLowerCase());

    // Set the chosen asset
    setChosenAsset(chosen);
  }, [assets, asset]);

  // This effect is used to set the chosen network when the component is mounted
  useEffect(() => {
    // If the network data is not available, return
    if (!networkData) return;

    // Find the chosen network based on the current network in the search params
    const chosenNetwork = networkData.data.find((el) => el.name === searchParams.get("network"));

    // Set the chosen network
    setSelectedNetwork(chosenNetwork);
  }, [searchParams, networkData]);

  // This function is used to handle the pasting of an address
  const handlePaste = async () => {
    // Get the text from the clipboard
    const result = await navigator.clipboard.readText();

    // Set the address to the pasted text
    setAddress(result);
  };

  // This function is used to handle the changing of the amount
  const handleAmountChange = (value: string) => {
    // Remove any non-numeric characters from the input
    const pureNum = Number(formatReplaceComma(value));

    // If the input is not a number, return
    if (isNaN(pureNum)) return setStep(0);

    // Set the amount to the formatted number
    setAmount(formatAmountToString(value));
  };

  const handleWithdraw = () => {
    mutateWithdraw(
      {
        token,
        filter: {
          address,
          amount: Number(formatReplaceComma(amount)),
          asset: asset.toUpperCase(),
          network: selectedNetwork?.name || "",
        },
      },
      {
        onSuccess: (data) => {
          setWithdrawCryptoData(data.data.data);
          navigate(`/transactions/withdraw/crypto/confirm/${data?.data.data.address}`);
        },
        onError: (e) => {
          console.log(e);
        },
      }
    );
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
  };

  useEffect(() => {
    const firstStep = Number(amount) > 0;
    const secondStep = selectedNetwork?.name;
    const thirdStep = address.length >= 16;
    setStep(0);
    if (firstStep) setStep(1);
    if (firstStep && secondStep) setStep(2);
    if (firstStep && secondStep && thirdStep) setStep(3);
  }, [amount, selectedNetwork, address]);

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
                <CurrentBalance chosenAsset={chosenAsset} />
              </Flex>
            ),
            content: (
              <Input
                size="medium"
                value={amount}
                onChange={(e) => handleAmountChange(e.currentTarget.value)}
                bg_color="nord900"
                placeholder="0-00.1"
                endIcon={
                  <CurrencySelect
                    data={assets?.data?.data.map((el) => ({ ...el, name: "" })) || []}
                    size="small"
                    placeholder="BTC"
                    onSelect={handleChooseAsset}
                    value={chosenAsset}
                    bg_color="nord850"
                  />
                }
              />
            ),
          },
          {
            title: (
              <TextView size={14} weight="700">
                Network
              </TextView>
            ),
            content: (
              <NetworkSelect
                data={networkData?.data || []}
                onSelect={handleChooseNetwork}
                placeholder={<>{networkLoading ? "Loading..." : "Select Network"}</>}
                selectedValue={selectedNetwork}
                disabled={step < 1 || networkLoading}
              />
            ),
          },
          {
            title: (
              <TextView color={step < 2 ? "nord800" : "nord50"} size={14} weight="700">
                Deposit address
              </TextView>
            ),
            content: (
              <Input
                placeholder="Write Address"
                value={address}
                onChange={(e) => handleAddressChange(e.currentTarget.value)}
                disabled={step < 2}
                endIcon={
                  <TextView size={14} weight="400" onClick={() => handlePaste()} className={classes.pasteBtn}>
                    Paste
                  </TextView>
                }
              />
            ),
          },
        ]}
      />

      {step === 3 && (
        // If the address is at least 16 characters long, show the withdraw button
        <ButtonPrimary fill className={classes.withdrawBtn} onClick={handleWithdraw}>
          <TextView weight="700" size={16}>
            Withdraw
          </TextView>
        </ButtonPrimary>
      )}
    </div>
  );
};

export default WithdrawCrypto;

const CurrentBalance = ({ chosenAsset }: { chosenAsset?: transactionAssetType }): React.ReactNode => {
  if (typeof chosenAsset?.balance !== "number") return <BouncingLoader />;
  else if (chosenAsset?.balance === 0)
    return (
      <Link to={`/transactions/deposit/crypto/${chosenAsset.code}`}>
        <Flex align="center">
          <TextView size={14} weight="400" color="nordOrange" underline>
            Update balance:
          </TextView>{" "}
          <TextView size={14} weight="500" color="nordOrange" underline>
            {typeof chosenAsset?.balance === "number" && chosenAsset?.balance.toFixed(2)}
          </TextView>
        </Flex>
      </Link>
    );
  else
    return (
      <Flex align="center">
        <TextView size={14} weight="400" color="nord400">
          Avl. balance:
        </TextView>{" "}
        <TextView size={14} weight="500" underline>
          {typeof chosenAsset?.balance === "number" && chosenAsset?.balance?.toFixed(chosenAsset.displayDecimalPoints)}
        </TextView>
      </Flex>
    );
};
