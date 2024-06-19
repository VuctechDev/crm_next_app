"use client";
import {
  createTheme,
  CssBaseline,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ProviderProps {
  children: React.ReactNode;
}

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const sharedTheme: ThemeOptions = {
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
      fontSize: "14px",
    },
    body2: {
      color: "#787b80",
      fontSize: "0.75rem",
    },
  },
};

const lightTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#e07a5f",
    },
    secondary: {
      main: "#e07a5f",
    },
  },
});

const darkTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#e07a5f",
    },
    secondary: {
      main: "#e07a5f",
    },
  },
});

type ThemeContextType = {
  toggleTheme: () => void;
  theme: Theme;
  isDarkTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const Provider: FC<ProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );
  const toggleTheme = () => {
    if (!isDarkTheme) {
      window && window.localStorage.setItem("darkTheme", "true");
    } else {
      window && window.localStorage.removeItem("darkTheme");
    }
    setIsDarkTheme(!isDarkTheme);
  };

  const contextValue = useMemo(
    () => ({ toggleTheme, theme, isDarkTheme }),
    [theme]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkTheme(!!window.localStorage.getItem("darkTheme"));
    }
  }, []);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export default Provider;
