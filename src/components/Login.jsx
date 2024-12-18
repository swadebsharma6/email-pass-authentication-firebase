import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const auth = getAuth(app);
  const emailRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    //reset error
    setError("");
    setSuccess("");
    // sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log("sign in", user);
        setSuccess("User signIn Successful");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleResetPass = () => {
    const email = emailRef.current.value;
    if(!email){
      console.log("Reset email", emailRef.current.value);
      alert('Please provide a valid email')
      return;
    }

    // validation email
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      console.log('Please check your email');
      alert('Please check your email!')
    })
    .catch(error =>{
      setError(error.message)
    })
   
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-[600px]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl rounded">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleResetPass}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p className=" font-bold text-center py-3">
                New to this Website, please{" "}
                <Link className="text-primary" to="/register">
                  Register
                </Link>
              </p>
            </form>
            {error && (
              <p className=" text-center pb-4 text-error font-bold">{error}</p>
            )}
            {success && (
              <p className=" text-center pb-4 text-primary font-bold">
                {success}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
