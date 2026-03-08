export const getUser = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

export const isUser = () => {
  const user = getUser();
  return user?.role === "user";
};

export const isAuthor = (id) => {
  const user = getUser();
  return user?.id === id;
};

export const getUnreadNotificationCount = () => {
  return Number(localStorage.getItem("unread_notifications")) || 0;
};

export const setUnreadNotificationCount = (value) => {
  const current = getUnreadNotificationCount();
  const newValue = typeof value === "function" ? value(current) : value;
  localStorage.setItem("unread_notifications", newValue);
};