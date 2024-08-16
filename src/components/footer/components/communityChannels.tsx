import { Link } from "react-router-dom";

// ** style
import classes from "../footer.module.scss";

// ** hooks
import { useLaptop } from "@/hooks";

// ** components
import { Flex, TextView } from "nordom-ui";
import LazyImage from "@/components/reusables/lazyImg/lazyImg";

// ** types
import { footerChannelsT } from "@/api/types/layout";

const CommunityChannels: React.FC<{ data: footerChannelsT[] } & { TitleChannels: string }> = ({
  data,
  TitleChannels,
}) => {
  const laptop = useLaptop();

  return (
    <Flex direction="column" gap={12} className={classes.channels}>
      <TextView size={laptop ? 20 : 16} color="nord50">
        {TitleChannels}
      </TextView>

      <div className={classes.channelsIcons}>
        {data.map(({ id, attributes }) => (
          <Link to={"#"} key={id}>
            <Flex justify="center" align="center" style={{ width: "100%", height: "100%" }}>
              <LazyImage
                src={attributes.Image.data.attributes.url}
                alt={attributes.Image.data.attributes.name}
                {...attributes.Image.data.attributes}
              />
            </Flex>
          </Link>
        ))}
      </div>
    </Flex>
  );
};

export default CommunityChannels;
