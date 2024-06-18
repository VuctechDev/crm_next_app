import React, { FC, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Dialog, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import CircularProgress from "@mui/material/CircularProgress";

interface ConfirmationModalProps {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  title,
  message,
  children,
  onCancel,
  onConfirm,
}): ReactElement => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
      onCancel();
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Dialog open>
      <Box sx={{ p: "30px" }}>
        <Typography variant="h6">{t(title ?? "")}</Typography>
        {!!children && (
          <Box width={1} mt="32px">
            {children}
          </Box>
        )}

        <Box
          sx={{
            mt: "40px",
            minWidth: "320px",
            display: "flex",
            columnGap: "48px",
          }}
        >
          <Button onClick={onCancel} fullWidth disabled={loading}>
            {t("cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              "& circle": { color: "rgba(0,0,0,0.9)" },
            }}
          >
            {loading ? <CircularProgress size={22} /> : t("confirm")}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;
