import { useEffect, useState } from "react";
import { BadgeCheck, Send } from "lucide-react";
import CommentsModel from "./CommentsModel";
import LikeButton from "./LikeButton";
import { service } from "../../Laravel/Post";
import PostOptions from "./PostOptions";
import { Link } from "react-router-dom";
import message_sound from "../../assets/sounds/message_sound.wav";
import UserMiniCard from "../User/UserMiniCard";

function PostCard({ post, onDeleted }) {
  const [tags, setTags] = useState([]);
  const [openCard, setOpenCard] = useState(true);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const basePath = "http://127.0.0.1:8000/storage";

  const postDate = new Date(post.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleRemoveComment = (id) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    setSending(true);
    try {
      const result = await service.addComment({
        post_id: post.id,
        body: commentText,
      });

      if (result.success) {
        setComments([...comments, result.data.data]);
        setCommentText("");
        new Audio(message_sound).play();
      }
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (post?.tags && Array.isArray(post.tags)) {
      setTags(post.tags);
    }
  }, [post]);

  if (!openCard) return null;

  return (
    <div className="w-full max-w-md mx-auto mb-6 px-2 sm:px-0">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        {/* Header */}
        <div className="relative flex justify-between items-center p-3 sm:p-4">
          <PostOptions
            postUser={post.user_id}
            postid={post.id}
            postslug={post.slug}
            onDeleted={onDeleted}
            onHide={() => setOpenCard(false)}
          />
          <div className="flex items-center">
            <UserMiniCard user={post.user} />
            <div className="flex items-center gap-2 ml-3 text-sm">
              <Link
                to={`/${post.user.name}/${post.user.id}/profile`}
                className="font-semibold text-slate-800 dark:text-slate-100"
              >
                {post.user.name}
              </Link>
              {post.user.has_blue_tick ? (
                <span className="flex items-center justify-center w-5 h-5 bg-blue-700 rounded-full border border-white shadow-sm">
                  <BadgeCheck className="w-4 h-4 text-white" />
                </span>
              ) : null}
              <div className="text-slate-500 text-xs">{postDate}</div>
            </div>
          </div>
        </div>

        {/* Image */}
        {post.image && (
          <div className="h-56 sm:h-64 overflow-hidden mx-2 rounded-md">
            <Link to={`${basePath}/${post.image}`}>
              <img
                src={`${basePath}/${post.image}`}
                alt="post"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <Link
            to={`/post/${post.slug}`}
            className="block text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-2 break-words"
          >
            {post.title}
          </Link>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 break-words">
            {post.body}
          </p>
          {tags &&
            tags.map((tag) => (
              <Link to={`/tag/${tag.name}`} key={tag.id}>
                <span className="inline-block mr-2 text-sm text-cyan-600 dark:text-cyan-400">
                  #{tag.name}
                </span>
              </Link>
            ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-3 pb-3 sm:px-4">
          <div className="flex items-center gap-3 text-sm sm:text-base">
            <LikeButton
              postId={post.id}
              likedByUser={post.liked_by_user}
              likesCount={post.likes_count}
            />

            <button
              onClick={() => setShowCommentsModal(true)}
              className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition"
            >
              Comments {comments.length}
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="px-3 pb-4 sm:px-4">
          <div className="flex items-center gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <button
              onClick={handleAddComment}
              disabled={sending}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-2 sm:px-3 py-2 rounded-md transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showCommentsModal && (
          <CommentsModel
            open={showCommentsModal}
            onClose={() => setShowCommentsModal(false)}
            allcomments={comments}
            onRemoveComment={handleRemoveComment}
          />
        )}
      </div>
    </div>
  );
}

export default PostCard;
