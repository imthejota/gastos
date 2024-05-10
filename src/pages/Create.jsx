import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const Create = () => {
    const form = useForm();
    const { errors, isSubmitting } = form.formState;
    const navigate = useNavigate();

    const onSubmit = async (dato) => {
        const { error } = await supabase
            .from('transacciones')
            .insert({ ...dato });

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
                    >
                      <option value="sueldo">Sueldo</option>
                      <option value="ingresosVarios">Ingresos varios</option>
                        <option value="alquiler">Alquiler</option>
                        <option value="gastosGenerales">
                            Gastos generales
                        </option>
                        <option value="comida">Comida</option>
                        <option value="mascotas">Mascotas</option>
                    </select>
                    {errors && errors.categoria && (
                        <output>{errors.categoria.message}</output>
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
