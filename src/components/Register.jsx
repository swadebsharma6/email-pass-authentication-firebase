import { useState } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


const Register = () => {
  const [error, setError] = useState('');
  const [success, setSuccess]= useState('');

  const auth = getAuth(app);

      const handleRegister = (e)=>{
            e.preventDefault();
            const form = e.target;
            const name = form.name.value;
            const email = form.email.value;
            const password = form.password.value;
            
            if (password.length < 6){
              setError('Password should be at least 6 character')
              return;
            }

            //reset error
            setError('');
            setSuccess('');
          // create user
          createUserWithEmailAndPassword(auth, email, password)
          .then(result =>{
            const user = result.user;
            console.log('create', user);
            setSuccess('User created Successful')
          })
          .catch(error =>{
            console.log(error.message);
            setError(error.message);
          })
      }

      return (
            <>
             <div className="hero bg-base-200 min-h-[600px] rounded">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit ={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">Register</button>
        </div>
      </form>
      {
        error && <p className=" text-center pb-4 text-error font-bold">{error}</p>
      }
      {
        success && <p className=" text-center pb-4 text-primary font-bold">{success}</p>
      }
    </div>
  </div>
</div>    
            </>
      );
};

export default Register;