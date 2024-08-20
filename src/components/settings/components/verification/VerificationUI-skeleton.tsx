import { useTablet } from "@/hooks";
import { Card, Flex, Skeleton } from "nordom-ui";

const VerificationSkeleton = () => {
  return (
    <Flex direction="column" gap={16}>
      <Skeleton width={159} height={18} borderRadius="4" bg_color="nord850" />
      <Flex gap={16}>
        {Array.from([0, 1, 2]).map((e) => (
          <SkeletonVerificationCard index={e} />
        ))}
      </Flex>
    </Flex>
  );
};

export default VerificationSkeleton;

export const SkeletonVerificationCard = ({ index }: { index: number }) => {
  const tablet = useTablet();
  return (
    <Card paddingBlock="16" paddingInline="24" data-testid="skeleton-verification-card">
      <Flex direction="column" gap={32}>
        <Flex direction="column" gap={24}>
          {index === 0 ? (
            <Flex gap={14}>
              <Skeleton width={64} height={64} borderRadius="4" />
              <Flex direction="column" gap={16}>
                <Skeleton borderRadius="4" width={126} height={17} />
                <Skeleton borderRadius="4" width={126} height={32} />
              </Flex>
            </Flex>
          ) : (
            <Flex justify="space-between" align="center">
              <Skeleton perItem={3} width={126} height={17} />
              <Skeleton borderRadius="4" height={36} />
            </Flex>
          )}
          {tablet ? null : <Skeleton width={110} height={15} borderRadius="4" />}
        </Flex>
        {tablet ? null : (
          <Flex gap={10}>
            <Skeleton height={15} perItem={5} />
            <Skeleton height={15} perItem={5} />
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
