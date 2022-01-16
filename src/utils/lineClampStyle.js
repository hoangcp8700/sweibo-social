const lineClampStyle = (line = 1) => {
  return {
    display: " -webkit-box",
    WebkitLineClamp: `${line}`,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textAlign: "left",
  };
};
export { lineClampStyle };
