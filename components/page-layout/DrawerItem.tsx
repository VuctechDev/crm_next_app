import React, { FC, ReactElement } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "next-i18next";

interface DrawerItemType {
  label: string;
  icon: React.ReactNode;
  href: string;
}
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
  const { t } = useTranslation();
  const path = usePathname();
  const active = data.href === path;
  return (
    <Link href={data.href}>
      <ListItem
        disablePadding
        sx={(t) => ({
          display: "block",
          p: "2px 10px",
          [t.breakpoints.down("sm")]: {
            p: "2px 6px",
          },
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
            pl: open && nested ? "24px" : "10px",
            [t.breakpoints.down("sm")]: {
              pl: open && nested ? "24px" : "2px",
              minHeight: 40,
            },
          })}
        >
          <ListItemIcon
            sx={(t) => ({
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
              color: active ? t.palette.primary.main : t.palette.text.secondary,
              [t.breakpoints.down("sm")]: {
                mr: "10px",
              },
            })}
          >
            {data.icon}
          </ListItemIcon>
          <ListItemText
            primary={t(data.label)}
            sx={(t) => ({
              opacity: open ? 1 : 0,
              color: active ? t.palette.primary.main : t.palette.text.secondary,
            })}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default DrawerItem;
