import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { Trash, Pencil } from "lucide-react";

const Actions = ({ id }) => {
  const navigate = useNavigate();
  const remove = async () => {
    const { error } = await supabase
      .from("transacciones")
      .delete()
      .eq("id", id);
    if (!error) {
      return navigate(0);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <button type="button" onClick={() => navigate(`/edit/${id}`)}>
        <Pencil />
      </button>
      <button type="button" onClick={remove}>
        <Trash />
      </button>
    </form>
  );
};

export default Actions;
