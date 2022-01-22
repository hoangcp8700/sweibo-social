import React from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { Box } from "@mui/material";
import { MMenu } from "./MUI";

const EmojiPicker = (props) => {
  const { emojiProps, handleSubmit, ...restProps } = props;
  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    handleSubmit(emojiObject);
  };

  const containerPropsCustom = {
    anchorOrigin: { vertical: "top", horizontal: "left" },
    transformOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    paperStyle: {
      backgroundColor: "#fff",
      boxShadow: "none!important",
    },
    ...restProps,
  };
  return (
    <MMenu {...containerPropsCustom}>
      <Box
        sx={{
          "& .emoji-picker-react": {
            m: "0 auto",
            boxShadow: "none",
          },
          "& .emoji-scroll-wrapper": {
            overflowX: "hidden",
          },
        }}
      >
        <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
          disableSearchBar={true}
          {...emojiProps}
        />
      </Box>
    </MMenu>
  );
};

export default EmojiPicker;
