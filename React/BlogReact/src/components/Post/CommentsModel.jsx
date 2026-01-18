import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MoreVertical } from "lucide-react";
import { service } from "../../Laravel/Post";
import { authservice } from "../../Laravel/Auth";
import { isAuthor } from "../../utils/auth";
function CommentsModel({
  open = false,
  onClose,
  allcomments = [],
  onRemoveComment,
}) {
  const basePath = "http://127.0.0.1:8000/storage";
  const [isOpen, setIsOpen] = useState(null);
  const [user, setUser] = useState(null);
  // getUser
  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await authservice.getUser();
        if (response.success) setUser(response.user);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [open]);
  // open  option
  const handleOpen = (id) => {
    setIsOpen((prev) => (prev === id ? null : id));
  };

  // delete comments
  const removeComment = async (id) => {
    try {
      const response = await service.deleteComment(id);
      if (response.success) {
        onRemoveComment(id);
        alert("successfully delete Comment");
      } else {
        console.log("falid to delete Comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
        >
          {/* Modal container */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative p-4 w-full max-w-lg"
          >
            <div className="relative p-6 bg-white rounded-t-lg shadow-lg dark:bg-gray-800 text-gray-500 dark:text-gray-300">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-2 right-4 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="mb-3 text-2xl font-bold">Comments</h3>

              <div className="px-4 pb-2 max-h-[60vh] overflow-y-auto mb-3">
                {allcomments.length === 0 ? (
                  <p>No Comments Available</p>
                ) : (
                  allcomments.map((c) => (
                    <div key={c.id} className="flex gap-2 items-start mb-4">
                      {/* Avatar */}
                      <img
                        src={
                          c.user.profile_img
                            ? `${basePath}/${c.user.profile_img}`
                            : "/default_image.jpg"
                        }
                        alt={c.user.name}
                        className="h-8 w-8 rounded-full flex-shrink-0 mt-1"
                      />
                      {/* Username + Comment */}
                      <div className=" relative flex flex-col bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex-1">
                        {/* {isAuthor(c.user.id) ? <span className="absolute top-0 text-sm">Author</span> : ""} */}
                        <span className="text-xs mt-2 font-semibold text-gray-700 dark:text-gray-200">
                          {c.user.name}
                        </span>
                        <span className="text-sm text-gray-800 dark:text-gray-300">
                          {c.body}
                        </span>
                      </div>

                      {/* MoreVertical menu */}
                      {user && user.id === c.user.id ? (
                        <div className="relative mt-3">
                          <button
                            type="button"
                            onClick={() => handleOpen(c.id)}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <MoreVertical size={20} />
                          </button>

                          <AnimatePresence>
                            {isOpen === c.id && (
                              <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-1 w-24 bg-white dark:bg-gray-800 shadow-md rounded-md border border-gray-200 dark:border-gray-700 z-10"
                              >
                                <div className="px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                  <button onClick={() => removeComment(c.id)}>
                                    Delete
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommentsModel;
