import { useEffect } from "react";
import { toast, Bounce } from "react-toastify";


export const useErrorToast = (isError: boolean, message: string) => {
    useEffect(() => {
      if (isError) {
        toast.error(message, {
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
    }, [isError, message]);
  };