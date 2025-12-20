import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { service } from "../../Laravel/Post";
import { Link, useNavigate } from "react-router-dom";
import { authservice } from "../../Laravel/Auth";

function PostOptions({ postid, postslug, postUser, onDeleted,onHide  }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

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

  const onDelete = async () => {
    try {
      const response = await service.deletePost({ id: postid });
      if (response.success) {
        onDeleted(postid);
      } else {
        alert("faild to delete Post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute right-2 top-5">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer dark:text-gray-100"
      >
        <MoreVertical size={25} />
        <span className="sr-only">Open post options</span>
      </button>

      {/* Menu */}
      {open && (
        <div
          className="absolute right-0 w-40 origin-top-right rounded-md bg-gray-100 dark:bg-gray-800 outline-1 -outline-offset-1 outline-white/10 shadow-lg transition 
                     data-closed:scale-95 data-closed:transform data-closed:opacity-0
                     data-enter:duration-100 data-enter:ease-out
                     data-leave:duration-75 data-leave:ease-in z-10"
        >
          {user && postUser === user.id ? (
            <div className="py-1">
              <Link
                to={`/update-post/${postslug}`}
                className="block w-full px-4 py-2 text-left text-sm text-gray-500 dark:text-gray-300
               hover:bg-white/5 hover:text-white focus:bg-white/5
                focus:text-white focus:outline-hidden cursor-pointer"
              >
                Update
              </Link>

              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5
               hover:text-red-300 focus:bg-white/5 focus:text-red-300 
               focus:outline-hidden cursor-pointer"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="py-1">
              <button
              onClick={onHide}
                className="block w-full px-4 py-2 text-left text-sm text-gray-500 dark:text-gray-300
               hover:bg-white/5 hover:text-white focus:bg-white/5
                focus:text-white focus:outline-hidden cursor-pointer"
              >
                Hide Post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostOptions;
