import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"
import axiosInstance from "../../lib/axios";

const authContext = createContext();
function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axiosInstance.get('/api/auth/verify',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (res.data.success) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.log(error)
      }
    }
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  }
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  }


  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext);
export default ContextProvider