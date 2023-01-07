import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";

// const EventModal = ({
//   open,
//   handleClose,
//   title,
//   imageUrl,
//   eventUrl,
//   altText,
// }) => {
//   return (
//     <>
//       <Modal open={open} handleClose={handleClose}>
//         <img
//           style={{
//             width: "100%",
//             height: "300px",
//             borderTopLeftRadius: 5,
//             borderTopRightRadius: 5,
//           }}
//           alt={altText}
//           src={imageUrl}
//         />
//         <Box sx={{ p: 2 }}>
//           {/* <Typography id="modal-modal-title" variant="h4" component="h3">
//               {title}
//             </Typography> */}
//           <div
//             id="modal-modal-description"
//             style={{
//               display: "flex",
//               marginTop: 10,
//               height: "100%",
//               wordBreak: "break-word",
//             }}
//           >
//             {/* <Typography style={{ fontWeight: "bold", wordBreak: "normal" }}>
//                 Website:
//               </Typography> */}
//             <Link
//               target="_blank"
//               rel="noopener"
//               underlin="none"
//               style={{ fontSize: 18, marginLeft: 5 }}
//               href={eventUrl}
//             >
//               {eventUrl}
//             </Link>
//           </div>
//         </Box>
//       </Modal>
//       ;
//     </>
//   );
// };
// export default EventModal;

const EventModal = (props) => {
  return (
    <>

      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EventModal;
