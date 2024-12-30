import { createContext, useState } from "react";

export const ClickCountContext = createContext({
  clickCount: 0,
  setClickCount: (value: number) => {},
  userName: "",
  setuserName: (value: string) => {},
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  userEmail: "",
  setUserEmail: (value: string) => {},
  userPassword: "",
  setUserPassword: (value: string) => {},
});

const ClickCountProvider = ({ children }: { children: any }) => {
  const [clickCount, setClickCount] = useState(0);
  const [userName, setuserName] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  return (
    <ClickCountContext.Provider
      value={{
        clickCount,
        setClickCount,
        userName,
        setuserName,
        isAuthenticated,
        setIsAuthenticated,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
      }}
    >
      {children}
    </ClickCountContext.Provider>
  );
};

export default ClickCountProvider;
