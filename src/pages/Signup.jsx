import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useState } from "react";
//* components
import FormAlert from "../components/form/FormAlert";
import Input from "../components/form/Input";
import GoogleButton from "../components/form/GoogleButton";
import FormHeader from "../components/form/FormHeader";
import FormFooter from "../components/form/FormFooter";

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
            setSignupError(false);
            navigate("/");
        } catch(error) {
            console.error("Signup error: ", error.message);
            setSignupError(true);
        }
    }

    //* array containing all the props of that we will pass to the Input component
    const inputsProps = [
        {
            label: "Email",
            type: "email",
            id: "email"
        },
        {
            label: "Password",
            type: "password",
            id: "password"
        },
        {
            label: "Confirm password",
            type: "password",
            id: "confirmPassword"
        }
    ];

    const inputs = inputsProps.map( ({label, type, id}) => <Input key={id} label={label} type={type} id={id} register={register} errors={errors} /> );

    return (
        <div className="wrapper wrapper-width">

            <FormHeader title="Create Account" />

            <div className="form-wrapper">

                { signupError && <FormAlert /> }

                <GoogleButton title="Signup with Google" handleClick={signupWithGoogle} />

                <p className="or-line" >or</p>
                <form onSubmit={handleSubmit(createUser)} className="w-100">

                    { inputs }
                    
                    <input className="signup-btn" type="submit" value="Sign up" />
                </form>
            </div>
            <FormFooter title="Already have an account?" link="/login" linkTitle="Log in" />
        </div>
    )
}
