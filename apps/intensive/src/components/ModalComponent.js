import React from "react";
import { Box, Modal as ModalComponent } from "@chakra-ui/react";

const Modal = ({ open, handleClose, children, styles }) => {
  return (
    <ModalComponent
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box {...styles}>{children}</Box>
    </ModalComponent>
  );
};

export default Modal;
