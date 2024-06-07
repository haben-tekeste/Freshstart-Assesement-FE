import { useEffect } from "react";
import { toast, Bounce } from "react-toastify";


export const useSuccessToast = (isSuccess: boolean, message: string) => {
    useEffect(() => {
      if (isSuccess) {
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }, [isSuccess, message]);
  };