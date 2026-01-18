import { X, Image as ImageIcon } from "lucide-react";
import Input from "../formComp/Input";
import Textarea from "../formComp/Textarea";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { service } from "../../Laravel/Post";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [showpage, setShowPage] = useState(true);
  const postData = post?.post || null;
  const basePath = "http://127.0.0.1:8000/storage";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: postData?.title || "",
      body: postData?.body || "",
      tags: postData?.tags?.name || "",
      removeImage: removeImage,
    },
  });
  const showImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const submit = async (data) => {
    try {
      const payload = {
        title: data.title,
        body: data.body,
        tags: tags.split(" "),
        image,
        removeImage: removeImage,
      };

      const response = post
        ? await service.updatePost({ id: postData.id, ...payload })
        : await service.addPost(payload);

      if (response.success) {
        navigate("/");
      } else {
        alert("Failed to save post.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (postData?.tags && Array.isArray(postData.tags)) {
      const tagNames = postData.tags.map((tag) => tag.name);
      setTags(tagNames.join(" "));
    }
  }, [postData]);

  useEffect(() => {
    const handlePage = () => {
      if (!showpage) return navigate(-1);
    };
    handlePage();
  }, [showpage]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 bg-black/50">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 md:p-6 w-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Create Post
            </h3>
            <button
              type="button"
              className="text-gray-600 dark:text-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full w-9 h-9 flex justify-center items-center"
            >
              <X className="w-5 h-5" onClick={() => setShowPage(false)} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Body */}
          <form
            className="pt-4 md:pt-6 space-y-4"
            onSubmit={handleSubmit(submit)}
          >
            <Input
              placeholder="What's on your mind?"
              label="Title"
              className=" text-gray-500 dark:text-gray-200"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "title must contain at least 8 words",
                },
              })}
              error={errors.title?.message}
            />
            <Input
              placeholder="Enter tags seperated By space (optional)"
              label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className=" text-gray-500 dark:text-gray-200"
            />
            <Textarea
              placeholder="Write something about your post..."
              label="Description"
              rows={4}
              {...register("body", {
                required: "body is required",
              })}
            />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 sm:gap-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl px-3 sm:px-4 py-2">
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Add Image
                  </span>
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  className="hidden"
                  onChange={showImage}
                />
              </div>

              {/* Preview */}
              <div>
                {image ? (
                  <>
                    <X
                      className="w-5 h-5 text-gray-500 dark:text-gray-100"
                      onClick={() => {
                        setImage(null);
                        document.getElementById("image-upload").value = "";
                      }}
                    />
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="..."
                    />
                  </>
                ) : postData?.image && !removeImage ? (
                  <>
                    <X
                      className="w-5 h-5 text-gray-500 dark:text-gray-100"
                      onClick={() => {
                        setRemoveImage(true);
                        document.getElementById("image-upload").value = "";
                      }}
                    />
                    <img
                      src={`${basePath}/${postData.image}`}
                      alt="Preview"
                      className="..."
                    />
                  </>
                ) : null}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 border-t border-gray-200 dark:border-gray-700 cursor-pointer">
              <Button text="Cancel" type="button" onClick={() => setShowPage(false)}/>
              <Button
                disabled={isSubmitting}
                text={isSubmitting ? "loading" : post ? "Update" : "Create"}
                className="bg-blue-600 cursor-pointer text-gray-200"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostForm;
