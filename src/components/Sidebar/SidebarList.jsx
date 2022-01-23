import React from "react";
import { MenuList } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";

const SidebarList = (props) => {
  const { lists } = props;
  const location = useLocation();

  return (
    <MenuList sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {lists?.map((item) => (
        <SidebarItem
          key={item.title || item.label}
          item={item}
          location={location}
        />
      ))}
    </MenuList>
  );
};

export default SidebarList;
