import { CurrencyT, NetworksT } from "@/types/common";
import { LabeledValueT, SelectProps } from "nordom-ui";

export interface CurrencySelectProps extends Omit<SelectProps, "onSelect" | "value" | "options"> {
  data: CurrencyT[];
  onSelect: (option: string) => void;
  value?: CurrencyT;
}

export type NetworkSelectProps = {
  data: NetworksT[] | undefined;
  selectedValue: NetworksT | undefined;
  onSelect: (option: LabeledValueT) => void;
  disabled?: boolean;
  placeholder: string | React.ReactNode;
};

export type StatusCardProps = {
  loading?: boolean;
  status: "pending" | "success" | "failed";
  title: string;
  subtitle: string;
  btn: { text: string; onClick: () => void };
};
