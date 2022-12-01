import { styled, Box, Typography, Link } from "@material-ui/core";
import Modal from "../Modal";

const EventModal = ({ open, handleClose, title, imageUrl, eventUrl, altText }) => {
  const Root = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    // backgroundColor: "white",
    boxShadow: 24,
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      height: 600,
    },
    [theme.breakpoints.down("md")]: {
      height: 500,
    },
    [theme.breakpoints.up("md")]: {
      height: 450,
    },
    [theme.breakpoints.up("lg")]: {
      height: 450,
    },
  }));

  return (
    <>
      <Modal open={open} handleClose={handleClose}>
        <Root>
          <img
            style={{
              width: "100%",
              height: "300px",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
            alt={altText}
            src={imageUrl}
          />
          <Box sx={{ p: 2 }}>
            <Typography id="modal-modal-title" variant="h4" component="h3">
              {title}
            </Typography>
            <div
              id="modal-modal-description"
              style={{
                display: "flex",
                marginTop: 10,
                height: "100%",
                wordBreak: "break-word",
              }}
            >
              <Typography style={{ fontWeight: "bold", wordBreak: "normal" }}>
                Website:
              </Typography>
              <Link
                target="_blank"
                rel="noopener"
                underlin="none"
                style={{ fontSize: 18, marginLeft: 5 }}
                href={eventUrl}
              >
                {eventUrl}
              </Link>
            </div>
          </Box>
        </Root>
      </Modal>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Root>
          <img
            style={{
              width: "100%",
              height: "300px",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
            alt="event modal"
            src={imageUrl}
          />
          <Box sx={{ p: 2 }}>
            <Typography id="modal-modal-title" variant="h4" component="h3">
              {title}
            </Typography>
            <div
              id="modal-modal-description"
              style={{ display: "flex", marginTop: 10, height: "100%", wordBreak: 'break-word' }}
            >
              <Typography style={{ fontWeight: "bold", wordBreak: 'normal' }}>Website:</Typography>
              <Link
                target="_blank"
                rel="noopener"
                underlin="none"
                style={{ fontSize: 18, marginLeft: 5 }}
                href={eventUrl}
              >
                {eventUrl}
              </Link>
            </div>
          </Box>
        </Root>
      </Modal> */}
    </>
  );
};

export default EventModal;
