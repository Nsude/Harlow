import {  createRef, useEffect, useRef, useState } from "react";
import ErrorSvg from "../assets/icons/ErrorSvg";
import EyeIcon from "../assets/icons/EyeIcon";
import ArrowIcon from "../assets/icons/ArrowIcon";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { useAuth } from "./contexts/AuthContext";
import { UserCredential } from "firebase/auth";
import Logo from "../assets/icons/Logo";


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  /* Email */
  const [email, setEmail] = useState<string>(''); 
  const [validEmail, setValidEmail] = useState<boolean>(false);
  
  const emailUseEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailUseEffectRef.current) {
      const valid = emailRegex.test(email);
      setValidEmail(valid);
    }

    return () => {emailUseEffectRef.current = true};
  }, [email]);

  /* Password */
  const [pwd, setPwd] = useState<string>('');

  const [viewPwd, setViewPwd] = useState<boolean>(false);
  const toggleViewPwd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setViewPwd(!viewPwd);
  }

  const submitButton = createRef<HTMLButtonElement>();
  const { login, googleSignIn } = useAuth();
  const submitForm = async (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setError("");
    submitButton.current?.classList.add("animate-button");
    try {
      await login(email, pwd);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
    }
  }

  const loginWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError("Authentication failed, please try again");
    }
  }

  const iconSize = 16;
  return (
    <div className="form-container flex jc-c">
      <div className="side-image">
        <Logo color="#FAF9F6" />
      </div>
      <div className="wrap-form">
        <form className="auth-form">
          <div className="form-intro">
            <h2>Login</h2>
            <p>Welcome back, please enter your details</p>
          </div>
          {
            error && (
              <div className="error-message flex cg-5">
                <ErrorSvg size={iconSize} />
                <p>{error}</p>
              </div>
            )
          }
          <button className="google-button flex cg-10 jc-c" onClick={(e) => loginWithGoogle(e)}>
            <GoogleIcon size={18} />
            <p>Login with Gooogle</p>
          </button>

          <div className="line-con">
            <div className="line"></div>
            <p>Or</p>
          </div>

          <label htmlFor="email">
            <p>Email</p>
            <input 
              type="text" 
              id="email" 
              className={email && !validEmail ? "invalid-input" : validEmail ? "valid-input" : ""}
              required
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              placeholder="enter email" />
              {
                email && !validEmail && (
                  <div className="error-message flex cg-5">
                    <ErrorSvg size={iconSize} />
                    <p>invalid email address</p>
                  </div>
                )  
              }
          </label>

          <label htmlFor="password">
            <p>Password</p>
            <div className="password-con">
              <input 
                type={viewPwd ? "text" : "password"} 
                id="password"
                className={pwd ? "valid-input" : ""} 
                value={pwd}
                required
                onChange={(e) => {setPwd(e.target.value)}}
                placeholder="enter password" 
                autoComplete="false" 
                autoCorrect="false" />
              <button className="hide-view-icon" onClick={(e) => toggleViewPwd(e)}>  
                <EyeIcon display={viewPwd} />
              </button>
            </div>
          </label>

          <button ref={submitButton} className="submit-form flex cg-10 jc-c" data-disable={(pwd && validEmail) || false} onClick={(e) => submitForm(e)}>
            <p>Login</p>
            <div className="arrow"> <ArrowIcon size={18} color="#FAF9f6" /> </div> 
          </button>
          <div className="login-prompt">
            <p>Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;