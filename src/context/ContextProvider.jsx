import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react"

const authContext = createContext();
function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/auth/verify',{
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