import { CirclePlus, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "../context/useUser";
import supabase from "../supabase";


const Header = () => {
  const user = useUser((state) => state.user)
  const logout = useUser((state) => state.logout)

  const click = async () => {
    await supabase.auth.signOut()
    logout()
  }

  return <header>
  <h1>App Name</h1>
  <nav>
    {user && <Link to="/create"><CirclePlus /></Link>}
    {!user && <Link to="/login"><LogIn /></Link>}
    {user && <button type="button" onClick={click}><LogOut /></button>}
  </nav>
  </header>;
};

export default Header;
