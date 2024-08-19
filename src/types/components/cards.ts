import { ArticleBorderT, CombinedBlogsI } from "../common";

export interface ArticleCardProps extends ArticleBorderT {
  data: CombinedBlogsI;
  link?: number;
  isSimilarArticle?: boolean;
}
