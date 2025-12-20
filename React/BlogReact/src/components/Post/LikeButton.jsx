import { useState } from "react";
import { Heart } from "lucide-react";
import { service } from "../../Laravel/Post";
import pop from "../../assets/sounds/pop.mp3";

function LikeButton({ postId, likedByUser, likesCount }) {
  const [isliked, setIsLiked] = useState(likedByUser);
  const [likecount, setLikeCount] = useState(likesCount);
   

  const handleLike = async () => {
    const prevLike = isliked;
    const prevCount = likecount;

    const nextLike = !isliked;
    const nextCount = nextLike ? prevCount + 1 : prevCount - 1;

    // 1) Instant UI update
    setIsLiked(nextLike);
    setLikeCount(nextCount);
    // play sound only when user likes
    if (!prevLike && nextLike) {
      const audio = new Audio(pop);
      audio.play();
    }

    try {
      const response = await service.liketoggle({ id: postId });

      if (!response.success) {
        console.log("Something went wrong (API said no)");

        // 2) Revert UI if API failed logically
        setIsLiked(prevLike);
        setLikeCount(prevCount);
      } else {
        // optionally sync with backend if needed
        setIsLiked(response.data.liked);
        setLikeCount(response.data.total_likes);
      }
    } catch (error) {
      console.log("Error in liketoggle:", error);
      // 3) Revert UI on error too
      setIsLiked(prevLike);
      setLikeCount(prevCount);
    }
  };

  return (
    <>
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 transition cursor-pointer ${
          isliked
            ? "text-red-500"
            : "text-slate-700 dark:text-slate-200 hover:text-red-500"
        }`}
      >
        <Heart
          className={`w-5 h-5 ${isliked ? "fill-red-500 text-red-500" : ""}`}
        />
        {isliked ? "Liked" : "Like"} {likecount}
      </button>
    </>
  );
}

export default LikeButton;
