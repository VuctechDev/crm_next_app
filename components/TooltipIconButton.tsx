import React, { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { IconButton, Tooltip } from "@mui/material";

interface TooltipIconButtonProps {
  icon: JSX.Element;
  title: string;
  onClick?: () => void;
}

const TooltipIconButton: FC<TooltipIconButtonProps> = ({
  icon,
  title,
  onClick,
}): ReactElement => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t(title)} sx={{ mx: "2px", cursor: "pointer" }}>
      <IconButton onClick={onClick} sx={{ cursor: "pointer", zIndex: 1000 }}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default TooltipIconButton;
