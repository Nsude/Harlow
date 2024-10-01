import { createRef, useEffect, useRef, useState } from "react";
import ErrorSvg from "../assets/icons/ErrorSvg";
import EyeIcon from "../assets/icons/EyeIcon";
import ArrowIcon from "../assets/icons/ArrowIcon";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { useAuth } from "./contexts/AuthContext";
import { updateProfile, UserCredential } from "firebase/auth";
import Logo from "../assets/icons/Logo";
import underwaterVD from "../assets/media/underwater.mp4";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  /* Name */
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
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
      const validFirstName = testNameRegex(firstName);
      const validLastName = testNameRegex(lastName);

      setIsValidName((prev) => ({
        ...prev,
        first: validFirstName,
        last: validLastName,
      }));
    }

    return () => {
      nameRef.current = true;
    };
  }, [firstName, lastName]);

  /* Email */
  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const emailUseEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailUseEffectRef.current) {
      const isValid = emailRegex.test(email);
      setValidEmail(isValid);
    }

    return () => {
      emailUseEffectRef.current = true;
    };
  }, [email]);

  /* Password */
  const [pwd, setPwd] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwrdMatch, setPwrdMatch] = useState<boolean>(false);

  const pwdUseEffectRef = useRef<boolean>(false);
  useEffect(() => {
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const testPwrRegex = (pwd: string | undefined) => {
      if (!pwd) return false;
      return pwdRegex.test(pwd);
    };

    const validatePwd = () => {
      if (!pwd) return false;
      return pwd === confirmPwd;
    };

    if (pwdUseEffectRef.current && pwd) {
      const validPwd = testPwrRegex(pwd);
      setValidPwd(validPwd);
      if (!confirmPwd) return;
      const matchPwd = validatePwd();

      setPwrdMatch(matchPwd);
    }

    return () => {
      pwdUseEffectRef.current = true;
    };
  }, [pwd, confirmPwd]);

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
      const userCreds: UserCredential | void = await signUp(email, pwd);
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
        displayName: firstName + " " + lastName,
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
      <div className="side-image">
        <Logo color="#FAF9F6" />
        {/* <video autoPlay loop>
          <source src={underwaterVD} />
          <p>Your browser does not support this video</p>
        </video> */}
      </div>
      <div className="wrap-form">
        <form className="auth-form">
          <div className="form-intro">
            <h2>Sign up</h2>
            <p>Welcome, please enter your details</p>
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
            <label htmlFor="firstname">
              <p>Firstname</p>
              <input
                type="text"
                value={firstName}
                className={firstName && !isNameValid?.first ? "invalid-input" : isNameValid?.first ? "valid-input" : ""}
                required
                onChange={(e) => setFirstName(e.target.value)}
                id="firstname"
                placeholder="enter firstname"
              />
              {firstName && !isNameValid?.first && (
                <div className="error-message flex cg-5">
                  <ErrorSvg size={iconSize} />
                  <p>firstname should be at least 3 characters long</p>
                </div>
              )}
            </label>

            <label htmlFor="lastname">
              <p>Lastname</p>
              <input
                type="text"
                value={lastName}
                className={lastName && !isNameValid?.last ? "invalid-input" : isNameValid?.last ? "valid-input" : ""}
                required
                onChange={(e) => setLastName(e.target.value)}
                id="lastname"
                placeholder="enter lastname"
              />
              {lastName && !isNameValid?.last && (
                <div className="error-message flex cg-5">
                  <ErrorSvg size={iconSize} />
                  <p>lastname should be at least 3 characters long</p>
                </div>
              )}
            </label>
          </div>

          <label htmlFor="email">
            <p>Email</p>
            <input
              type="text"
              id="email"
              className={email && !validEmail ? "invalid-input" : validEmail ? "valid-input" : ""}
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="enter email"
            />
            {email && !validEmail && (
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
                  className={pwd && !validPwd ? "invalid-input" : validPwd ? "valid-input" : ""}
                  value={pwd}
                  required
                  onChange={(e) => {
                    setPwd(e.target.value);
                  }}
                  placeholder="enter password"
                  autoComplete="false"
                  autoCorrect="false"
                />
                <button className="hide-view-icon" onClick={(e) => toggleViewPwd(e)}>
                  <EyeIcon display={viewPwd} />
                </button>
              </div>
              {pwd && !validPwd && (
                <div className="error-message flex cg-5">
                  {/* <ErrorSvg size={iconSize} /> */}
                  <ul>
                    <li>must be at least 8 characters long</li>
                    <li>must contain an upper and lowercase letter</li>
                    <li>must contain a special character</li>
                    <li>must contain a number</li>
                  </ul>
                </div>
              )}
            </label>

            <label htmlFor="confirm-password">
              <p>Confirm</p>
              <div className="password-con">
                <input
                  type={viewPwd ? "text" : "password"}
                  id="confirm-password"
                  className={confirmPwd && !pwrdMatch ? "invalid-input" : pwrdMatch ? "valid-input" : ""}
                  required
                  value={confirmPwd}
                  onChange={(e) => {
                    setConfirmPwd(e.target.value);
                  }}
                  placeholder="re-enter password"
                  autoComplete="false"
                  autoCorrect="false"
                />
                <button className="hide-view-icon" onClick={(e) => toggleViewPwd(e)}>
                  <EyeIcon display={viewPwd} />
                </button>
              </div>
              {confirmPwd && !pwrdMatch && (
                <div className="error-message flex cg-5">
                  <ErrorSvg size={iconSize} />
                  <p>password does not match</p>
                </div>
              )}
            </label>
          </div>

          <button ref={submitButton} className={"submit-form flex cg-10 jc-c"} onClick={(e) => submitForm(e)}>
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
