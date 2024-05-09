import React from "react";
import { useForm } from "react-hook-form";
import useUser from "../context/useUser";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const form = useForm()
  const {errors, isSubmitting} = form.formState
  const login = useUser((state) => state.login)
  
  const navigate = useNavigate()

  const onSubmit = (data) => {
    //marvelous authentication 
    login({
      mail: "jkechian@gmail.com",
      isAdmin: true
    }),
    navigate("/")
  }


  return <>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <fieldset>
      <input type="email" name="mail" id="" />
      <input type="password" name="password" id="" />
    </fieldset>
    <button>Log In</button>
    </form></>;
};

export default Login;
