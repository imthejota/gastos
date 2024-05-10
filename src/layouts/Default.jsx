import { Outlet } from "react-router-dom";
import Header from "../components/Header"
import useUser from "../context/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Default = () => {
  const user = useUser((state) => state.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!user) {
      navigate("/login")
    }
  },[])
  return <>
  <Header />
  <Outlet />
  </>;
};

export default Default;
