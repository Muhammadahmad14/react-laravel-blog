import { Mail, MapPin, Calendar } from "lucide-react";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";
export default function ProfileInfo({
  user,
  totalFollowers,
  totalFollowing,
  postDate,
}) {
  return (
    <>
      <div className="mt-5 flex gap-2 text-gray-500">
        <Link to={`/user/followers/${user?.id}`}>
          <p>Followers: {totalFollowers}</p>
        </Link>
        <Link to={`/user/followings/${user?.id}`}>
          <p>Following: {totalFollowing}</p>
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
        <span className="flex items-center gap-2">
          <Mail size={18} /> {user?.email}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={18} /> Pakistan
        </span>
        <span className="flex items-center gap-2">
          <Calendar size={18} /> {postDate}
        </span>
      </div>
    </>
  );
}
