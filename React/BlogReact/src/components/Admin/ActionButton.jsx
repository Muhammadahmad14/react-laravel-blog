function ActionButton({ children, type="primary", ...props }) {
  const types = {
    primary: "bg-blue-500 hover:bg-blue-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      className={`p-2 rounded text-white shadow-sm cursor-pointer transition ${types[type]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ActionButton;
