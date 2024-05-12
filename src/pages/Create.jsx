import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { useEffect } from "react";

const Create = () => {
    const form = useForm();
    const { errors, isSubmitting } = form.formState;
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

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

    const onSubmit = async (formulario) => {
        let datos = { ...formulario };
        if (datos.categoria == "otra") {
            datos.categoria = datos.otra.toLowerCase();
            delete datos.otra;
        }
        const { error } = await supabase.from("transacciones").insert(datos);

        if (error) {
            form.setError("server", {
                type: "custom",
                message: "Error en el login",
            });
        }

        navigate("/");
    };
    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset>
                    <label htmlFor="tipo">Tipo</label>
                    <select
                        id="tipo"
                        {...form.register("tipo", {
                            required: {
                                value: true,
                                message: "Complete el tipo",
                            },
                        })}
                    >
                        <option value="ingreso">Ingreso</option>
                        <option value="egreso">Egreso</option>
                    </select>
                    {errors && errors.tipo && (
                        <output>{errors.tipo.message}</output>
                    )}
                </fieldset>
                <fieldset>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        {...form.register("nombre", {
                            required: {
                                value: true,
                                message: "Complete el nombre",
                            },
                        })}
                    />
                    {errors && errors.nombre && (
                        <output>{errors.nombre.message}</output>
                    )}
                </fieldset>
                <fieldset>
                    <label htmlFor="categoria">Categoría</label>
                    <select
                        id="categoria"
                        {...form.register("categoria", {
                            required: {
                                value: true,
                                message: "Complete la categoria",
                            },
                        })}
                        defaultValue={categories[0]}
                    >
                        {categories.length > 0 &&
                            categories.map((c, i) => (
                                <option key={i} value={c}>
                                    {c}
                                </option>
                            ))}
                        <option value="otra">Otra</option>
                    </select>

                    {form.watch("categoria") == "otra" && (
                        <input
                            id="otra"
                            type="text"
                            placeholder="Ingresar nueva"
                            {...form.register("otra", {
                                required: {
                                    value: true,
                                    message: "Complete la categoria",
                                },
                            })}
                        />
                    )}
                    {errors && errors.categoria && (
                        <output>{errors.categoria.message}</output>
                    )}
                    {errors && errors.categoria && (
                        <output>{errors.otra.message}</output>
                    )}
                </fieldset>
                <fieldset>
                    <label htmlFor="valor">Valor</label>
                    <input
                        type="number"
                        id="valor"
                        min={1}
                        {...form.register("valor", {
                            required: {
                                value: true,
                                message: "Complete el valor",
                            },
                            min: {
                                value: 1,
                                message: "Valor mínimo $1",
                            },
                        })}
                    />
                    {errors && errors.valor && (
                        <output>{errors.valor.message}</output>
                    )}
                </fieldset>
                <button>Submit</button>
            </form>
        </>
    );
};

export default Create;
