import { Mail, MapPin, Calendar, Edit } from "lucide-react";
import ProfileInput from "./ProfileInput";
import { useEffect, useRef, useState } from "react";
import ProfileButton from "./ProfileButton";
import ProfileTextarea from "./ProfileTextArea";
import { useParams } from "react-router-dom";
import { userObj } from "../../Laravel/User";
import Loading from "../Loading";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [totalfollowers, setTotalFollowers] = useState(0);
  const [totalfollowing, setTotalFollowing] = useState(0);
  const [isdisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const nameref = useRef(null);
  const imgref  = useRef(null);
    const basePath = "http://127.0.0.1:8000/storage";


  const handleDisable = () => {
    setIsDisable(false);

    setTimeout(() => {
      nameref.current.focus();
    }, 0);
  };


  const updateProfile = async () => {
    try {
      const payload = {
        name: name,
        description: description,
        about: about,
        profile_img: profileImg,
        removeImage: false,
      };
      const response = await userObj.updateUserProfile({
        id: user.id,
        ...payload,
      });
      if (response.success) {
        setUser(response.data.user);
        setIsDisable(true);
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoading(true);
        const response = await userObj.getUserProfile(id);

        if (response.success) {
          const userData = response.data.user;

          setUser(userData);
          setTotalFollowers(response.data.followers_count);
          setTotalFollowing(response.data.following_count);

          setName(userData.name || "");
          setDescription(userData.description || "");
          setAbout(userData.about || "");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className="mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-lg overflow-hidden ">
      {/* Header */}
      <div className=" h-36 bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="relative p-6">
        <Edit
          size={20}
          className="absolute right-5 cursor-pointer"
          onClick={() => handleDisable()}
        />
        {/* Avatar */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            disabled={isdisable}
            onChange={(e) => setProfileImg(e.target.files[0])}
            ref={imgref}
            className="hidden"
          />
          <img
            src={
              profileImg
                ? URL.createObjectURL(profileImg)
                : user?.profile_img
                ? `${basePath}/${user.profile_img}`
                : "https://i.pravatar.cc/150"
            }
            className="-mt-16 w-28 h-28 rounded-full border-4 border-white dark:border-gray-800"
            alt="profile"
            onClick={() => {
              if (!isdisable) imgref.current.click();
            }}
          />
        </div>

        {/* Name input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile();
          }}
        >
          <ProfileInput
            ref={nameref}
            value={name}
            className="text-gray-900 dark:text-white text-2xl"
            readOnly={isdisable}
            onChange={(e) => setName(e.target.value)}
          />
          <ProfileInput
            value={description}
            className="text-gray-600 dark:text-gray-400"
            placeholder="description"
            readOnly={isdisable}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-5 flex gap-2 text-gray-500">
            <p className="">Followers: {totalfollowers}</p>
            <p>Following: {totalfollowing}</p>
          </div>
          {/* Info */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <Mail size={18} /> {user?.email}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={18} /> Pakistan
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={18} /> {user?.created_at}
            </span>
          </div>

          {/* About */}
          <div className="mt-6">
            <h3 className="font-semibold text-2xl">About</h3>
            <ProfileTextarea
              className="text-gray-700 dark:text-gray-300 "
              value={about}
              readOnly={isdisable}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="flex flex-row-reverse gap-4 mt-4">
            <ProfileButton
              children={"Update"}
              className={`w-32 ${
                isdisable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              type="submit"
              variant="primary"
              disabled={isdisable}
            />
            <ProfileButton
              children={"Cancel"}
              className={`w-32 ${
                isdisable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              variant="secondary"
              disabled={isdisable}
              type="button"
              onClick={() => setIsDisable(true)}
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserProfile;
