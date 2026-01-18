import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";

function CreatePostBox() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const basePath = "http://127.0.0.1:8000/storage";

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className="w-full flex justify-center px-3 sm:px-0">
      <div
        onClick={() => navigate("/add-post")}
        className="
          w-full max-w-md
          p-4 rounded-xl cursor-pointer
          bg-white hover:bg-gray-50
          dark:bg-gray-800 dark:hover:bg-gray-700
          shadow
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex-1 rounded-full px-4 py-2 text-sm sm:text-base
              bg-gray-100 text-gray-500
              dark:bg-gray-700 dark:text-gray-300
            "
          >
            What's on your mind? {user?.name}
          </div>

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border shrink-0">
            <img
              src={user?.profile_img ? `${basePath}/${user?.profile_img}` : `default_image.jpg`}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostBox;
