import { createRef, useEffect, useRef, useState } from "react";
import ErrorSvg from "../assets/icons/ErrorSvg";
import EyeIcon from "../assets/icons/EyeIcon";
import ArrowIcon from "../assets/icons/ArrowIcon";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { useAuth } from "./contexts/AuthContext";
import { updateProfile, UserCredential } from "firebase/auth";
import placeholder from "../assets/media/images/placeholderImage.png";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({
    pwd: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isNameValid, setIsValidName] = useState<{
    first?: boolean;
    last?: boolean;
  }>();

  const nameRef = useRef<boolean>(false);
  useEffect(() => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ']{3,50}\s*?$/;
    const testNameRegex = (name: string | undefined) => {
      if (!name) return false;
      return nameRegex.test(name);
    };

    if (nameRef.current) {
      const validFirstName = testNameRegex(form.firstName);
      const validLastName = testNameRegex(form.lastName);

      setIsValidName((prev) => ({
        ...prev,
        first: validFirstName,
        last: validLastName,
      }));
    }

    return () => {
      nameRef.current = true;
    };
  }, [form.firstName, form.lastName]);

  /* Email */
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const emailUseEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailUseEffectRef.current) {
      const isValid = emailRegex.test(form.email);
      setValidEmail(isValid);
    }

    return () => {
      emailUseEffectRef.current = true;
    };
  }, [form.email]);

  /* Password */
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const pwdUseEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const testPwrRegex = (pwd: string | undefined) => {
      if (!pwd) return false;
      return pwdRegex.test(pwd);
    };

    if (pwdUseEffectRef.current && form.pwd) {
      const validPwd = testPwrRegex(form.pwd);
      setValidPwd(validPwd);
    }

    return () => {
      pwdUseEffectRef.current = true;
    };
  }, [form.pwd]);

  const [viewPwd, setViewPwd] = useState<boolean>(false);
  const toggleViewPwd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setViewPwd(!viewPwd);
  };

  /* Create User */
  const navigate = useNavigate();
  const { signUp, googleSignIn } = useAuth();
  const submitButton = createRef<HTMLButtonElement>();
  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    submitButton.current?.classList.add("animate-button");

    try {
      const userCreds: UserCredential | void = await signUp(form.email, form.pwd);
      await setUserInfo(userCreds);
      navigate("/");
    } catch (error) {
      setError("Something went wrong, please try again");
    }
  };

  const setUserInfo = async (userCreds: UserCredential | void) => {
    if (!userCreds || !userCreds?.user) return;
    try {
      await updateProfile(userCreds.user, {
        displayName: form.firstName + " " + form.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signUpWithGoogle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCreds: UserCredential | void = await googleSignIn();
      await setUserInfo(userCreds);
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
            <h2>Sign up</h2>
            <p>Please fill the details below</p>
          </div>
          {error && (
            <div className="error-message flex cg-5">
              <ErrorSvg size={iconSize} />
              <p>{error}</p>
            </div>
          )}

          <button className="google-button flex cg-10 jc-c" onClick={(e) => signUpWithGoogle(e)}>
            <GoogleIcon size={18} />
            <p>Sign up with Gooogle</p>
          </button>
          <div className="line-con">
            <div className="line"></div>
            <p>Or</p>
          </div>

          <div className="name">
            <div className="box">
              <label htmlFor="firstname">
                <p>First Name</p>
                <input
                  type="text"
                  value={form.firstName}
                  className={
                    form.firstName && !isNameValid?.first ? "invalid-input" : isNameValid?.first ? "valid-input" : ""
                  }
                  required
                  onChange={(e) => setForm({ ...form, firstName: e.currentTarget.value })}
                  id="firstname"
                  placeholder="your first name"
                />
              </label>
              {form.firstName && !isNameValid?.first && (
                <div className="error-message flex cg-5">
                  <ErrorSvg size={iconSize} />
                  <p>at least 3 characters</p>
                </div>
              )}
            </div>

            <div className="box">
              <label htmlFor="lastname">
                <p>Last Name</p>
                <input
                  type="text"
                  value={form.lastName}
                  className={
                    form.lastName && !isNameValid?.last ? "invalid-input" : isNameValid?.last ? "valid-input" : ""
                  }
                  required
                  onChange={(e) => setForm({ ...form, lastName: e.currentTarget.value })}
                  id="lastname"
                  placeholder="your last name"
                />
              </label>
              {form.lastName && !isNameValid?.last && (
                <div className="error-message flex cg-5">
                  <ErrorSvg size={iconSize} />
                  <p>at least 3 characters</p>
                </div>
              )}
            </div>
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
              placeholder="your email"
            />
            {form.email && !validEmail && (
              <div className="error-message flex cg-5">
                <ErrorSvg size={iconSize} />
                <p>invalid email address</p>
              </div>
            )}
          </label>

          <div className="password">
            <label htmlFor="password">
              <p>Password</p>
              <div className="password-con">
                <input
                  type={viewPwd ? "text" : "password"}
                  id="password"
                  className={form.pwd && !validPwd ? "invalid-input" : validPwd ? "valid-input" : ""}
                  value={form.pwd}
                  required
                  onChange={(e) => {
                    setForm({ ...form, pwd: e.currentTarget.value });
                  }}
                  placeholder="create password"
                  autoComplete="false"
                  autoCorrect="false"
                />
                <button className="hide-view-icon" onClick={(e) => toggleViewPwd(e)}>
                  <EyeIcon display={viewPwd} />
                </button>
              </div>
              {form.pwd && !validPwd && (
                <div className="error-message flex cg-5">
                  {/* <ErrorSvg size={iconSize} /> */}
                  <ol>
                    <li>At least 8 characters</li>
                    <li>Upper and lowercase letter</li>
                    <li>Special character (e.g @, $)</li>
                    <li>Number</li>
                  </ol>
                </div>
              )}
            </label>
          </div>

          <button
            ref={submitButton}
            className={"submit-form flex cg-10 jc-c"}
            data-disable={(form.email && form.firstName && form.lastName && form.pwd) || false}
            onClick={(e) => submitForm(e)}>
            <p>Create Account</p>
            <div className="arrow">
              {" "}
              <ArrowIcon size={18} color="#FAF9f6" />{" "}
            </div>
          </button>
          <div className="login-prompt">
            <p>
              Already got an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
