// ** types
import { NetworkSelectProps } from "@/types/components/reusableComponents/reusableComponentTypes";

// ** UI
import { TextView, Flex, Select, LabeledValueT } from "nordom-ui";

// ** styles
import classes from "./NetworkSelect.module.scss";

const NetworkSelect: React.FC<NetworkSelectProps> = ({ data, onSelect, selectedValue, disabled, placeholder }) => {
  const newData: LabeledValueT[] | undefined = data?.map((item) => ({
    content: item.name,
    title: <SelectedOption name={item.name} />,
    extraData: {
      ...item,
    },
  }));

  return (
    <Select
      role="network-select"
      value={selectedValue?.name}
      placeholder={
        <TextView size={16} weight="400">
          {placeholder}
        </TextView>
      }
      className={classes.networkSelect}
      activeClass={classes.networkSelect_active}
      overlayClass={classes.networkSelectOverlay}
      aria-label="Network"
      onSelect={onSelect}
      options={newData ? newData : []}
      disabled={disabled}
      renderOption={({ option, getRecommendedProps }) => (
        <Flex direction="column" gap={4} {...getRecommendedProps()}>
          <Flex justify="space-between">
            <div>
              <TextView size={14}>Arrival Minutes: </TextView>

              <TextView size={14} color="nord600">
                ≈ {option.extraData.estimatedTime} mins
              </TextView>
            </div>

            <Flex gap={3} align="flex-end">
              <TextView size={12} weight="400" color="nord400">
                Confirmations
              </TextView>
              <TextView size={14}>{option.extraData.confirmations}</TextView>
            </Flex>
          </Flex>
          <TextView size={14} weight="400" role="item-first-name" color="nord400">
            {option.content}
          </TextView>
        </Flex>
      )}
    />
  );
};

export default NetworkSelect;

const SelectedOption: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Flex direction="column" gap={4}>
      <TextView size={16} weight="400">
        {name}
      </TextView>
    </Flex>
  );
};
