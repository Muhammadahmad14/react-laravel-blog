import { useState } from "react";
import { Heart } from "lucide-react";
import { service } from "../../Laravel/Post";
import pop from "../../assets/sounds/pop.mp3";

function LikeButton({ postId, likedByUser, likesCount }) {
  const [isliked, setIsLiked] = useState(likedByUser);
  const [likecount, setLikeCount] = useState(likesCount);
  const [animate, setAnimate] = useState(false);

  const handleLike = async () => {
    const prevLike = isliked;
    const prevCount = likecount;

    const nextLike = !isliked;
    const nextCount = nextLike ? prevCount + 1 : prevCount - 1;

    if (!prevLike && nextLike) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 400);

      new Audio(pop).play();
    }

    setIsLiked(nextLike);
    setLikeCount(nextCount);

    try {
      const res = await service.liketoggle({ id: postId });

      if (!res.success) {
        setIsLiked(prevLike);
        setLikeCount(prevCount);
      } else {
        setIsLiked(res.data.liked);
        setLikeCount(res.data.total_likes);
      }
    } catch {
      setIsLiked(prevLike);
      setLikeCount(prevCount);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 cursor-pointer ${
        isliked
          ? "text-red-500"
          : "text-slate-700 dark:text-slate-200 hover:text-red-500"
      }`}
    >
      <span
        className={`
          inline-flex items-center justify-center
          transition-transform duration-300 ease-out
          ${
            animate
              ? "scale-150 rotate-12 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              : "scale-100 rotate-0"
          }
        `}
      >
        <Heart
          className={`w-5 h-5 ${isliked ? "fill-red-500 text-red-500" : ""}`}
        />
      </span>

      <span className="text-sm sm:text-base">
        {isliked ? "Liked" : "Like"} {likecount}
      </span>
    </button>
  );
}

export default LikeButton;
