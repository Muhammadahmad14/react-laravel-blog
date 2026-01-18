import { useParams } from "react-router-dom";
import FollowTabs from "../User/FollowTabs";

function FollowPage() {
  const { tab, id } = useParams();

  return (
    <div className="max-w-xl mx-auto mt-6">
      <FollowTabs userId={id} Tab={tab}/>
    </div>
  );
}

export default FollowPage;
