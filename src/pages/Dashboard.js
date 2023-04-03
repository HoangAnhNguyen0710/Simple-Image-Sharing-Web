import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PageImageList from "../components/ImageList";
import Sidebar from "../layouts/sidebar";
import { Button } from "@mui/material";
import ImageUploader from "../components/ImageUploader";

const Dashboard = () => {
  const user = useSelector((state) => state.user.value);
  const [openModal, setOpenModal] = React.useState(false);
  useEffect(() => {
    document.title = 'Dashboard - Simple Image Sharing';
    console.log(user);
  }, []);
  return (
    <div className="">
      {/* {user ? (
        <>
        <div>Hello <span className="font-semibold">{user.email}</span></div>
        </>
      ) : (
        <div>
          Please <NavLink to="/login">Login</NavLink> to post some images
        </div>
      )} */}
      <div className="flex justify-center">
        <Button variant="contained" onClick={()=>setOpenModal(true)}>Share an Image</Button>
      </div>
      <div className="flex flex-wrap p-12 items-center justify-center">
      <div className="w-full lg:w-3/4 p-6 h-fit border-2">
          <PageImageList/>
      </div>
      {/* <div className="w-full lg:w-1/4 border-l px-3">
          <Sidebar/>
      </div> */}
      <ImageUploader open={openModal} setOpen={setOpenModal}/>
      </div>
    </div>
  );
};

export default Dashboard;
