import { useFooterContentReq } from "@/api/requests/layout";
import FooterUI from "@/components/footer/footerUI";
import { FooterSkeleton } from "@/components/footer/footer-skeleton";

const FooterContainer = () => {
  const { data } = useFooterContentReq();

  if (!data) return <FooterSkeleton />;
  return <FooterUI data={data} />;
};

export default FooterContainer;
