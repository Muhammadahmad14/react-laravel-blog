const UserCard = ({ user }) => {
  return (
    <div className="flex items-center gap-3 p-5 w-full max-w-md rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer mb-3">
      
      <img
        src="/default_image.jpg"
        alt="user"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {user.name}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {user.email}
        </span>
      </div>

    </div>
  );
};

export default UserCard;
