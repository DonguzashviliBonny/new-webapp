import { ContainerLayout, Divider, Flex, Skeleton } from "nordom-ui";
import classes from "./transactionsLayout.module.scss";

const TransactionSkeleton = () => {
  return (
    <ContainerLayout className={classes.depositContentSkeleton}>
      <Flex style={{ width: "100%" }} justify="space-between" className={classes.skeletonsWrapper}>
        <Flex direction="column" style={{ flexGrow: 1 }}>
          <Flex direction="column" gap={8}>
            <Skeleton style={{ maxWidth: 159 }} bg_color="nord850" borderRadius={4} />
            <Skeleton bg_color="nord850" borderRadius={4} />
          </Flex>
          <Flex direction="column" gap={16}>
            <div />
            <Divider />
            <Flex direction="column" className={classes.faqSkeleton}>
              <Skeleton borderRadius={4} />
              <Skeleton borderRadius={4} />
            </Flex>
            <Flex gap={24} direction="column" style={{ marginTop: 8 }}>
              <Skeleton height={31} bg_color="nord850" borderRadius={4} />
              <Skeleton height={31} bg_color="nord850" borderRadius={4} />
              <Skeleton height={31} bg_color="nord850" borderRadius={4} />
            </Flex>
          </Flex>
        </Flex>
        <Flex className={classes.convertSkeleton} style={{ flexGrow: 1 }} direction="column">
          <Flex className={classes.tabsWrapper}>
            <Skeleton bg_color="nord850" borderRadius={4} />
            <Skeleton bg_color="nord850" borderRadius={4} />
          </Flex>
          <Flex direction="column" gap={8}>
            <Skeleton height={15} style={{ maxWidth: 159 }} borderRadius={4} />
            <Flex className={classes.skeletonWrapper}>
              <Skeleton height={15} style={{ maxWidth: 159 }} bg_color="nord850" borderRadius={4} />
            </Flex>
          </Flex>

          <Flex direction="column" gap={8}>
            <Skeleton height={15} style={{ maxWidth: 159 }} borderRadius={4} />
            <Flex className={classes.skeletonWrapper}>
              <Skeleton height={15} style={{ maxWidth: 159 }} bg_color="nord850" borderRadius={4} />
            </Flex>
          </Flex>
          <Skeleton height={15} style={{ maxWidth: 159 }} borderRadius={4} />
        </Flex>
      </Flex>
    </ContainerLayout>
  );
};

export default TransactionSkeleton;
