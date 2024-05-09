import { CirclePlus, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "../context/useUser"


const Header = () => {
  const user = useUser((state) => state.user)
  const logout = useUser((state) => state.logout)

  return <header>
  <h1>App Name</h1>
  <nav>
    {user && <Link to="/create"><CirclePlus /></Link>}
    {!user && <Link to="/login"><LogIn /></Link>}
    {user && <button type="button" onClick={logout}><LogOut /></button>}
  </nav>
  </header>;
};

export default Header;
