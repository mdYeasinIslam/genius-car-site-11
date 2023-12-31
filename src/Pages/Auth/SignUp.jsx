import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
const SignUp = () => {
  const { user, signUpAuth,googleAuth} = useContext(AuthContext);
  // console.log(auth)
  const navigate = useNavigate()
  const inputHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signUp(email, password);
    form.reset();
  };
  const signUp = (email, password) => {
    signUpAuth(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user)
        //-----------------------
        const currentUser = {
          email: user.email
        }
         //jwt 
         fetch(
          "https://genius-car-server-gs9xl9af4-mdyeasinislam.vercel.app/jwt",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("jwt-token", data.token);
            toast('Your registation is complete....')
            navigate('/home')
          });
        //-----------------------
       
        
      })
      .catch((e) => console.error(e));
  };
  const google =() =>{
    googleAuth()
    .then(result =>{
        const user = result.user
        // console.log(user)
        //jwt 
        const currentUser ={
          email: user.email
        }
        fetch(
          "https://genius-car-server-gs9xl9af4-mdyeasinislam.vercel.app/jwt",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("jwt-token", data.token);
            toast('You are successfully loged in by Google')
            navigate('/home')
          });
        //-----------------------
        
        
    })
    .catch(e =>console.error(e))
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content md:w-full mx-auto flex-col lg:flex-row-reverse">
        <div className="text-center ">
          <img className="w-[90%]" src={logo} alt="" />
        </div>
        <div className="card flex-shrink-0  md:w-1/2 mx-auto max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Resigter now.....
          </h1>
          <form onSubmit={inputHandler} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
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
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          <p className="mt-0">
            Already have an account <Link to="/logIn">Please Login</Link>
          </p>
          <button onClick={google} className="btn w-full">Login with Google<FcGoogle className=" inline-block w-6 h-6"/></button> 
        </div>
      </div>
    </div>
  );
};

export default SignUp;
