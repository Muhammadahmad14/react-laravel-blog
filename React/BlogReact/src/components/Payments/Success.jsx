import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your subscription is active. Blue Tick has been applied!
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
export default Success;
