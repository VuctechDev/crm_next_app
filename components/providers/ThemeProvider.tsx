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
          minHeight: "40px",
          borderRadius: "10px",
          textTransform: "capitalize",
          fontSize: "16px",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        root: {
          borderRadius: "10px",
          fontSize: "16px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          fontSize: "14px",
          paddingTop: "6.5px",
          paddingBottom: "6.5px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "0px",
        },
        input: {
          padding: "14px",
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
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.15rem",
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
      fontSize: "0.75rem",
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
