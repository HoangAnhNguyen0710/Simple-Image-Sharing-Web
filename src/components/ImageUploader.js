import { Alert, Box, Button, Card, CardMedia, Modal, Snackbar, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { FirebaseStorage, firebaseApp } from "../config/firebase";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import moment from "moment";

const ImageUploader = (props) => {
  const open = props.open;
  const setOpen = props.setOpen;
  const handleOpen = () => setOpen(true);

  const handleCloseModal = () => setOpen(false);
  const [currentFile, setCurrentFile] = React.useState(null);
  const [inputTitle, setInputTitle] = React.useState("");
  const [inputDescription, setInputDescription] = React.useState("");
  const [msg, setMSG] = React.useState("");
  const [messageType, setMessageType] = React.useState(null);
  const user = useSelector((state)=>state.user.value);


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    maxHeight: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll"
  };
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    // console.log(acceptedFiles[0]);
    if (
      acceptedFiles[0].type.includes("image/") && acceptedFiles[0].size < 1028 * 1028 * 15)
    {
      setCurrentFile({
        ...currentFile,
        file: acceptedFiles[0],
        filepreview: URL.createObjectURL(acceptedFiles[0]),
      });
      // console.log(acceptedFiles[0].type);
    } else {
      setMSG(
        "Invalid input file type (not image) or file size is bigger than 15MB"
      );
      setMessageType("error");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const upload =FirebaseStorage.ref(`/images/${user.uid}/${currentFile.file.name}`).put(currentFile.file);
    upload.on(
    "state_changed",
    snapshot => {},
    error => {console.log(error)},
    () => {
      FirebaseStorage
      .ref("images")
      .child(`${user.uid}`)
      .child(currentFile.file.name)
      .getDownloadURL()
      .then((url) => {
        console.log(url)
        const postData = {
          userId: user.uid,
          imageSrc: url,
          dateCreated: moment().format('LLLL'),
          title: inputTitle,
          description: inputDescription,
          // comments: [],
          likes: [],
          docId: v4(),
          fileType: currentFile.file.type,
        };
      firebaseApp
      .firestore()
      .collection('images').doc(`/${postData.docId}`) 
      .set(postData).then(() => {
        setMSG(
          "Uploaded post successfully"
        );
        setMessageType("success");
      });
      });
    }
   )
  }
  const handleCloseSnackBar = () => {
    setMSG("");
    if(messageType === "success")  handleCloseModal(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Snackbar
          open={msg === "" ? false : true}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={messageType !== null ? messageType : "info"}
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        </Snackbar>
        <div className="flex items-center flex-col border-2 rounded-md">
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
                <p className="p-3 text-lg">Drag or drop an image here</p>
              )}
              <Button variant="contained" component="label" size="small">
                <span className="text-sm">Upload from device</span>
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
          <div className="p-4">
          { currentFile !== null && <Button variant="contained" component="label" size="small" color="error" onClick={()=>setCurrentFile(null)}>Clear Image</Button> }
          </div>
        <form onSubmit={handleSubmitForm} className="">
          <TextField
          required
          id="outlined-required"
          label="Title"
          name="title"
          value={inputTitle}
          onChange={(e)=>setInputTitle(e.target.value)}
          size="small"
          fullWidth
          />
           <TextField
          id="outlined-multiline-flexible"
          sx={{my: 3}}
          label="Short description"
          value={inputDescription}
          onChange={(e)=>setInputDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <Button type="submit" variant="contained">Upload</Button>
        </form>

      </Box>
    </Modal>
  );
};

export default ImageUploader;
