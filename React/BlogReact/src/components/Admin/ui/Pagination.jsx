import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function Pagination({ page, lastPage, setPage, loading }) {
  const pageNumbers = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-end items-center gap-2 mt-4 flex-wrap">
      <button
        disabled={page <= 1 || loading}
        onClick={() => setPage(page - 1)}
        className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          disabled={loading}
          onClick={() => setPage(num)}
          className={`px-3 py-1 rounded transition ${
            page === num
              ? "bg-blue-500 text-white shadow"
              : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          } disabled:opacity-50`}
        >
          {num}
        </button>
      ))}

      <button
        disabled={page >= lastPage || loading}
        onClick={() => setPage(page + 1)}
        className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
