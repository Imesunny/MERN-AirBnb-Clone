import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  // console.log(children)
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      (async () => {
        try {
          const response = await axios.get("/profile");
          const userData = response.data;
          console.log(userData);
          setUser(userData); //to maintain the profile name throught the website
          setReady(true);
        } catch (error) {
          console.error("Error fetching user profile:", error.message);
        }
      })();
    }
  }, [user]);
  
  return (
    <UserContext.Provider value={{ user, setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}
