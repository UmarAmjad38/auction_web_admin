// Notification.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const SuccessMessage = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000, // Auto dismiss in 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        // theme: "colored", // For a colorful theme
    });
};

export const ErrorMessage = (message: string) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        // theme: "colored",
    });
};
