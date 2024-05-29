import React, { FC, ReactElement } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { DrawerItemType } from "./PageLayout";
import Link from "next/link";
import {
  useRouter,
  ReadonlyURLSearchParams,
  usePathname,
} from "next/navigation";

interface DrawerItemProps {
  open: boolean;
  data: DrawerItemType;
  nested?: boolean;
}

const DrawerItem: FC<DrawerItemProps> = ({
  open,
  data,
  nested,
}): ReactElement => {
  const path = usePathname();
  const active = data.href === path;
  return (
    <Link href={data.href}>
      <ListItem
        disablePadding
        sx={(t) => ({
          display: "block",
          p: "2px 10px",
        })}
      >
        <ListItemButton
          sx={(t) => ({
            minHeight: 48,
            display: "flex",
            justifyContent: open ? "center" : "flex-start",
            px: 2.5,
            borderRadius: "10px",
            background: active ? t.palette.action.hover : "inherit",
            pl: open && nested ? "24px" : "8px",
          })}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: active ? "red" : "inherit",
            }}
          >
            {data.icon}
          </ListItemIcon>
          <ListItemText
            primary={data.label}
            sx={{ opacity: open ? 1 : 0, color: active ? "red" : "inherit" }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default DrawerItem;
