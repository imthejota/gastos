import { useEffect } from "react";
import { useState } from "react";
import supabase from "../supabase";


const List = () => {
    const [records, setRecords] = useState();
    
    useEffect(() => {
        const all = async () => {
            const { data, error } = await supabase.from("transacciones").select();
            setRecords(data)
        };
        all()
    }, []);

    return <>
    <h2>List</h2>
    <p>{!records? "No hay nada para ver": "Aquí tienes la lista"}</p>
    </>;
};

export default List;
