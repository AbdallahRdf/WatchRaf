import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import googleImg from '../img/google-logo.png';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useState } from "react";

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


    return (
        <div className="wrapper wrapper-width">
            <div>
                <a href="/" className="logo-large">Pomoraf</a>
                <p className="grey-signup-text">Login</p>
            </div>
            <div className="form-wrapper">
                {loginError &&
                    <div className="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">
                        <div>
                            An error occurred while Logging in. Please try again later.
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
                <button className="google-signup-btn" onClick={loginWithGoogle}>
                    <img className="google-logo" src={googleImg} alt="google logo" />
                    Login with Google
                </button>
                <p className="or-line" >or</p>
                <form onSubmit={handleSubmit(loginUser)} className="w-100">
                    <div className="w-100 mt-3">
                        <label className="form-label text-body-tertiary" htmlFor="email">Email</label>
                        <input
                            className="form-control mb-3"
                            type="email"
                            id="Email"
                            placeholder="example@mail.com"
                            {...register('email')}
                        />
                        <small className="text-danger">{errors.email?.message}</small>
                    </div>
                    <div className="w-100">
                        <label className="form-label text-body-tertiary" htmlFor="password">Password</label>
                        <input
                            className="form-control mb-3"
                            type="password"
                            id="password"
                            {...register('password')}
                        />
                        <small className="text-danger">{errors.password?.message}</small>
                    </div>
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
