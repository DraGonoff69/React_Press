import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className='container'>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-flex align-items-center justify-content-center">
                    <img
                      src="src\assets\login.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '1rem' }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form onSubmit={handleSubmit}>

                        <div className="d-flex align-items-center mb-3 pb-1">

                          <span className="h1 fw-bold mb-0">Login</span>
                          <img src="/vite.svg"
                            alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={credentials.email}
                            onChange={handleChange}
                            name='email'
                          />
                          <label className="form-label" htmlFor="form2Example17">Email address</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={credentials.password}
                            onChange={handleChange}
                            name='password'
                          />
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                        </div>

                        <a className="small text-muted" href="/">Forgot password?</a>
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="/"
                          style={{ color: '#393f81' }}>Register here</a></p>
                        <div className="text-black mb-3 mb-md-0 text-center">


                          ReactPress © 2023. All rights reserved.
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Login;
