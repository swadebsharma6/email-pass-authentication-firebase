import { useContext, useState } from "react";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { AuthContext } from "../Proider/AuthProvider";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    //reset error
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password should be at least 6 character");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Your password should have One Uppercase latter");
      return;
    }

    // create user
    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://i.ibb.co.com/vHvVKW8/IMG-0619.jpg",
        })
          .then(() => console.log("profile updated"))
          .catch();

        // send Verification Email
        // sendEmailVerification(user).then(() => {
        //   alert("Please Check your email and verify your account");
        // });

        console.log("create", user);
        setSuccess("User created Successful");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-[600px] rounded">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
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
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <p className=" font-bold text-center py-3">
                Already have an account, please{" "}
                <Link className="text-primary" to="/login">
                  Login
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

export default Register;
