import { Box, Button, Card, CardMedia, Modal } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { FirebaseStorage, firebaseApp } from "../config/firebase";
import { useDropzone } from "react-dropzone";

const ImageUploader = (props) => {
  const open = props.open;
  const setOpen = props.setOpen;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentFile, setCurrentFile] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [msg, setMSG] = React.useState("");
  const [messageType, setMessageType] = React.useState(null);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    // console.log(acceptedFiles[0]);
    if (
      acceptedFiles[0].type.includes("image/") ||
      (acceptedFiles[0].type.includes("video/") &&
        acceptedFiles[0].size < 1028 * 1028 * 15)
    ) {
      setCurrentFile({
        ...currentFile,
        file: acceptedFiles[0],
        filepreview: URL.createObjectURL(acceptedFiles[0]),
      });
      // console.log(acceptedFiles[0].type);
    } else {
      setMSG(
        "Invalid input file type (not video or image) or file size is bigger than 15MB"
      );
      setMessageType("error");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex items-center flex-col">
          {currentFile === null ? (
            <div
              className="flex flex-col justify-center items-center px-4"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {/* <img src={dragAndDropIcon} alt="" className="w-1/2 m-3" /> */}
              {isDragActive ? (
                <p className="p-3">Drop the files here ...</p>
              ) : (
                <p className="p-3 text-lg">Kéo ảnh và video vào đây</p>
              )}
              <Button variant="contained" component="label" size="small">
                <span className="text-sm">Chọn từ máy tính</span>
                {/* <input hidden accept="image/*" type="file" /> */}
              </Button>
            </div>
          ) : (
            <Card sx={{ maxWidth: 400, maxHeight: 400, overflow: "scroll" }}>
              {currentFile !== null && currentFile.file.type.includes("image/") && (
                <CardMedia
                  component="img"
                  src={currentFile.filepreview}
                  alt=""
                  className="h-full w-full"
                ></CardMedia>
              )}
            </Card>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ImageUploader;
