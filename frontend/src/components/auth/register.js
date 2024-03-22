import React, { useState } from 'react'
import Login from './login';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinRedirect, setsigninRedirect] = useState(false)

  const loginRedirect = () => {

  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3001/signup`, {
      email,
      password
    }).then(
      (res) => {

        try {
          if (res) {
            console.log('User registered successfully');
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
                    <input onChange={handleEmailChange} type="text" value={email} class="form-control" placeholder="Username" required />
                  </div>
                  <div class="form-group">
                    <input onChange={handlePasswordChange} id="password-field" value={password} type="password" class="form-control" placeholder="Password" required />
                    <span toggle="#password-field" ></span>
                  </div>
                  <div class="form-group">
                    <button type="submit" class="form-control btn btn-primary submit px-3" onClick={(e) => handleSubmit(e)}>Sign Up</button>
                  </div>
                  <div class="form-group d-md-flex" id="auth-bottom">
                    <div class="w-50">
                      {/* <label class="checkbox-wrap checkbox-primary">Remember Me
                        <input type="checkbox" checked/>
                          <span class="checkmark"></span>
                      </label> */}
                      <Link to="/login" style={{ color: "#fff" }}>Sign In</Link>
                    </div>
                    <div class="w-50 text-md-right" id="forgot-pass">
                      <a href="#" style={{ color: "#fff" }}>Forgot Password</a>
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

export default Register