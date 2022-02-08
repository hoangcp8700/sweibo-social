import jwtDecode from "jwt-decode";

// ---------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) return false;
  const decoded = jwtDecode(accessToken);
  const currentTime = Math.floor(Date.now() / 1000);
  console.log("isValidToken", decoded.exp, currentTime);
  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  window.clearTimeout(expiredTimer);
  const currentTime = Math.floor(Date.now() / 1000);
  const timeLeft = (exp - currentTime) * 1000;

  expiredTimer = window.setTimeout(() => {
    console.log("expired token");
    localStorage.removeItem("accessToken");
  }, timeLeft);
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
