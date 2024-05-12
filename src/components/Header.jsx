import { CirclePlus, LogIn, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "../context/useUser";
import supabase from "../supabase";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const user = useUser((state) => state.user);
    const logout = useUser((state) => state.logout);
    const navigate = useNavigate()
    const click = async () => {
        await supabase.auth.signOut();
        logout();
    };

    return (
        <header>
            <h1 onClick={() => navigate("/")}>App Name</h1>
            <nav>
                {user && (
                    <Link to="/create">
                        <CirclePlus />
                    </Link>
                )}
                {!user && (
                    <Link to="/login">
                        <LogIn />
                    </Link>
                )}
                {user && (
                    <button type="button" onClick={click}>
                        <LogOut />
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
