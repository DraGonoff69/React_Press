import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" });
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        // Handle non-2xx status codes
        throw new Error('Failed to create user');

      }

      const json = await response.json();
      if (json.success) {
        document.cookie = `auth_token=${json.authtoken}`;

        navigate('/Login');
      } else {
        // Handle other scenarios where the response is successful but the user creation failed
        throw new Error(json.message || 'User creation failed');
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
      // You can set an error state here to display an error message to the user
    }
  };

  const handleInputChange = (e, field) => {
    setCredentials({
      ...credentials,
      [field]: e.target.value,
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
                  <img src="/vite.svg" alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                  <h2 className="fw-bold mb-5">Sign up now</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            onChange={(e) => handleInputChange(e, 'name')}
                            value={credentials.name}
                            name='name' // Make sure to include value and onChange
                            style={{ padding: '25px' }}
                            defaultChecked
                          />
                          <label className="form-label" htmlFor="form3Example1">Name</label>
                        </div>
                      </div>

                    </div>
                    <div className="form-outline mb-4">
                    <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            onChange={(e) => handleInputChange(e, 'email')}
                            value={credentials.email}
                            name='name' // Make sure to include value and onChange
                            style={{ padding: '25px' }}
                            defaultChecked
                          />
                      <label className="form-label" htmlFor="form3Example3">Email</label>
                    </div>
                    <div className="form-outline mb-4">
                    <input
                            type="text"
                            id="form3Example1"
                            className="form-control"
                            onChange={(e) => handleInputChange(e, 'password')}
                            value={credentials.password}
                            name='name' // Make sure to include value and onChange
                            style={{ padding: '25px' }}
                            defaultChecked
                          />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
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
              <img src="src\assets\signup.jpeg" className="w-100 rounded-4 shadow-4" alt="" style={{ height: "800px" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
