const setPosition = (position) => {
  return localStorage.setItem("STP-X", position);
};
const getPosition = () => {
  return localStorage.getItem("STP-X");
};
const deletePosition = () => {
  return localStorage.removeItem("STP-X");
};

export { setPosition, getPosition, deletePosition };
