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
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import DrawerItem from "./DrawerItem";
import { useGetUser } from "@/lib/client/api/user/queries";
import { getDisplayDateTime } from "@/lib/client/getDisplayDate";
import { Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { ROUTES } from "../providers/guards/AuthRouteGuard";
import DrawIcon from "@mui/icons-material/Draw";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import TagIcon from "@mui/icons-material/Tag";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AppBar from "./AppBar";
import PublicPageWrapper from "./PublicPageWrapper";
import PageContentWrapper from "./PageContentWrapper";
import CampaignIcon from "@mui/icons-material/Campaign";

interface PageLayoutProps {
  children: React.ReactNode;
  publicPage?: boolean;
  actions?: React.ReactNode;
  title?: string;
  labels?: { [key: number]: string | undefined };
  center?: boolean;
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
  {
    label: "campaigns",
    icon: <CampaignIcon />,
    href: ROUTES.CAMPAIGNS,
    nestedLinks: [],
  },

  {
    label: "email",
    icon: <EmailOutlinedIcon />,
    href: ROUTES.EMAIL.ROOT,
    nestedLinks: [
      {
        label: "new",
        icon: <ForwardToInboxOutlinedIcon />,
        href: ROUTES.EMAIL.NEW,
      },
      {
        label: "templates",
        icon: <DescriptionOutlinedIcon />,
        href: ROUTES.EMAIL.TEMPLATES,
      },
      //     {
      //       label: "mailingLists",
      //       icon: <FormatListBulletedOutlinedIcon />,
      //       href: "/mailing/lists",
      //     },
      {
        label: "signature",
        icon: <DrawIcon />,
        href: ROUTES.EMAIL.SIGNATURE,
      },
      {
        label: "config",
        icon: <SettingsOutlinedIcon />,
        href: ROUTES.EMAIL.CONFIG,
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
    label: "usage",
    icon: <BarChartOutlinedIcon />,
    href: ROUTES.USAGE.ROOT,
    nestedLinks: [],
  },
];

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  [theme.breakpoints.down("sm")]: {
    width: `150px`,
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const PageLayout: FC<PageLayoutProps> = ({
  children,
  publicPage,
  ...rest
}): ReactElement => {
  const { t } = useTranslation();
  const { data: user } = useGetUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = React.useState(!smDown);

  const handleDrawer = () => setOpen((prev) => !prev);
  return (
    <Box width={1} sx={{ display: "flex" }}>
      {!publicPage && (
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
                rowGap: "6px",
              }}
            >
              <Typography variant="body2">{t("lastLogin")}</Typography>
              <Typography variant="body2">
                {getDisplayDateTime(user?.lastLogin)}
              </Typography>
            </Box>
          )}
        </Drawer>
      )}
      <Box
        width={1}
        sx={(t) => ({
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          [t.breakpoints.down("md")]: {
            width: publicPage ? "100%" : `calc(100% - 40px)`,
          },
        })}
      >
        <AppBar open={open} publicPage={publicPage} />
        {publicPage ? (
          <PublicPageWrapper {...rest}> {children}</PublicPageWrapper>
        ) : (
          <PageContentWrapper {...rest}> {children}</PageContentWrapper>
        )}
      </Box>
    </Box>
  );
};

export default PageLayout;
