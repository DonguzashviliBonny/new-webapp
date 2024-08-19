// ** helpers
import { formatDate } from "@/utils";

// ** style
import classes from "./AnnouncementsCard.module.scss";

// ** hooks
import { useResponsive } from "@/hooks";

// ** components
import { Card, CardPaddingsT, Flex, Tag, TextView, Tooltip } from "nordom-ui";
import { ArticleCardProps } from "@/types/components/cards";

const landing = import.meta.env.VITE_BASE_LANDING_APP_URL;

const AnnouncementsCard: React.FC<ArticleCardProps> = ({
  border_bottom,
  border_right,
  data,
  link,
  isSimilarArticle,
}) => {
  const { Title, Description, publishedAt, tags, Body } = data;

  const modifiedBody =
    typeof Body === "string" &&
    Body.replace("<h1>", '<h1 class="text text_700 text_nord50 text_16">').replace(
      "<p>",
      '<p class="text text_400 text_nord400 text_14">'
    );

  const mappedTags = tags?.data.slice(0, 2);
  const hoveredTags = tags?.data.slice(2, tags.data.length);

  const cardPadding: CardPaddingsT = useResponsive({ mobile: "16", tablet: "24", desktop: "32" });
  const cardPaddingSecondary: CardPaddingsT = useResponsive({ mobile: "24", desktop: "32" });

  return (
    <Card
      padding={isSimilarArticle ? cardPaddingSecondary : cardPadding}
      bg_color="nord900"
      border_bottom={border_bottom}
      border_right={border_right}
      className={classes.article}
    >
      <a href={`${landing}/announcements/${link}`}>
        <Flex direction="column" gap={8}>
          <Flex justify="space-between" align="center">
            <Flex gap={8}>
              {mappedTags?.map((tag, index) => {
                return (
                  <Tag key={index} border="nord800" paddingBlock="4" paddingInline="8" bg_color="nord850">
                    <TextView size={12}>{tag.attributes.Name}</TextView>
                  </Tag>
                );
              })}

              {tags?.data.length > 2 && (
                <Tooltip
                  TooltipContent={
                    <Flex gap={5}>
                      {hoveredTags.map((tag, index) => (
                        <TextView key={index} size={14} weight="400" color="nord50">
                          {tag.attributes.Name}
                        </TextView>
                      ))}
                    </Flex>
                  }
                >
                  <Tag
                    border="nord800"
                    paddingBlock="4"
                    paddingInline="8"
                    bg_color="nord850"
                    className={classes.tooltip}
                  >
                    <TextView size={12} weight="500">
                      +{hoveredTags.length}
                    </TextView>
                  </Tag>
                </Tooltip>
              )}
            </Flex>

            <TextView size={12} weight="400" color="nord400">
              {formatDate(publishedAt)}
            </TextView>
          </Flex>

          {isSimilarArticle ? (
            <div
              className={`${classes.richText} ${classes.limitedText}`}
              dangerouslySetInnerHTML={{ __html: modifiedBody }}
            />
          ) : (
            <>
              <TextView size={16} weight="700">
                {Title}
              </TextView>

              <TextView size={14} weight="400" color="nord400" className={classes.blogText}>
                {Description}
              </TextView>
            </>
          )}
        </Flex>
      </a>
    </Card>
  );
};

export default AnnouncementsCard;
