import { BadgeCheck, Edit, Lock, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { userObj } from "../../../Laravel/User";
import Loading from "../../Loading";
import Toast from "../../Toast";
import { isAuthor } from "../../../utils/auth";
import AvatarSection from "./AvatarSection";
import ProfileInfo from "./ProfileInfo";
import AboutSection from "./AboutSection";
import ProfileFormButtons from "./ProfileFormButtons";
import ProfileInput from "./ProfileInput";
import FollowButton from "./FollowButton";
import UserPosts from "../../Post/UserPosts";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [totalFollowing, setTotalFollowing] = useState(0);
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const nameref = useRef(null);
  const imgRef = useRef(null);
  const isauthor = isAuthor(user?.id);

  const showToast = (msg, type = "success") =>
    setToast({ show: true, message: msg, type });

  const handleDisable = () => {
    setIsDisable(false);
    setTimeout(() => nameref.current.focus(), 0);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        description,
        about,
        profile_img: profileImg,
        removeImage,
      };
      const response = await userObj.updateUserProfile({
        id: user.id,
        ...payload,
      });
      if (response.success) {
        setUser(response.data.user);
        setIsDisable(true);
        showToast("Profile updated successfully", "success");
      } else {
        showToast("Failed to update profile", "error");
      }
    } catch (err) {
      console.log(err);
      showToast("Something went wrong", "error");
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
          setError("");
        } else {
          setError(response.data?.message || "Cannot view this profile.");
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong while fetching profile.");
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [id]);

  if (loading) return <Loading />;

  // Handle private profile or error message
  if (error)
    return (
      <section className="max-w-2xl mx-auto p-6 text-center text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <Lock
          className="mx-auto mb-4 text-gray-500 dark:text-gray-400"
          size={40}
        />
        <p className="text-lg font-semibold">{error}</p>
      </section>
    );

  const postDate = new Date(user?.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <section className="mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-36 bg-gradient-to-r from-indigo-500 to-purple-500" />

        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}

        <div className="relative p-6">
          {isauthor && (
            <Edit
              size={20}
              className="absolute right-5 cursor-pointer"
              onClick={handleDisable}
            />
          )}
          {isauthor && !user?.has_blue_tick && (
            <span className="absolute left-40  group">
              <Link to={"/payment/plans"}>
                <Award
                  className="text-yellow-400 cursor-pointer"
                  size={30}
                  strokeWidth={2}
                />
              </Link>
              <div className="absolute bottom-full mb-2 w-max p-1 px-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition">
                Get Verified & get Blue Tick
              </div>
            </span>
          )}
          {isauthor && user?.has_blue_tick ? (
            <span className="absolute left-35 group w-7 h-7 bg-blue-700 rounded-full border-2 border-white flex items-center justify-center shadow-md hover:bg-blue-500 transition">
              <BadgeCheck className="w-4 h-4 text-white" />
              <div className="absolute bottom-full mb-2 w-max p-1 px-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition">
                Verified
              </div>
            </span>
          ) : null}
          <AvatarSection
            user={user}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            removeImage={removeImage}
            setRemoveImage={setRemoveImage}
            isDisable={isDisable}
            isAuthor={isauthor}
            imgRef={imgRef}
          />
          {!isauthor && <FollowButton userid={id} />}

          <form onSubmit={handleUpdate}>
            <div className="relative mt-2 w-fit">
              <ProfileInput
                ref={nameref}
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={isDisable}
                className="text-gray-900 dark:text-white text-2xl pr-8" // add padding-right for tick
              />

              {!isauthor && user?.has_blue_tick ? (
                <span className="absolute right-15 group top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <BadgeCheck className="w-4 h-4 text-white" strokeWidth={3} />
                  <div className="absolute bottom-full mb-2 w-max p-1 px-2 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition">
                    User is Verified
                  </div>
                </span>
              ) : null}
            </div>

            <ProfileInput
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              readOnly={isDisable}
              placeholder="Description"
              className="text-gray-600 dark:text-gray-400"
            />

            <ProfileInfo
              user={user}
              totalFollowers={totalFollowers}
              totalFollowing={totalFollowing}
              postDate={postDate}
            />

            <AboutSection
              about={about}
              setAbout={setAbout}
              isDisable={isDisable}
            />

            {isauthor && (
              <ProfileFormButtons
                isDisable={isDisable}
                handleUpdate={handleUpdate}
                handleCancel={() => setIsDisable(true)}
              />
            )}
          </form>
        </div>
      </section>
      <div>
        <h2 className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100">
          Recent Posts
        </h2>
        <UserPosts id={id} />
      </div>
    </div>
  );
}
