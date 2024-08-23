import { Flex, TextView } from "nordom-ui";
import classes from "./Loader.module.scss";
import LazyImage from "../lazyImg/LazyImg";

const Loader = () => {
  return (
    <Flex className={classes.loaderContainer} direction="column" align="center" justify="center">
      <LazyImage src={"/loader.gif"} width={100} height={100} alt="loader" />
      <TextView size={20} upperCase>
        please wait
      </TextView>
      <TextView size={12} color="nord400">
        The gate will open soon
      </TextView>
    </Flex>
  );
};

export default Loader;
