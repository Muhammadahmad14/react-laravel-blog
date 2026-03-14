import { Link } from "react-router-dom"
import { CheckCircle, Crown, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full border border-green-100"
      >
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={40} className="text-green-600" />
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <Crown className="text-yellow-500" size={22} />
          <h1 className="text-3xl font-bold text-gray-800">
            Premium Activated
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          Payment successful! Your <span className="font-semibold text-green-600">Premium Subscription</span> is now active and the Blue Tick has been applied to your profile.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          Go to Home
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </Link>

      </motion.div>
    </div>
  )
}

export default Success