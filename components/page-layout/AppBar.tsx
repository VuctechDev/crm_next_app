import React, { FC, ReactElement } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import ThemeToggle from "../ThemeToggle";
import LanguageSelect from "../LanguageSelect";
import AccountMenu from "../AccountMenu";
import { useGetUser } from "@/lib/client/api/user/queries";

interface AppBarProps {}

const AppBar: FC<AppBarProps> = ({}): ReactElement => {
  const { data: user } = useGetUser();
  const { t } = useTranslation();
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
      })}
    >
      <LanguageSelect />
      <ThemeToggle />
      {user && <AccountMenu />}
    </Box>
  );
};

export default AppBar;
