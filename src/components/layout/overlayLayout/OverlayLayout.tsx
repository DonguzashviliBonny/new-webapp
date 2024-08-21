import { ContainerLayout, Flex, Portal } from "nordom-ui";
import classes from "./overlayLayout.module.scss";
import useClickOutside from "@/hooks/useClickOutside/useClickOutside";

const OverlayLayout = ({
  children,
  setOpen,
  open,
}: {
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) => {
  const dropdownRef = useClickOutside(() => setOpen(false), open);

  return (
    <>
      {open && (
        <Portal>
          <Flex className={classes.portalWrapper}>
            <ContainerLayout>
              <Flex className={classes.containerWrapper} justify="flex-end">
                <div className={classes.navigationDropdown} ref={dropdownRef}>
                  {children}
                </div>
              </Flex>
            </ContainerLayout>
          </Flex>
        </Portal>
      )}
    </>
  );
};

export default OverlayLayout;
