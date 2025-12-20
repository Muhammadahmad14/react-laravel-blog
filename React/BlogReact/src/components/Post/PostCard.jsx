import { useState } from "react";
import { Send } from "lucide-react";
import CommentsModel from "./CommentsModel";
import LikeButton from "./LikeButton"; // ⬅️ add this
import { service } from "../../Laravel/Post"; // you still need this for comments only
import PostOptions from "./PostOptions";
import { Link } from "react-router-dom";
import message_sound from "../../assets/sounds/message_sound.wav"

function PostCard({ post, onDeleted }) {
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

  // trak chnages when the comment removeComment
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
        const audio = new Audio(message_sound);
        audio.play();
      }
    } catch (error) {
      alert("Failed to add comment", error);
    } finally {
      setSending(false);
    }
  };
  if (!openCard) return " ";

  return (
    <div className="w-full max-w-md mx-auto mb-6 px-3 sm:px-0">
      <div className="relative flex flex-col bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-300">
        {/* Post Header */}
        <div className="flex items-center justify-between p-3 sm:p-4">
          <PostOptions
            postUser={post.user_id}
            postid={post.id}
            postslug={post.slug}
            onDeleted={onDeleted}
            onHide={() => setOpenCard(false)}
          />
          <div className="flex items-center">
            <img
              alt={post?.user?.name || "User"}
              src={
                post?.user?.profile_img
                  ? `${basePath}/${post.user.profile_img}`
                  : "/default_image.jpg"
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default_image.jpg";
              }}
              className="inline-block h-9 w-9 rounded-full object-cover"
            />

            <div className="flex flex-col ml-3 text-sm">
              <span className="text-slate-800 dark:text-slate-100 font-semibold">
                {post.user.name}
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                {postDate}
              </span>
            </div>
          </div>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="relative h-56 sm:h-64 md:h-72 m-2.5 overflow-hidden text-white rounded-md">
            <img
              alt="post"
              src={`${basePath}/${post.image}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="p-4">
          <Link
            to={`/post/${post.slug}`}
            className="mb-2 text-slate-800 dark:text-slate-100 text-lg 
           sm:text-xl font-semibold break-words"
          >
            {post.title}
          </Link>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-normal font-light break-words">
            {post.body}
          </p>
        </div>

        {/* Like and Comment Section */}
        <div className="flex flex-wrap items-center gap-6 px-4 pb-4">
          <LikeButton
            postId={post.id}
            likedByUser={post.liked_by_user}
            likesCount={post.likes_count}
          />

          <button
            onClick={() => setShowCommentsModal(true)}
            className="text-slate-700 dark:text-slate-200 hover:text-cyan-600 transition cursor-pointer"
          >
            Comments {comments.length}
          </button>
        </div>

        {/* Comments Modal */}
        {showCommentsModal && (
          <CommentsModel
            open={showCommentsModal}
            onClose={() => setShowCommentsModal(false)}
            allcomments={comments}
            onRemoveComment={handleRemoveComment}
          />
        )}

        {/* Add Comment Input */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <button
              onClick={handleAddComment}
              disabled={sending}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded-md transition disabled:opacity-50"
            >
              <Send className="w-4 h-4 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
