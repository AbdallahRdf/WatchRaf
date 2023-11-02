import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useState } from "react";
//* components
import FormAlert from "../components/form/FormAlert";
import Input from "../components/form/Input";
import GoogleButton from "../components/form/GoogleButton";
import FormHeader from "../components/form/FormHeader";
import FormFooter from "../components/form/FormFooter";

export const Login = () => {

    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuth);
            setLoginError(false);
            navigate('/');
        } catch (error) {
            console.error("logging in error: ", error.message);
            setLoginError(true);
        }
    }

    //* creating form schema for inputs validation using yup!
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup
            .string()
            .required("Password is required"),
        });

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    })

    const loginUser = async () => {
        const { email, password } = getValues();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up: ", user);
            setLoginError(false);
            navigate("/");
        } catch (error) {
            console.error("Logging in error: ", error.message);
            setLoginError(true);
        }
    }

    //* array containing all the props of that we will pass to the Input component;
    //* NB: the type and the id are the same
    const inputsProps = [
        {
            label: "Email",
            id: "email"
        },
        {
            label: "Password",
            id: "password"
        }
    ];

    const inputs = inputsProps.map(({ label, id }) => <Input key={id} label={label} type={id} id={id} register={register} errors={errors} />);

    return (
        <div className="wrapper wrapper-width">

            <FormHeader title="Login" />

            <div className="form-wrapper">

                {loginError && <FormAlert /> }

                <GoogleButton title="Login with Google" handleClick={loginWithGoogle} />

                <p className="or-line" >or</p>
                <form onSubmit={handleSubmit(loginUser)} className="w-100">

                    { inputs }

                    <input className="signup-btn" type="submit" value="Log in with email" />
                </form>
            </div>
            <FormFooter title="Do not have an account?" link="/signup" linkTitle="Create account" />
        </div>
    )
}
