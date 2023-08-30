import { signInWithPopup } from "firebase/auth"
import { auth, googleAuth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import googleImg from '../img/google-logo.png'

export const Signup = () => {
    const navigate = useNavigate();

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleAuth);
        navigate('/');
    }

  return (
    <div className="wrapper">
        <div>
            <a href="/" className="logo-large">Pomoraf</a>
            <p className="grey-signup-text">Create Account</p>
        </div>
        <form className="form-wrapper">
            <div className="w-100 mb-3 mt-3"> 
                <button className="google-signup-btn" onClick={loginWithGoogle}>
                      <img className="google-logo" src={googleImg} alt="google logo" />
                    Login with Google
                </button>
            </div>
            <p className="or-line" >or</p>
            <div className="w-100 mt-3"> 
                <label className="form-label text-body-tertiary" htmlFor="email">Email</label>
                <input className="form-control mb-3" type="email" name="email" id="Email" placeholder="example@mail.com" />
            </div>
            <div className="w-100"> 
                <label className="form-label text-body-tertiary" htmlFor="password">Password</label>
                <input className="form-control mb-3" type="password" name="password" id="password" />
            </div>
            <div className="w-100"> 
                <label className="form-label text-body-tertiary" htmlFor="confirmPassword">Confirm your password</label>
                <input className="form-control mb-3" type="password" name="confirmPassword" id="confirmPassword" />
            </div>
            <input className="signup-btn" type="submit" value="Sign up" />
        </form>
    </div>
  )
}
