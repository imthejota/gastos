import React from "react";
import { useForm } from "react-hook-form";
import useUser from "../context/useUser";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";


const Login = () => {
    const form = useForm();
    const { errors, isSubmitting } = form.formState;
    const login = useUser((state) => state.login);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        //marvelous authentication
        login({
            mail: "jkechian@gmail.com",
            isAdmin: true,
        }),
            navigate("/");
    };

    const [isVisible, setVisible] = useState(false)
    

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset>
                    <input
                        type="text"
                        name="mail"
                        id=""
                        {...form.register("mail", {
                            required: {
                                value: true,
                                message: "Complete mail field",
                            },
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "This should be a mail address",
                            },
                        })}
                    />
                    {errors && errors.mail && <output>{errors.mail.message}</output>}
                    </fieldset>
                    <fieldset>
                    <input
                        type={!isVisible? "password": "text"}
                        name="password"
                        id=""
                        {...form.register("password", {
                            required: {
                                value: true,
                                message: "Complete with your password",
                            },
                            minLength: {value: 8,
                              message: "Minimum 8 characters"
                            },
                            pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                message:
                                    "1 uppercase, 1 lowercase, 1 number, 1 special character",
                            },
                        })}
                    />
                    <button onClick={() => setVisible(!isVisible)}>
                    {!isVisible && <Eye />}
                    {isVisible && <EyeOff />}
                    </button>
                    {errors && errors.password && <output>{errors.password.message}</output>}
                    </fieldset>
                <button>Log In</button>
            </form>
        </>
    );
};

export default Login;
