import React from "react";

// ** hooks
import { useResponsive } from "@/hooks";

// ** types

// ** components
import LazyImage from "@/components/reusables/lazyImg/LazyImg";
import { Flex, TextView } from "nordom-ui";
import { AuthenticatedFooterProps } from "@/types/components/layout/layoutProps";

const AuthenticatedFooter: React.FC<AuthenticatedFooterProps> = ({ data }) => {
  const certificatesGaps = useResponsive({ laptop: 12, tablet: 20, mobile: 12 });
  const imageWidth = useResponsive({ laptop: 148, tablet: 213, mobile: 158 });
  const imageHeight = useResponsive({ laptop: 112, tablet: 102, mobile: 119 });

  return (
    <Flex direction="column" gap={20}>
      <TextView size={20} weight="500">
        Licenses and Certificates
      </TextView>
      <Flex gap={certificatesGaps} wrap>
        {data.map(({ id, attributes }) => (
          <LazyImage
            key={id}
            src={attributes.Image.data.attributes.url}
            alt={attributes.Name}
            width={imageWidth}
            height={imageHeight}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default AuthenticatedFooter;
