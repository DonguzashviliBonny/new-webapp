import { useFooterContentReq } from "@/api/requests/layout";
import Footer from "@/components/footer/footer";
import { FooterSkeleton } from "@/components/footer/footer-skeleton";

const FooterContainer = () => {
  const { data } = useFooterContentReq();

  if (!data) return <FooterSkeleton />;
  return <Footer data={data} />;
};

export default FooterContainer;
