"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Theme, CSSObject } from "@mui/material/styles";
import TagIcon from "@mui/icons-material/Tag";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import DrawerItem from "./DrawerItem";
import { useGetUser } from "@/lib/client/api/user/queries";
import AuthGuardInner from "../providers/guards/AuthGuardInner";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export interface DrawerItemType {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface NestedLinks {
  label: string;
  icon: React.ReactNode;
  href: string;
}
[];

interface PageLayoutProps {
  children: React.ReactNode;
}

const drawerItems = [
  {
    label: "leads",
    icon: <PeopleAltOutlinedIcon />,
    href: "/leads",
    nestedLinks: [
      {
        label: "addNew",
        icon: <GroupAddOutlinedIcon />,
        href: "/leads/add",
      },
    ],
  },
  {
    label: "tags",
    icon: <TagIcon />,
    href: "/tags",
    nestedLinks: [],
  },
  {
    label: "email",
    icon: <EmailOutlinedIcon />,
    href: "/mailing",
    nestedLinks: [
      {
        label: "new",
        icon: <ForwardToInboxOutlinedIcon />,
        href: "/mailing/new",
      },
      {
        label: "templates",
        icon: <DescriptionOutlinedIcon />,
        href: "/mailing/templates",
      },
      {
        label: "mailingLists",
        icon: <FormatListBulletedOutlinedIcon />,
        href: "/mailing/lists",
      },
    ],
  },
  {
    label: "usage",
    icon: <BarChartOutlinedIcon />,
    href: "/usage",
    nestedLinks: [],
  },
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const PageLayout: FC<PageLayoutProps> = ({ children }): ReactElement => {
  const { data: user, isLoading } = useGetUser({ enabled: true });
  const [open, setOpen] = React.useState(true);
  const { push, locale, asPath } = useRouter();

  const handleDrawer = () => setOpen((prev) => !prev);
  return (
    <AuthGuardInner>
      <Box width={1} sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          open={open}
          sx={(t) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            ...(open && {
              ...openedMixin(t),
              "& .MuiDrawer-paper": openedMixin(t),
            }),
            ...(!open && {
              ...closedMixin(t),
              "& .MuiDrawer-paper": closedMixin(t),
            }),
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: !open ? "center" : "flex-end",
              py: "8px",
            }}
          >
            <IconButton onClick={handleDrawer}>
              {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            {drawerItems.map((item) => (
              <React.Fragment key={item.label}>
                <DrawerItem open={open} data={item} />
                {item?.nestedLinks.map((nestedItem) => (
                  <DrawerItem
                    key={nestedItem.label}
                    open={open}
                    data={nestedItem}
                    nested
                  />
                ))}
              </React.Fragment>
            ))}
          </List>
          {user?.username}
          <Button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              push("/login", "/login", { locale });
            }}
          >
            logout
          </Button>
        </Drawer>
        <>{children}</>
      </Box>
    </AuthGuardInner>
  );
};

export default PageLayout;
