import { useRef } from "react";

export default function Accordion({
  label,
  subtitle,
  children,
  index,
  openIndex,
  setOpenIndex,
}) {
  const contentRef = useRef(null);
  const isOpen = index === openIndex;

  const toggleAccordion = () => {
    setOpenIndex(isOpen ? null : index);
  };

  const getHeight = () =>
    contentRef.current ? `${contentRef.current.scrollHeight}px` : "0px";

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <button
        onClick={toggleAccordion}
        className="w-full text-left px-4 py-3 flex flex-col items-start font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
      >
        {subtitle && (
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {subtitle}
          </span>
        )}

        <div className="flex justify-between w-full items-center">
          {label}
          <span>{isOpen ? "−" : "+"}</span>
        </div>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? getHeight() : "0px" }}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
      >
        <div className="p-4 bg-gray-50 dark:bg-gray-800">{children}</div>
      </div>
    </div>
  );
}
