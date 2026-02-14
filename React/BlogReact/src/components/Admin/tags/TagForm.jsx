import { useState } from "react";
import { Input, Button } from "../../formComp";
import { admin } from "../../../Laravel/admin";
import { useNavigate } from "react-router-dom";
import Toast from "../../Toast";

function TagForm({ tag }) {
  const navigate = useNavigate();
  const [tagName, setTagName] = useState(tag?.name || "");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", show: false });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = tag ? await admin.updateTag(tag.id, tagName) : await admin.addTag(tagName);
      if (response.success) {
        setToast({
          show: true,
          message: tag ? "Tag updated successfully" : "Tag created successfully",
          type: "success",
        });
        setTimeout(() => {
          navigate("/admin/tags");
        }, 2000);
      } else {
        setToast({
          show: true,
          message: "Failed to add tag",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-200">
            {tag ? "Edit Tag" : "Create New Tag"}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              label="Tag Name"
              placeholder="Enter tag name"
              className="text-gray-600 dark:text-gray-300"
              required
            />
            <Button text={tag ? "Update Tag" : "Create Tag"} />
          </form>
        </div>
      </div>
    </>
  );
}

export default TagForm;
