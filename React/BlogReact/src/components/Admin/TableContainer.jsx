import SearchInput from "./SearchInput";
import SelectInput from "./ui/SelectInput";

function TableContainer({ children, text, data, search, setSearch }) {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        {text}
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        {search && (
          <div className="w-full md:flex-1">
            <SearchInput
              className="w-full"
              placeholder="Search..."
              value={search}
              onChange={setSearch}
            />
          </div>
        )}

        {data && (
          <div className="w-full md:w-auto md:min-w-[150px]">
            <SelectInput
              options={data.options}
              value={data.value}
              onChange={data.onChange}
              placeholder={data?.placeholder}
            />
          </div>
        )}
      </div>

      {children}
    </div>
  );
}

export default TableContainer;
