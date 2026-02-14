import React from "react";

function Table(props) {
  return (
    <div
      className="
        relative w-full overflow-x-auto
        rounded-2xl border border-gray-200
        bg-white shadow-md
        dark:bg-gray-900 dark:border-gray-700
      "
    >
      <table
        className="
          w-full text-sm text-gray-700
          dark:text-gray-200
          border-collapse
        "
        {...props}
      />
    </div>
  );
}

/* Filter component inside header */
function TableFilter({ label, options, value, onChange }) {
  return (
    <div className="flex items-center justify-end gap-3">
      {label && (
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="
          rounded-lg border border-gray-300
          px-3 py-2 text-sm font-medium
          bg-white text-gray-700
          shadow-sm
          dark:bg-gray-800 dark:text-gray-200
          dark:border-gray-600
          focus:outline-none focus:ring-2 focus:ring-blue-500
          hover:border-blue-400 transition
        "
      >
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TableHeader(props) {
  return (
    <thead
      className="
        sticky top-0 z-20
        bg-gray-100/80 backdrop-blur-md
        dark:bg-gray-800/80
        border-b border-gray-200 dark:border-gray-700
      "
      {...props}
    />
  );
}

function TableBody(props) {
  return <tbody {...props} />;
}

function TableFooter(props) {
  return (
    <tfoot
      className="
        bg-gray-50 dark:bg-gray-800
        border-t border-gray-200 dark:border-gray-700
        text-gray-600 dark:text-gray-300
        font-semibold
      "
      {...props}
    />
  );
}

function TableRow({ selected = false, className = "", ...props }) {
  return (
    <tr
      className={`
        border-b border-gray-100 dark:border-gray-700
        hover:bg-gray-50 dark:hover:bg-gray-800
        transition-all duration-200
        ${selected ? "bg-blue-50 dark:bg-blue-900/20" : ""}
        ${className}
      `}
      {...props}
    />
  );
}

function TableHead(props) {
  return (
    <th
      className="
        px-6 py-4 text-left
        text-[11px] font-bold uppercase tracking-widest
        text-gray-500 dark:text-gray-200
      "
      {...props}
    />
  );
}

function TableCell(props) {
  return (
    <td
      className="
        px-6 py-4 text-sm
        text-gray-700 dark:text-gray-200
        whitespace-nowrap
      "
      {...props}
    />
  );
}

function TableCaption(props) {
  return (
    <caption
      className="
        mt-4 text-left text-sm
        text-gray-500 dark:text-gray-400
        italic
      "
      {...props}
    />
  );
}

export {
  Table,
  TableFilter,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
