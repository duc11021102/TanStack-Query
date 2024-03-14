import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// CREATE EVENTS
export const toastSuccessCreate = () => {
  return toast.success("Create success !!!", {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

// DELETE EVENT 
export const toastSuccessDelete = () => {
  return toast.success("Delete success !!!", {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

// EDIT EVENT
export const toastSuccessEdit = () => {
  return toast.success("Edit success !!!", {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};

export const toastErrorEdit = () => {
  return toast.error("Edit failed !!!", {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  });
};