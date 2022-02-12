import { IconButton } from "@mui/material";
import { icons } from "constants";

const typeLike = (type) => {
  if (type === "Like") {
    return (
      <IconButton
        sx={{
          "& svg": {
            fontSize: 16,
            fill: (theme) => theme.palette.info.main,
          },
        }}
      >
        {icons.LikeIcon}
      </IconButton>
    );
  }
  return "";
};
export default typeLike;
