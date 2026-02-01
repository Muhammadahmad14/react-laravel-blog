import SearchInput from "./SearchInput";
function TableContainer({ children }) {
  return (
    <div className="w-full">
      <div>
        <SearchInput />
      </div>
      {children}
    </div>
  );
}

export default TableContainer;
