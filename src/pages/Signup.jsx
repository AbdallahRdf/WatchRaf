import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import googleImg from '../img/google-logo.png';

import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useState } from "react";

export const Signup = () => {

    const [signupError, setSignupError] = useState(false);

    const navigate = useNavigate();

    const signupWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuth);
            setSignupError(false);
            navigate('/');
        } catch (error) {
            console.error("Signup error: ", error.message);
            setSignupError(true);
        }
    }

    //* creating form schema for inputs validation using yup!
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Password must match')
    });

    const { register, handleSubmit, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    })

    const createUser = async () => {
        const {email, password} = getValues();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User signed up: ", user);
            setSignupError(false);
            navigate("/");
        } catch(error) {
            console.error("Signup error: ", error.message);
            setSignupError(true);
        }
    }


    return (
        <div className="wrapper wrapper-width">
            <div>
                <Link to="/" className="logo" >Pomoraf</Link>
                <p className="grey-signup-text mt-2">Create Account</p>
            </div>
            <div className="form-wrapper">
                {signupError &&
                    <div className="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">
                        <div>
                            An error occurred while signing up. Please try again later.
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                }
                <button className="google-signup-btn mb-3" onClick={signupWithGoogle}>
                    <img className="google-logo" src={googleImg} alt="google logo" />
                    Signup with Google
                </button>
                <p className="or-line" >or</p>
                <form onSubmit={handleSubmit(createUser)} className="w-100">
                    <div className="w-100 mt-2 mb-3">
                        <label className="form-label text-body-tertiary" htmlFor="email">Email</label>
                        <input
                            className="form-control mb-1"
                            type="email"
                            id="Email"
                            placeholder="example@mail.com"
                            {...register('email')}
                        />
                        <small className="text-danger">{errors.email?.message}</small>
                    </div>
                    <div className="w-100 mb-3">
                        <label className="form-label text-body-tertiary" htmlFor="password">Password</label>
                        <input
                            className="form-control mb-1"
                            type="password"
                            id="password"
                            {...register('password')}
                        />
                        <small className="text-danger">{errors.password?.message}</small>
                    </div>
                    <div className="w-100 mb-3">
                        <label className="form-label text-body-tertiary" htmlFor="confirmPassword">Confirm your password</label>
                        <input
                            className="form-control mb-1"
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword')}
                        />
                        <small className="text-danger">{errors.confirmPassword?.message}</small>
                    </div>
                    <input className="signup-btn" type="submit" value="Sign up" />
                </form>
            </div>
            <div className="mt-4 w-100 text-center">
                <p className="m-0 text-dark-emphasis">Already have an account?</p>
                <Link to="/login" className="text-black-50 fw-semibold" >Log in</Link>
            </div>
        </div>
    )
}
