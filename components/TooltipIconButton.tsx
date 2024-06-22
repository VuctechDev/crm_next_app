import React, { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { IconButton, Tooltip } from "@mui/material";

interface TooltipIconButtonProps {
  icon: JSX.Element;
  title: string;
}

const TooltipIconButton: FC<TooltipIconButtonProps> = ({
  icon,
  title,
}): ReactElement => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t(title)} sx={{ mx: "2px" }}>
      <IconButton>{icon}</IconButton>
    </Tooltip>
  );
};

export default TooltipIconButton;
