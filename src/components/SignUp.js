import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (rest of the code remains unchanged)
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const cardStyle = {
    background: 'hsla(0, 0%, 100%, 0.55)',
    backdropFilter: 'blur(30px)',
  };

  return (
    <div className='container'>
      <section className="text-center text-lg-start">
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right" style={cardStyle}>
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Sign up now</h2>
                  <form onSubmit={handleSubmit}>
  <div className="row">
    <div className="col-md-6 mb-4">
      <div className="form-outline">
        <input
          type="text"
          id="form3Example1"
          className="form-control"
          onChange={handleChange}
          value={credentials.firstName} // Make sure to include value and onChange
        />
        <label className="form-label" htmlFor="form3Example1">First name</label>
      </div>
    </div>
    <div className="col-md-6 mb-4">
      <div className="form-outline">
        <input
          type="text"
          id="form3Example2"
          className="form-control"
          onChange={handleChange}
          value={credentials.lastName} // Make sure to include value and onChange
        />
        <label className="form-label" htmlFor="form3Example2">Last name</label>
      </div>
    </div>
  </div>
  <div className="form-outline mb-4">
    <input
      type="email"
      id="form3Example3"
      className="form-control"
      onChange={handleChange}
      value={credentials.email} // Make sure to include value and onChange
    />
    <label className="form-label" htmlFor="form3Example3">Email address</label>
  </div>
  <div className="form-outline mb-4">
    <input
      type="password"
      id="form3Example4"
      className="form-control"
      onChange={handleChange}
      value={credentials.password} // Make sure to include value and onChange
    />
    <label className="form-label" htmlFor="form3Example4">Password</label>
  </div>
  <div className="form-check d-flex justify-content-center mb-4">
    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
    <label className="form-check-label" htmlFor="form2Example33">
      Subscribe to our newsletter
    </label>
  </div>
  <button type="submit" className="btn btn-primary btn-block mb-4">
    Sign up
  </button>
  <div className="text-black mb-3 mb-md-0 text-center">


ReactPress © 2023. All rights reserved.
</div>
</form>

                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img src="src\assets\signup.jpeg" className="w-100 rounded-4 shadow-4" alt="" style={{height:"800px"}}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
