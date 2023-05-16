import Cookies from "js-cookie";

// Save authToken in a cookie
export const setAuthToken = (authToken: string) => {
  Cookies.set("authToken", authToken, {
    expires: 7,
    secure: true,
  });
};

// Retrieve authToken from a cookie
export const getAuthToken = () => {
  return Cookies.get("authToken");
};

// Remove authToken from a cookie
export const removeAuthToken = () => {
  Cookies.remove("authToken");
};
