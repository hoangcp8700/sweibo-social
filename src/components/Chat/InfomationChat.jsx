import React from "react";
import {
  Paper,
  Box,
  Avatar,
  Stack,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  IconButton,
  Typography,
  styled,
  TextareaAutosize,
} from "@mui/material";
import {
  ActivityStatus,
  AvatarGroupChat,
  LoadingEllipsisElement,
} from "components";
import { icons } from "constants";
import { MButton } from "components/MUI";

const listMenu = [
  {
    label: "Tùy chỉnh đoạn chat",
    value: "setting",
    actions: [
      { label: "Đổi chủ đề", icon: icons.DonutSmallIcon, value: "theme" },
      { label: "Biểu tượng cảm xúc", icon: icons.FaceIcon, value: "enter" },
    ],
  },
  { label: "Ảnh / Video", value: "photos" },
  {
    label: "Cài đặt khác",
    value: "setting-other",
    actions: [
      {
        label: "Rời khỏi cuộc trò chuyện",
        icon: icons.DeleteSweepIcon,
        value: "delete-participant",
      },
    ],
  },
];

const AccordionSummaryStyle = styled((props) => (
  <AccordionSummary expandIcon={icons.ExpandLessIcon} {...props} />
))(({ theme }) => ({
  minHeight: `40px!important`,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(0, 0, 0, 1),
  },
}));

const InfomationChat = (props) => {
  const { room, handleEditRoom, handleActions } = props;

  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditTitle, setIsEditTitle] = React.useState(false);
  const [form, setForm] = React.useState({ title: "" });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeForm = React.useCallback(
    (e) => setForm({ ...form, [e.target.name]: e.target.value }),
    [form]
  );

  const handleToggleIsEditTitle = () => {
    !isEditTitle
      ? setForm({ ...form, title: room?.title })
      : setForm({ title: "" });

    setIsEditTitle(!isEditTitle);
  };

  const handleEditRoomCustom = async () => {
    setIsLoading(true);
    await handleEditRoom(form, room?._id);
    setIsLoading(false);
    handleToggleIsEditTitle();
  };

  return (
    <Paper
      sx={{
        bgcolor: "background.navbar",
        height: "100%",
        position: "relative",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 2,
          }}
        >
          <LoadingEllipsisElement />
        </Box>
      ) : (
        ""
      )}
      <Box sx={{ my: 2 }}>
        <Stack alignItems="center" sx={{ gap: 1 }}>
          <AvatarGroupChat
            images={room?.participants}
            sizeGroup={46}
            sizeContainer={100}
            imageOnce={80}
          />
          <Box
            sx={{
              px: 2,
              width: "100%",
            }}
          >
            {!isEditTitle ? (
              <Typography variant="h6" align="center">
                {room?.title}
                <IconButton
                  sx={{ ml: 1, "& svg": { fontSize: 14 } }}
                  onClick={handleToggleIsEditTitle}
                >
                  {icons.EditIcon}
                </IconButton>
              </Typography>
            ) : (
              <Box
                sx={{
                  "& textarea": {
                    color: "text.primary",
                    bgcolor: "background.opacity",
                    p: 2,
                    borderRadius: (theme) => theme.sizes.minBase,
                  },
                }}
              >
                <TextareaAutosize
                  style={{
                    width: "100%",
                    fontSize: 14,
                    outline: "none",
                    border: "none",
                    resize: "none",
                    fontFamily: "Public Sans,sans-serif",
                  }}
                  value={form?.title}
                  name="title"
                  onChange={handleChangeForm}
                />
                <Stack
                  direction="row"
                  spacing={0.5}
                  justifyContent="flex-end"
                  sx={{ "& button": { fontSize: 12, py: 0.3 } }}
                >
                  <MButton variant="cancel" onClick={handleToggleIsEditTitle}>
                    Hủy bỏ
                  </MButton>
                  <MButton variant="contained" onClick={handleEditRoomCustom}>
                    Sửa
                  </MButton>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>

        <Stack sx={{ mt: 2, px: 2, gap: 1 }}>
          {listMenu?.map((item) => (
            <Accordion
              sx={{
                bgcolor: "background.opacity",
                borderRadius: (theme) => `${theme.sizes.radius}px!important`,
                overflow: "hidden",
              }}
              key={item.label}
              expanded={expanded === item.value}
              onChange={handleChange(item.value)}
            >
              <AccordionSummaryStyle>
                <Typography sx={{ color: "text.primary" }}>
                  {item.label}
                </Typography>
              </AccordionSummaryStyle>
              <AccordionDetails>
                {item?.actions?.length
                  ? item?.actions?.map((itemChild) => (
                      <Box
                        sx={{ cursor: "pointer", width: "fit-content" }}
                        key={itemChild.label}
                        onClick={() =>
                          handleActions(itemChild.value, room?._id)
                        }
                      >
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton
                            sx={{
                              "& svg": {
                                fontSize: 14,
                                fill: (theme) => theme.palette.text.primary,
                              },
                            }}
                          >
                            {itemChild.icon}
                          </IconButton>
                          <Typography>{itemChild.label}</Typography>
                        </Stack>
                      </Box>
                    ))
                  : ""}
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default InfomationChat;
