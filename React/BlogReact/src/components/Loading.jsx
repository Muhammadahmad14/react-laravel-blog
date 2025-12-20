import { ThreeDots } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;
