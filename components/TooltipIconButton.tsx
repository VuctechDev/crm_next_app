import React, { FC, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { IconButton, Tooltip } from "@mui/material";

interface TooltipIconButtonProps {
  icon: JSX.Element;
  title: string;
  disabledMessage?: string;
  onClick?: () => void;
}

const TooltipIconButton: FC<TooltipIconButtonProps> = ({
  icon,
  title,
  disabledMessage,
  onClick,
}): ReactElement => {
  const { t } = useTranslation();
  return (
    <Tooltip
      title={disabledMessage ? t(disabledMessage) : t(title)}
      sx={{ mx: "2px", cursor: "pointer" }}
    >
      <span>
        <IconButton
          onClick={onClick}
          sx={{ cursor: "pointer", zIndex: 1000 }}
          disabled={!!disabledMessage}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default TooltipIconButton;
