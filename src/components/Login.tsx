import { createRef, useEffect, useRef, useState } from "react";
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
  const [form, setForm] = useState({
    email: "",
    pwd: "",
  });
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const emailUseEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailUseEffectRef.current) {
      const valid = emailRegex.test(form.email);
      setValidEmail(valid);
    }

    return () => {
      emailUseEffectRef.current = true;
    };
  }, [form.email]);

  /* Password */
  const [viewPwd, setViewPwd] = useState<boolean>(false);
  const toggleViewPwd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setViewPwd(!viewPwd);
  };

  const submitButton = createRef<HTMLButtonElement>();
  const { login, googleSignIn } = useAuth();
  const submitForm = async (e: React.MouseEvent | React.TouchEvent) => {
    if (!form.pwd || !form.pwd) return;
    e.preventDefault();
    setError("");
    submitButton.current?.classList.add("animate-button");
    try {
      await login(form.email, form.pwd);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const loginWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError("Authentication failed, please try again");
    }
  };

  const iconSize = 16;
  return (
    <div className="form-container flex jc-c">
      <div className="wrap-form">
        <form className="auth-form">
          <div className="form-intro flex fd-c">
            <h2>Login</h2>
            <p>Welcome back, please enter your details</p>
          </div>
          {error && (
            <div className="error-message flex cg-5">
              <ErrorSvg size={iconSize} />
              <p>{error}</p>
            </div>
          )}
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
              className={form.email && !validEmail ? "invalid-input" : validEmail ? "valid-input" : ""}
              required
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.currentTarget.value });
              }}
              placeholder="enter email"
            />
            {form.email && !validEmail && (
              <div className="error-message flex cg-5">
                <ErrorSvg size={iconSize} />
                <p>invalid email address</p>
              </div>
            )}
          </label>

          <label htmlFor="password">
            <p>Password</p>
            <div className="password-con">
              <input
                type={viewPwd ? "text" : "password"}
                id="password"
                className={form.pwd ? "valid-input" : ""}
                value={form.pwd}
                required
                onChange={(e) => {
                  setForm({ ...form, pwd: e.currentTarget.value });
                }}
                placeholder="enter password"
                autoComplete="false"
                autoCorrect="false"
              />
              <button className="hide-view-icon" onClick={(e) => toggleViewPwd(e)}>
                <EyeIcon display={viewPwd} />
              </button>
            </div>
          </label>

          <button
            ref={submitButton}
            className="submit-form flex cg-10 jc-c"
            data-disable={(form.pwd && validEmail) || false}
            onClick={(e) => submitForm(e)}>
            <p>Login</p>
            <div className="arrow">
              {" "}
              <ArrowIcon size={18} color="#FAF9f6" />{" "}
            </div>
          </button>
          <div className="login-prompt">
            <p>
              Don't have an account? <Link to={"/sign-up"}>Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
