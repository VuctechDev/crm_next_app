import React, {
  FC,
  ReactElement,
  createContext,
  useReducer,
  useMemo,
  useContext,
} from "react";
import AuthGuard from "./guards/AuthGuard";

export interface Action {
  type: string;
  payload?: any;
}

type User = {
  username: string;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string;
  dispatch: React.Dispatch<Action>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: "",
  dispatch: () => null,
};

const AuthContext = createContext<AuthState>(initialState);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useContext must be used within a Context");
  }

  return context;
};

const authReducer = (state: AuthState, action: Action): AuthState => {
  const { type, payload } = action;
  if (type === "initial") {
    return { ...state, ...payload };
  } else if (type === "logOut") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      accessToken: "",
    };
  }
  return state;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}): ReactElement => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  return (
    <AuthContext.Provider value={value}>
      <AuthGuard>{children}</AuthGuard>
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
