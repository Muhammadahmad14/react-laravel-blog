export default function ProfileFormButtons({
  isDisable,
  handleCancel,
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition focus:outline-none w-32";

  const primary =
    "bg-indigo-600 text-white hover:bg-indigo-700";

  const secondary =
    "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600";

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <div className="flex flex-row-reverse gap-4 mt-4">
      <button
        type="submit"
        disabled={isDisable}
        className={`${base} ${primary} ${
          isDisable ? disabledStyle : "cursor-pointer"
        }`}
      >
        Update
      </button>

      <button
        type="button"
        disabled={isDisable}
        onClick={handleCancel}
        className={`${base} ${secondary} ${
          isDisable ? disabledStyle : "cursor-pointer"
        }`}
      >
        Cancel
      </button>
    </div>
  );
}
