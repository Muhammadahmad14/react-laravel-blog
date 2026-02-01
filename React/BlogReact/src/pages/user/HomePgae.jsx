import CreatePostBox from "../../components/Post/CreatePostBox";
import PostLists from "../../components/Post/PostLists";
import SearchBar from "../../components/SearchBar";
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
