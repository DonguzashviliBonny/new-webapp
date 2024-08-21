import { ButtonSecondary, Card, Flex, TextView } from "nordom-ui";
import { QRCodeIcon } from "@/assets/svg";
import classes from "./QRCodeDropdown.module.scss";
import QRCode from "qrcode.react";
import OverlayLayout from "@/components/layout/overlayLayout/OverlayLayout";
import { useState } from "react";

const QRCodeDropdown = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <ButtonSecondary icon size="small" role="QRIcon-btn" data-testid="qr-icon" onClick={() => setOpenModal(true)}>
        <div className={classes.qrIcon}>
          <QRCodeIcon />
        </div>
      </ButtonSecondary>
      <OverlayLayout open={openModal} setOpen={setOpenModal}>
        <DropdownContent />
      </OverlayLayout>
    </>
  );
};

export default QRCodeDropdown;

const DropdownContent = () => {
  return (
    <Card bg_color="nord900" className={classes.qrContainer}>
      <Flex direction="column" align="center" justify="center" gap={12}>
        <Flex justify="center" className={classes.qrCodeBox}>
          <Card bg_color="nord50" padding="12" borderRadius="8">
            <QRCode value="" size={100} />
          </Card>
        </Flex>
        <TextView size={14} color="nord50" className={classes.textCenter} weight="700">
          Scan to Download App IOS&Android
        </TextView>
      </Flex>
    </Card>
  );
};
