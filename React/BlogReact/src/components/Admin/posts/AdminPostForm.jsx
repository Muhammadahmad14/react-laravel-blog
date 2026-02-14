import { X, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../Post/Button";
import { Input, Textarea } from "../../formComp";
import { admin } from "../../../Laravel/admin";

function AdminPostForm({ post }) {
  const [postData, setPostData] = useState(post?.post || null);
  const isEdit = Boolean(postData);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [showPage, setShowPage] = useState(true);
  const basePath = "http://127.0.0.1:8000/storage";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      title: postData?.title || "",
      body: postData?.body || "",
      status: postData?.status || "published",
    },
  });

  const showImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const submit = async (data) => {
    const payload = {
      title: data.title,
      body: data.body,
      status: data.status,
      tags: tags.split(" "),
      image,
      removeImage,
    };

    const response = isEdit
      ? await admin.updatePost({ id: postData.id, ...payload })
      : await admin.addPost(payload);

    if (response.success) {
      navigate("/admin/posts");
    }
  };

  useEffect(() => {
    if (postData?.tags) {
      const tagNames = postData.tags.map((t) => t.name);
      setTags(tagNames.join(" "));
    }
  }, [postData]);

  if (!showPage) {
    navigate(-1);
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-center items-center  px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg  font-semibold text-gray-900 dark:text-gray-100">
            {isEdit ? "Edit Post" : "Create Post"}
          </h3>
        </div>
        <form className="p-4 md:p-6 space-y-5" onSubmit={handleSubmit(submit)}>
          <Input
            label="Title"
            placeholder="Post title"
            className="text-gray-500 dark:text-gray-200"
            {...register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <Input
            label="Tags"
            placeholder="space separated tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="text-gray-500 dark:text-gray-200"
          />

          <Textarea
            label="Body"
            rows={6}
            {...register("body", { required: "Body is required" })}
            required
          />
          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-200">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200"
            >
              <option value="published">Published</option>
              <option value="block">Blocked</option>
            </select>
          </div>

          {/* Image */}
          <div className="border border-dashed rounded-xl p-4 dark:border-gray-600">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-200">
              <ImageIcon size={18} />
              <span>Add image</span>
              <input type="file" hidden onChange={showImage} />
            </label>

            {(image || (postData?.image && !removeImage)) && (
              <div className="relative mt-4 max-w-sm">
                <X
                  className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 cursor-pointer"
                  onClick={() => {
                    setImage(null);
                    setRemoveImage(true);
                  }}
                />
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : `${basePath}/${postData.image}`
                  }
                  className="rounded-lg border dark:border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button text="Cancel" type="button" onClick={() => navigate(-1)} />
            <Button
              type="submit"
              disabled={isSubmitting}
              text={
                isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Update Post"
                    : "Create Post"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPostForm;
