import { Trash } from "lucide-react";

export default function AvatarSection({ user, profileImg, setProfileImg, removeImage, setRemoveImage, isDisable, isAuthor, imgRef }) {
  const basePath = "http://127.0.0.1:8000/storage";

  const deleteImage = () => {
    if (isAuthor) {
      setProfileImg(null);
      setRemoveImage(true);
    }
  };

  return (
    <div className="mb-4 relative group w-fit">
      <input
        type="file"
        accept="image/*"
        disabled={isDisable}
        onChange={(e) => setProfileImg(e.target.files[0])}
        ref={imgRef}
        className="hidden"
      />
      <img
        src={
          profileImg
            ? URL.createObjectURL(profileImg)
            : user?.profile_img && !removeImage
            ? `${basePath}/${user.profile_img}`
            : "/default_image.jpg"
        }
        className="-mt-16 w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 cursor-pointer"
        alt="profile"
        onClick={() => {
          if (!isDisable) imgRef.current.click();
        }}
      />
      {isAuthor && (
        <Trash
          size={25}
          className="absolute top-1 left-0 text-red-500 bg-white dark:bg-gray-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
          onClick={deleteImage}
        />
      )}
    </div>
  );
}
