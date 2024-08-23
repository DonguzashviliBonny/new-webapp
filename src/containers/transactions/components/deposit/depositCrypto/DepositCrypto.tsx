// ** components
import { LabeledValueT, Stepper, TextView } from "nordom-ui";

// ** hooks
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

// ** style
import classes from "./depositCrypto.module.scss";

// ** service
import { useCryptoNetworksReq } from "@/api/requests/transactions";

// ** components
import CurrencySelect from "@/components/reusables/select/currencySelect/CurrencySelect";
import NetworkSelect from "@/components/reusables/select/networkSelect/NetworkSelect";
import BouncingLoader from "@/components/reusables/loader/BouncingLoader";
import DepositAddress from "./DepositAddress";

// ** types
import { TransactionTabsOutletContextType } from "@/types/components/transactions/transactionTypes";
import { NetworksT } from "@/types";

const DepositCrypto = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const [chosenAsset, setChosenAsset] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState<NetworksT>();

  // ** !NOTE assets are coming from TransactionTabsLayout
  const { assets, token, asset } = useOutletContext<TransactionTabsOutletContextType>();
  const { data: networkData, isLoading: networkLoading } = useCryptoNetworksReq(token, asset);

  // This function will be called when the user chooses a new asset
  // It will update the url with the chosen asset
  const handleChooseAsset = (value: string) => {
    const url = window.location.pathname;
    const newUrl = url.replace(chosenAsset.toLowerCase(), value.toLowerCase());
    navigate(newUrl, { replace: true });
  };

  // This function will be called when the user chooses a new network
  // It will update the url with the chosen network
  const handleChooseNetwork = (option: LabeledValueT) => {
    if (searchParams.get("network")) searchParams.delete("network");
    searchParams.append("network", option.content);
    setSearchParams(searchParams);
  };

  // This function will be called when the component is mounted
  // It will assign state with the chosen asset
  useEffect(() => {
    if (!assets.data) return;
    setChosenAsset(asset.toUpperCase());
  }, [assets, asset]);

  // This function will be called when the component is mounted
  // It will fetch the networks data from the server and set the selected network
  useEffect(() => {
    if (!networkData) return;
    const chosenNetwork = networkData.data.find((el) => el.name === searchParams.get("network"));
    setSelectedNetwork(chosenNetwork);
    if (searchParams.get("network")) setStep(2);
  }, [searchParams, networkData]);

  // If the assets data is loading, return a loading message
  if (assets.loading) return <>loading...</>;

  return (
    <div className={classes.depositCryptoWrapper}>
      <Stepper
        currentStep={step}
        steps={[
          {
            // Set the title of the first step to "Select Coin"
            title: (
              <TextView size={14} weight="700">
                Select Coin
              </TextView>
            ),
            // Set the content of the first step to the currency select component
            content: (
              <CurrencySelect
                data={assets.data.data}
                onSelect={handleChooseAsset}
                placeholder="Select coin"
                value={assets.data.data.find((el) => el.code.toLowerCase() === chosenAsset.toLowerCase())}
              />
            ),
          },
          {
            // Set the title of the second step to "Network"
            title: (
              <TextView size={14} weight="700" color={step < 1 ? "nord800" : "nord50"}>
                Network
              </TextView>
            ),
            // Set the content of the second step to the network select component
            content: (
              <NetworkSelect
                data={networkData?.data}
                onSelect={handleChooseNetwork}
                placeholder={networkLoading ? <BouncingLoader /> : "Select Network"}
                disabled={step < 1}
                selectedValue={selectedNetwork}
              />
            ),
          },
          {
            title: (
              <TextView size={14} weight="700" color={step < 2 ? "nord800" : "nord50"}>
                Deposit Address
              </TextView>
            ),
            content: <DepositAddress network={selectedNetwork?.name} />,
          },
        ]}
      />
    </div>
  );
};

export default DepositCrypto;
