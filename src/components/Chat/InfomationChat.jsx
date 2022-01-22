import React from "react";
import {
  Paper,
  Box,
  Stack,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { ActivityStatus } from "components";
import { icons } from "constants";

const listMenu = [
  {
    label: "Tùy chỉnh đoạn chat",
    value: "setting",
    actions: [
      { label: "Đổi chủ đề", value: 0 },
      { label: "Biểu tượng cảm xúc", value: 0 },
    ],
  },
  { label: "Ảnh / Video", value: "photos" },
  {
    label: "Cài đặt khác",
    value: "setting-other",
    actions: [
      { label: "Tắt thông báo", value: 0 },
      { label: "Chặn", value: 1 },
      { label: "Xóa cuộc hội thoại", value: 2 },
    ],
  },
];

const AccordionSummaryStyle = styled((props) => (
  <AccordionSummary expandIcon={icons.ExpandLessIcon} {...props} />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const InfomationChat = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Paper sx={{ bgcolor: "background.navbar", height: "100%" }}>
      <Box sx={{ my: 2 }}>
        <Stack alignItems="center">
          <Box>
            <ActivityStatus
              label={"Hoàng Công Phan"}
              avatarStyle={{ width: 80, height: 80 }}
            />
          </Box>
          <Box sx={{ position: "relative" }}>
            <Typography variant="h6">Hoàng Công Phan</Typography>
            <Box sx={{ position: "absolute", right: -35, top: -2 }}>
              <IconButton sx={{ "& svg": { fontSize: 14 } }}>
                {icons.EditIcon}
              </IconButton>
            </Box>
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
                      <Typography key={itemChild.label}>
                        {itemChild.label}
                      </Typography>
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
