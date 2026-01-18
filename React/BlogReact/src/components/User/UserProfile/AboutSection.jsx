export default function AboutSection({ about, setAbout, isDisable }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold text-2xl">About</h3>

      <textarea
        value={about}
        readOnly={isDisable}
        onChange={(e) => setAbout(e.target.value)}
        rows={3}
        className="
          w-full bg-transparent outline-none
          border-b border-transparent
          focus:border-indigo-500
          break-words whitespace-normal
          resize-none
          text-gray-700 dark:text-gray-300
        "
      />
    </div>
  );
}
