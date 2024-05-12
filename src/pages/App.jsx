import { useState } from "react";
import List from "../components/List";
import useFilter from "../context/useFilter";
import { useEffect } from "react";
import supabase from "../supabase";


const App = () => {

    const [categories, setCategories] = useState([]);
    const setCategory = useFilter((state) => state.setCategory)

    
    useEffect(() => {
      const getCategories = async () => {
          const { data, error } = await supabase
              .from("transacciones")
              .select("categoria");
          if (data) {
              let categories = [
                  ...new Set(data.map((c) => c.categoria.toLowerCase())),
              ];
              setCategories(categories);
          }
      };
      getCategories();
  }, []);
  return (
    <>
    {categories.length > 0 && (
                <form onSubmit={(e) => e.preventDefault()}>
                    <select defaultValue={"all"} id="categoria" onChange={(e) => setCategory(e.target.value)} >
                      <option value="all" >All</option>
                        {categories.length > 0 &&
                            categories.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                    </select>
                </form>
            )}
      <List tipo={"ingreso"} />
      <List tipo={"egreso"} />
    </>
  );
};

export default App;
