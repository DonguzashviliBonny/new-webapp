import { FaqQuestionIcon, MinusIcon, PlusIcon } from "@/assets/svg";
import { ButtonSecondary, Collapse, ContainerLayout, Flex, Grid, TextView } from "nordom-ui";
import classes from "./transactionsLayout.module.scss";
import { useResponsive } from "@/hooks";
import { useState } from "react";
import TransactionSkeleton from "./TransactionsLayout-skeleton";
import TransactionFaqDrawer from "./components/TransactionsFaqDrawer";
import { TransactionLayoutProps } from "@/types/components/layout/layoutProps";

const TransactionLayout: React.FC<TransactionLayoutProps> = ({ children, cryptoFaqData, title, subtitle }) => {
  const [openFaq, setOpenFaq] = useState<boolean>(false);
  const headerPaddings = useResponsive({
    mobile: { block: 16, inline: 16 },
    tablet: { block: 24, inline: 32 },
    laptop: { block: 24, inline: 32 },
    desktop: { block: 24, inline: 32 },
  });
  const convertPaddings = useResponsive({ mobile: 16, tablet: 32 });

  const toggleFaqContent = () => {
    setOpenFaq((prev) => !prev);
  };

  if (!cryptoFaqData) return <TransactionSkeleton />;

  return (
    <>
      <Flex direction="column" className={classes.depositContent}>
        <Grid className={classes.depositWrapper}>
          <Flex direction="column" className={classes.depositLeftSide}>
            <ContainerLayout
              borders
              child_bg_color="nord950"
              padding={headerPaddings}
              className={classes.depositHeader}
            >
              <Flex align="center" justify="space-between">
                <Flex direction="column" gap={8}>
                  <TextView size={20} weight="700" upperCase>
                    {title}
                  </TextView>
                  <TextView size={14} color="nord400" weight="400">
                    {subtitle}
                  </TextView>
                </Flex>
                {cryptoFaqData && (
                  <ButtonSecondary icon className={classes.faqIconBtn} onClick={toggleFaqContent}>
                    <FaqQuestionIcon />
                  </ButtonSecondary>
                )}
              </Flex>
            </ContainerLayout>
            <ContainerLayout className={classes.faqDesktopContainerLayout}>
              <Flex direction="column">
                <Flex direction="column" gap={16}>
                  <Flex className={classes.faqDrawerDesktopTitle}>
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
              </Flex>
            </ContainerLayout>
          </Flex>
          <ContainerLayout
            border_bottom
            child_bg_color="nord950"
            padding={convertPaddings}
            className={classes.convertContainer}
          >
            <Flex gap={124} className={classes.depositContainerWrapper}>
              {children}
            </Flex>
          </ContainerLayout>
        </Grid>
      </Flex>
      <TransactionFaqDrawer open={openFaq} setOpen={setOpenFaq} cryptoFaqData={cryptoFaqData} />
    </>
  );
};

export default TransactionLayout;
