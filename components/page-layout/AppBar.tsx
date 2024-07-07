import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import ThemeToggle from "../ThemeToggle";
import LanguageSelect from "../LanguageSelect";
import AccountMenu from "../AccountMenu";
import { useGetUser } from "@/lib/client/api/user/queries";

interface AppBarProps {
  open?: boolean;
}

const AppBar: FC<AppBarProps> = ({ open }): ReactElement => {
  const { data: user } = useGetUser();
  const screenWidth = window?.screen?.width ?? 360;
  const width = open ? `${screenWidth - 150}` : `${screenWidth - 40}`;
  return (
    <Box
      width={1}
      sx={(t) => ({
        height: "70px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        pr: "20px",
        columnGap: "20px",
        [t.breakpoints.down("md")]: {
          justifyContent: "space-around",
          pr: "0px",
          columnGap: "0px",
          height: "50px",
          width: `${width}px`,
          transition: "all 0.2s",
        },
      })}
    >
      <LanguageSelect />
      <ThemeToggle />
      {user && <AccountMenu />}
    </Box>
  );
};

export default AppBar;
