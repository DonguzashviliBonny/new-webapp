import { ButtonPrimary, Flex, TextView } from "nordom-ui";
import classes from "./StatusCard.module.scss";
import { CheckIcon } from "@/assets/svg";
import { StatusCardProps } from "@/types/components/reusableComponents/reusableComponentTypes";
import BouncingLoader from "../../loader/BouncingLoader";

const StatusCard = ({ status, title, subtitle, btn, loading }: StatusCardProps) => {
  return (
    <div className={`${classes.StatusCard} ${classes[status]}`}>
      {loading ? (
        <Flex className={classes.cardWrapper} direction="column" align="center">
          <BouncingLoader />
        </Flex>
      ) : (
        <Flex direction="column" align="center" className={classes.cardWrapper}>
          <div className={classes.icon}>
            <CheckIcon />
          </div>
          <TextView size={20} weight="700" className={classes.title}>
            {title}
          </TextView>
          <TextView size={14} weight="400" color="nord400" className={classes.subtitle} center>
            {subtitle}
          </TextView>
          <ButtonPrimary onClick={btn.onClick} className={classes.btn}>
            <TextView size={16} weight="700">
              {btn.text}
            </TextView>
          </ButtonPrimary>
        </Flex>
      )}
    </div>
  );
};

export default StatusCard;
