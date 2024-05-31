"use client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FC } from "react";

interface ProviderProps {
  children: React.ReactNode;
}

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    // mode: "light",
    mode: "dark",
    background: {
      // default: "#E5E4E2",
    },
    primary: {
      main: "#e07a5f",
    },
    secondary: {
      main: "#e07a5f",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          color: "#fff",
          zIndex: 50000,
        },
      },
    },
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        text: {
          textTransform: "capitalize",
        },
        root: {
          // fontSize: "0.75rem",
          // color: "#fff",
          // zIndex: 50000,
          borderRadius: "10px",
          textTransform: "capitalize",
          fontSize: "14px",
        },
      },
    },
  },

  typography: {
    fontFamily: jakarta.style.fontFamily,
    h2: {
      fontSize: "28px",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
    },
    body1: {
      // color: "#c9c8c7",
      fontSize: "14px",
    },
    body2: {
      color: "#787b80",
      fontSize: "0.7rem",
    },
  },
});

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Provider;
