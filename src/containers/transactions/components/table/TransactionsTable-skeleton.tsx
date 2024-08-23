import { ContainerLayout, Flex, Skeleton } from "nordom-ui";
import classes from "./TransactionsTable.module.scss";

const TransactionsTableSkeleton = () => {
  const columns = 6;
  const rows = 4;
  return (
    <Flex direction="column">
      <ContainerLayout className={classes.depositContent}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 25.5 }}>
          <Skeleton style={{ maxWidth: 178 }} />
        </Flex>
      </ContainerLayout>
      <ContainerLayout className={classes.tableLayout}>
        <table className={classes.tableSkeleton} data-testid="table-skeletons" style={{ width: "100%" }}>
          <thead data-testid="headrowgroup">
            <tr>
              <th colSpan={columns}>
                <Skeleton height={47} borderRadius={4} />
              </th>
            </tr>
          </thead>
          <tbody data-testid="bodyrowgroup">
            {Array.from({ length: rows }).map((_, idx) => (
              <tr key={idx} role="row">
                <td colSpan={columns} role="cell" key={idx}>
                  <Skeleton height={47} borderRadius={4} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ContainerLayout>
    </Flex>
  );
};

export default TransactionsTableSkeleton;
