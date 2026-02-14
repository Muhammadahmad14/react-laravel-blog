import TagForm from "../../../components/Admin/tags/TagForm";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { admin } from "../../../Laravel/admin";
function EditTag() {
  const { id } = useParams();
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await admin.getTag(id);
        if (response.success) {
          setTag(response.data);
        } else {
          console.error("Failed to fetch tag:", response.error);
        }
      } catch (error) {
        console.error("Error fetching tag:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTag();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <TagForm tag={tag}/>
    </>
  );
}

export default EditTag;
