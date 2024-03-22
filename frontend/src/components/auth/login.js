import React, { useState } from 'react'
import Register from './register';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regRedirect, setRegRedirect] = useState(false);
  const [formErrors, setFormErrors] = useState("")

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let error;
    switch (name) {
      case "email":
        error = emailRegex.test(value) ? "" : "Invalid email address";
        break;
      case "password":
        error = value.length < 6 ? "Invalid password" : "";
        break;
      default:
        break;
    }
    setFormErrors({ [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/login`, {
      email,
      password
    }).then(
      (res) => {
        
          try {
            if (res) {
              console.log('User logged in successfully');
            }
            
          } catch (error) {
            console.log(error);
          }

          // if (res.data.error) {
          //   setMessage(res.data.error);
          // }
      },
    );
  }

  return (
    <div className="authform img">
      <section class="ftco-section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-6 text-center mb-5">
              {/* <h2 class="heading-section">Login #10</h2> */}
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-6 col-lg-4">
              <div class="login-wrap p-0">
                <h3 class="mb-4 text-center">Have an account?</h3>
                <form action="#" class="signin-form">
                  <div class="form-group">
                    <input type="text" value={email} class="form-control" placeholder="Username" required onChange={(e) => {
                      handleChange(e);
                      setEmail(e.target.email)}}/>
                  </div>
                  <div class="form-group">
                    <input id="password-field" value={password} type="password" class="form-control" placeholder="Password" onChange={(e) => {
                      handleChange(e);
                      setPassword(e.target.password)}} required/>
                      <span toggle="#password-field" ></span>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="form-control btn btn-primary submit px-3" onClick={(e) => handleSubmit(e)}>Sign In</button>
                  </div>
                  <div class="form-group d-md-flex">
                    <div class="w-50">
                      {/* <label class="checkbox-wrap checkbox-primary">Remember Me
                        <input type="checkbox" checked/>
                          <span class="checkmark"></span>
                      </label> */}
                      <Link to="/register" style={{color: "#fff"}}>Register</Link>
                    </div>
                    <div class="w-50 text-md-right">
                      <a href="#" id="forgot-pass" style={{color: "#fff"}}>Forgot Password</a>
                    </div>
                  </div>
                </form>
                {/* <p class="w-100 text-center">&mdash; Or Sign In With &mdash;</p> */}
                <div class="social d-flex text-center">
                  {/* <a href="#" class="px-2 py-2 mr-md-1 rounded"><span class="ion-logo-facebook mr-2"></span> Facebook</a>
                  <a href="#" class="px-2 py-2 ml-md-1 rounded"><span class="ion-logo-twitter mr-2"></span> Twitter</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login