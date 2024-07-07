import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import ThemeToggle from "../ThemeToggle";
import LanguageSelect from "../LanguageSelect";
import AccountMenu from "../AccountMenu";
import { useGetUser } from "@/lib/client/api/user/queries";

interface AppBarProps {
  open: boolean;
  publicPage?: boolean;
}

const AppBar: FC<AppBarProps> = ({ open, publicPage }): ReactElement => {
  const { data: user } = useGetUser();
  const screenWidth = window?.screen?.width ?? 360;
  const width = open ? `${screenWidth - 150}` : `${screenWidth - 40}`;

  const mdDownStyle = publicPage
    ? { justifyContent: "flex-end" }
    : {
        justifyContent: "space-around",
        pr: "0px",
        columnGap: "0px",
        height: "50px",
        width: `${width}px`,
        transition: "all 0.2s",
      };
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
          ...mdDownStyle,
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
