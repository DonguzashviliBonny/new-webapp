import { MinusIcon, PlusIcon } from "@/assets/svg";
import { ButtonPrimary, Collapse, ContainerLayout, Drawer, Flex, TextView } from "nordom-ui";
import classes from "../transactionsLayout.module.scss";
import { TransactionFaqDrawerProps } from "@/types/components/layout/layoutProps";

const TransactionFaqDrawer: React.FC<TransactionFaqDrawerProps> = ({ open, setOpen, cryptoFaqData }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)} placement="bottom" className={classes.faqDrawer}>
      <ContainerLayout>
        <Flex direction="column" className={classes.faqDrawerContent}>
          <Flex direction="column" gap={16} className={classes.faqDrawerWrapper}>
            <Flex className={classes.faqDrawerTitle}>
              <TextView weight="700" size={20}>
                FAQ
              </TextView>
            </Flex>
            {cryptoFaqData?.data.attributes.questions.data.map((el) => (
              <Collapse
                expandIcon={<PlusIcon />}
                expandedIcon={<MinusIcon />}
                key={el.id}
                title={
                  <TextView color="nord50" weight="700" size={16}>
                    {el.attributes.Title}
                  </TextView>
                }
                content={
                  <TextView color="nord400" weight="400" size={14}>
                    {el.attributes.Subtitle}
                  </TextView>
                }
              />
            ))}
          </Flex>
          <ButtonPrimary size="medium" className={classes.faqBtn} onClick={() => setOpen(false)}>
            <TextView size={14} weight="700">
              Got it
            </TextView>
          </ButtonPrimary>
        </Flex>
      </ContainerLayout>
    </Drawer>
  );
};

export default TransactionFaqDrawer;
