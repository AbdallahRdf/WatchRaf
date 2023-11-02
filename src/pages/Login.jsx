import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import googleImg from '../assets/img/google-logo.png';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useState } from "react";

import FormAlert from "../components/form/FormAlert";
import Input from "../components/form/Input";

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
            <div>
                <Link to="/" className="logo" >Pomoraf</Link>
                <p className="grey-signup-text mt-2">Login</p>
            </div>
            <div className="form-wrapper">

                {loginError && <FormAlert /> }

                <button className="google-signup-btn  mb-3" onClick={loginWithGoogle}>
                    <img className="google-logo" src={googleImg} alt="google logo" />
                    Login with Google
                </button>
                <p className="or-line" >or</p>
                <form onSubmit={handleSubmit(loginUser)} className="w-100">

                    { inputs }

                    <input className="signup-btn" type="submit" value="Log in with email" />
                </form>
            </div>
            <div className="mt-4 w-100 text-center">
                <p className="m-0 text-dark-emphasis">Do not have an account?</p>
                <Link to="/signup" className="text-black-50 fw-semibold" >Create account</Link>
            </div>
        </div>
    )
}
