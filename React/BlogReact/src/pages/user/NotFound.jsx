import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      {/* Animated 404 text */}
      <motion.h1
        className="text-8xl font-bold text-blue-600"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-gray-700 text-lg mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you are looking for doesn’t exist 🚧
      </motion.p>

      {/* Back Button */}
      <motion.div
        className="mt-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
        >
          Go Back Home 🏠
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
