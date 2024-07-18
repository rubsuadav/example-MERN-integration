import {
  createContext,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from "react";

// Define el tipo para el valor del contexto
type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
  admin: boolean;
  authorized: boolean;
  owner: boolean;
  customer: boolean;
};

// Crea el contexto con el tipo correcto y un valor predeterminado adecuado
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  admin: false,
  authorized: false,
  owner: false,
  customer: false,
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("access_token")
  );

  const [role, setRole] = useState<{
    admin: boolean;
    authorized: boolean;
    owner: boolean;
    customer: boolean;
  }>(
    JSON.parse(
      localStorage.getItem("role") ??
        JSON.stringify({
          admin: false,
          authorized: false,
          owner: false,
          customer: false,
        })
    )
  );

  const { admin, authorized, owner, customer } = role;

  const login = useCallback((token: string, role: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("role", role);
    setRole(JSON.parse(role));
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("sessionId");
    setRole({
      admin: false,
      authorized: false,
      owner: false,
      customer: false,
    });
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      admin,
      authorized,
      owner,
      customer,
    }),
    [isAuthenticated, login, logout, admin, authorized, owner, customer]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
