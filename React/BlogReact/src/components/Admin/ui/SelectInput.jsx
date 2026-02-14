function SelectInput({
  options = [],
  value = "",
  onChange,
  placeholder,
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
