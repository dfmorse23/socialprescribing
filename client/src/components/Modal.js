import { Modal as ModalComponent, Box } from "@material-ui/core";

const Modal = ({ open, handleClose, children, styles }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 500,
    bgcolor: styles.bgcolor ? styles.bgcolor : "background.paper",
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
  };
  return (
    <ModalComponent
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box {...styles} sx={style}>
        {children}
      </Box>
    </ModalComponent>
  );
};

export default Modal;
