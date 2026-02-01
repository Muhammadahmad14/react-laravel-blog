import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({ icon: Icon, label, value, trend, color = "primary" }) {
  const isPositive = trend >= 0;

  const colorClass = {
    primary:
      "bg-gradient-to-tr from-blue-100 to-blue-50 text-blue-600 dark:from-blue-500/20 dark:to-blue-500/10 dark:text-blue-400",
    success:
      "bg-gradient-to-tr from-green-100 to-green-50 text-green-600 dark:from-green-500/20 dark:to-green-500/10 dark:text-green-400",
    warning:
      "bg-gradient-to-tr from-yellow-100 to-yellow-50 text-yellow-600 dark:from-yellow-500/20 dark:to-yellow-500/10 dark:text-yellow-400",
    destructive:
      "bg-gradient-to-tr from-red-100 to-red-50 text-red-600 dark:from-red-500/20 dark:to-red-500/10 dark:text-red-400",
  }[color];

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-xl p-6

        shadow-sm
        hover:shadow-md
        dark:shadow-black/30
        hover:dark:shadow-black/50

        transition-all duration-300 ease-out
      "
    >
      <div className="flex items-start justify-between gap-4">
        {/* TEXT */}
        <div className="space-y-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {label}
          </p>

          <h3 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </h3>

          <p
            className={`text-xs flex items-center gap-1 font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}% from last month
          </p>
        </div>

        {/* ICON */}
        <div
          className={`
            ${colorClass}
            p-3 rounded-xl
            flex items-center justify-center

            shadow-sm
            dark:shadow-black/40
          `}
        >
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
