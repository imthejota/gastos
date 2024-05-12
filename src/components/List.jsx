import { useEffect } from "react";
import { useState } from "react";
import supabase from "../supabase";
import Item from "./Item";
import useFilter from "../context/useFilter";

const List = ({ tipo }) => {
    const [records, setRecords] = useState([]);
    const category = useFilter((state) => state.category)

    useEffect(() => {
        const all = async () => {
            let query = supabase.from("transacciones").select();
            let { data, error } = await query;
            if (tipo) {
                data = data.filter((e) => e.tipo.toLowerCase() === tipo);
            }
            if (category != null && category != "all") {
                data = data.filter(
                    (e) => e.categoria.toLowerCase() === category.toLowerCase()
                );
            }
            setRecords(data);
        };
        all();
    }, [category]);


    return (
        <>
            <h2>{`${tipo.toUpperCase()}S`}</h2>
            {(!records || records.length == 0) && (
                <p>{"No hay nada para ver"}</p>
            )}
        
            {records.length > 0 && (
                <ul>
                    {records.map((record) => (
                        <Item key={record.id} {...record} />
                    ))}
                </ul>
            )}
        </>
    );
};

export default List;
