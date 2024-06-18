"use client";
import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Theme, CSSObject, useTheme } from "@mui/material/styles";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import DrawerItem from "./DrawerItem";
import { useGetUser } from "@/lib/client/api/user/queries";
import Button from "@mui/material/Button";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import { Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { ROUTES } from "../providers/guards/AuthRouteGuard";
import { useLogout } from "@/lib/client/api/auth/queries";

export interface DrawerItemType {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  hideLayout?: boolean;
}

const drawerItems = [
  {
    label: "leads",
    icon: <PeopleAltOutlinedIcon />,
    href: ROUTES.LEADS.ROOT,
    nestedLinks: [
      {
        label: "addNew",
        icon: <GroupAddOutlinedIcon />,
        href: ROUTES.LEADS.ADD.ROOT,
      },
    ],
  },
  // {
  //   label: "tags",
  //   icon: <TagIcon />,
  //   href: "/tags",
  //   nestedLinks: [],
  // },
  // {
  //   label: "email",
  //   icon: <EmailOutlinedIcon />,
  //   href: "/mailing",
  //   nestedLinks: [
  //     {
  //       label: "new",
  //       icon: <ForwardToInboxOutlinedIcon />,
  //       href: "/mailing/new",
  //     },
  //     {
  //       label: "templates",
  //       icon: <DescriptionOutlinedIcon />,
  //       href: "/mailing/templates",
  //     },
  //     {
  //       label: "mailingLists",
  //       icon: <FormatListBulletedOutlinedIcon />,
  //       href: "/mailing/lists",
  //     },
  //   ],
  // },
  // {
  //   label: "usage",
  //   icon: <BarChartOutlinedIcon />,
  //   href: "/usage",
  //   nestedLinks: [],
  // },
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

const PageLayout: FC<PageLayoutProps> = ({
  children,
  hideLayout,
}): ReactElement => {
  const { t } = useTranslation();
  const { data: user } = useGetUser();
  const { mutate } = useLogout();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(!smDown);

  const handleLogout = async () => {
    try {
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrawer = () => setOpen((prev) => !prev);
  return (
    <Box width={1} sx={{ display: "flex" }}>
      {!hideLayout && (
        <Drawer
          variant="permanent"
          open={open}
          sx={(t) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            boxSizing: "border-box",
            // display: "flex",
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
          {open && (
            <Box
              width={1}
              sx={{
                height: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                pb: "20px",
                rowGap: "16px",
              }}
            >
              {/* <Card
              sx={{
                // height: "100%",
                // flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                p: "28px",
                rowGap: "16px",
              }}
            > */}
              <Typography>
                {t("Hi")}, {user?.firstName}
              </Typography>
              <Button
                // size="small"
                variant="outlined"
                onClick={handleLogout}
              >
                {t("logout")}
              </Button>
              <Typography variant="body2">
                {t("lastLogin")}: {getDisplayDateTime(user?.lastLogin)}
              </Typography>
              {/* </Card> */}
            </Box>
          )}
        </Drawer>
      )}
      <>{children}</>
    </Box>
  );
};

export default PageLayout;
