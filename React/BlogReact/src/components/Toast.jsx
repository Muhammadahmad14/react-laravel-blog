import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      handleClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 max-w-xs w-full px-4 py-3 rounded-lg shadow-xl flex items-center justify-between 
        transform transition-all duration-300 ease-in-out
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
        ${visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}
      `}
    >
      <span className="text-white font-medium">{message}</span>
      <button
        onClick={handleClose}
        className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-30 transition"
      >
        <X size={16} className="text-white" />
      </button>
    </div>
  );
}
