import jwtDecode from "jwt-decode";

// ---------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) return false;
  const decoded = jwtDecode(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  const currentTime = Date.now();
  const expirationTime = exp * 1000 - 60000;

  if (currentTime >= expirationTime) {
    console.log("expired token");
    localStorage.removeItem("accessToken");
  }
};

const getIdByToken = (accessToken) => {
  const { id } = jwtDecode(accessToken);
  if (!id) return false;
  return id;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    const { exp } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem("accessToken");
  }
};

export { isValidToken, setSession, getIdByToken };
