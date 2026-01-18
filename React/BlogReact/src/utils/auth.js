export const getUser = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

export const isAdmin = () => {
    const user = getUser();
  return user?.role === "admin";
};

export const isAuthor = (id) => {
    const user = getUser();
  return user?.id === id;
};
