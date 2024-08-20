import SideNav from "@/containers/settings/components/sideNav/SideNav";
import SettingsContainer from "@/containers/settings/Settings";
import { ContainerLayout, Flex } from "nordom-ui";

const Settings = () => {
  return (
    <ContainerLayout>
      <Flex gap={32} direction="column">
        <SideNav />
        <SettingsContainer />
      </Flex>
    </ContainerLayout>
  );
};

export default Settings;
