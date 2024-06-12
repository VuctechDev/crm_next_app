import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const SECOND = 1000;

type Variant = "success" | "error" | "info" | "warning";

interface ISnackbarContext {
  openSnackbar: (
    message: string,
    variant?: Variant,
    icon?: React.ReactElement
  ) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<ISnackbarContext | null>(null);

interface ProviderProps {
  children: React.ReactElement;
}

interface ISnackbar {
  open: boolean;
  message: string;
  variant: Variant;
  duration: number;
  icon?: React.ReactElement;
}

export const SnackbarProvider = ({ children }: ProviderProps) => {
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    message: "",
    variant: "success",
    duration: 8,
    icon: undefined,
  });

  const openSnackbar = useCallback(
    (
      message: string,
      variant: Variant = "success",
      icon?: React.ReactElement
    ) => {
      let duration = 8;
      setSnackbar({ open: true, variant, message, duration, icon });
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(
    () => ({
      openSnackbar,
      closeSnackbar,
    }),
    [closeSnackbar, openSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={snackbar.open}
        autoHideDuration={snackbar.duration * SECOND}
        onClose={closeSnackbar}
      >
        <Alert
          sx={{ color: "#fff", display: "flex", alignItems: "center" }}
          icon={snackbar.icon}
          variant="filled"
          onClose={closeSnackbar}
          severity={snackbar.variant}
        >
          <Typography
            sx={(t) => ({
              // color: "#fff",
              fontSize: "16px",
            })}
          >
            {t(snackbar.message as string)}
          </Typography>
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === null) {
    throw new Error("useCategories must be used within a Category");
  }

  return context;
};
