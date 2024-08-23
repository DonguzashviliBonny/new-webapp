// ** types
import { CurrencyT } from "@/types";
import { CurrencySelectProps } from "@/types/components/reusableComponents/reusableComponentTypes";

// ** UI
import { TextView, Flex, Select, LabeledValueT } from "nordom-ui";

// ** styles
import classes from "./currencySelect.module.scss";
import LazyImage from "../../lazyImg/LazyImg";

// ** components

const CurrencySelect: React.FC<CurrencySelectProps> = ({ data, onSelect, placeholder, value }) => {
  const options: LabeledValueT[] = data.map((data) => ({
    extraData: {
      ...data,
    },
    content: data.code,
    title: <SelectedOption code={data.code} logoUrl={data.logoUrl} name={data.name} />,
  }));

  const onSelectHandler = (option: LabeledValueT) => {
    console.log(option);

    onSelect(option.content);
  };

  return (
    <Select
      role="coin-select"
      options={options}
      placeholder={
        <TextView size={16} weight="400">
          {placeholder}
        </TextView>
      }
      value={value?.code}
      activeClass={classes.currencySelectLarge_active}
      className={classes.currencySelectLarge}
      overlayClass={classes.currencySelectLargeOverlay}
      onSelect={(option) => {
        onSelectHandler(option);
      }}
      renderOption={({ option, getRecommendedProps, isSelected }) => (
        <Flex
          {...getRecommendedProps()}
          justify="space-between"
          className={`${classes.currencySelectOption} ${isSelected ? classes.selected : ""}`}
        >
          <Flex align="center" gap={6}>
            <LazyImage
              referrerPolicy="no-referrer"
              src={option.extraData.logoUrl}
              alt={option.content}
              width={24}
              height={24}
            />
            <TextView size={14} weight="400">
              {option.content}
            </TextView>
          </Flex>

          <TextView size={12} color="nord300">
            {option.extraData.name}
          </TextView>
        </Flex>
      )}
    />
  );
};

export default CurrencySelect;

const SelectedOption: React.FC<Omit<CurrencyT, "displayDecimalPoints">> = ({ code, logoUrl, name }) => {
  return (
    <Flex align="center" gap={4}>
      <Flex justify="center" align="center">
        <LazyImage referrerPolicy="no-referrer" src={logoUrl} alt={code} width={24} height={24} />
      </Flex>
      <TextView role="selected-option-role" size={16} weight="400">
        {code}
      </TextView>
      <TextView size={16} weight="400" color="nord600">
        ({name})
      </TextView>
    </Flex>
  );
};
