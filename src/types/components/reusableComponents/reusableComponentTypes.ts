import { CurrencyT, NetworksT } from "@/types/common";
import { LabeledValueT } from "nordom-ui";

export interface CurrencySelectProps {
  data: CurrencyT[];
  onSelect: (option: string) => void;
  placeholder: string | React.ReactNode;
  value?: CurrencyT;
}

export type NetworkSelectProps = {
  data: NetworksT[] | undefined;
  selectedValue: NetworksT | undefined;
  onSelect: (option: LabeledValueT) => void;
  disabled?: boolean;
  placeholder: string | React.ReactNode;
};
