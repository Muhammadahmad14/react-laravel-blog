function ProfileButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const base = "px-4 py-2 rounded-lg font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ProfileButton;
