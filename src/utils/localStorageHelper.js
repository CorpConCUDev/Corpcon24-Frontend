export const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemString = localStorage.getItem(key);
  if (!itemString) {
    return null;
  }
  const item = JSON.parse(itemString);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem("attempt");
    clearLocalStorage();
    return null;
  }
  return item.value;
};

export const clearLocalStorage = () => {
  const keyArray = ["userId", "email", "userType"];

  keyArray.map((item) => {
    localStorage.removeItem(item);
  });
};
