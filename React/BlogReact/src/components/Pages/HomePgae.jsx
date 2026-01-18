import CreatePostBox from "../Post/CreatePostBox";
import PostLists from "../Post/PostLists";
import SearchBar from "../SearchBar";
function HomePgae() {
  return (
    <>
      <SearchBar />
      <CreatePostBox />
      <PostLists />
    </>
  );
}

export default HomePgae;
