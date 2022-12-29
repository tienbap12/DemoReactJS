import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const handleCheckEmail = (e) => {
    setEmail(e.target.value);
    if (regex.test(email) === false) {
      setError('please enter validate email address');
    } else {
      setError('');
      return true;
    }
  };
  const handleSignup = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      name: fullName,
      email: email,
      password: pwd,
      role: 'customer',
      avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=1957',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.escuelajs.co/api/v1/users/', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (!regex.test(email)) {
          alert('Please enter the correct format ');
        } else {
          alert('Sign up success');
          nav('/login');
        }
      })
      .catch((error) => {
        alert('Error');
      });
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-sm-5">
              <h1 className="text-black mb-4">Sign up account</h1>
              <div
                className="card"
                style={{ borderRadius: '15px', backgroundColor: '#2C3E50' }}
              >
                <div className="card-body">
                  <div className="row align-items-center pt-4 pb-3">
                    <div className="col-md-3 ps-3">
                      <h6 className="mb-0 text-white">Full name</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-3">
                      <h6 className="mb-0 text-white">Email</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder=""
                        onChange={handleCheckEmail}
                      />
                      <p className="text-danger mt-2">{error}</p>
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="row align-items-center py-3">
                    <div className="col-md-3 ps-3">
                      <h6 className="mb-0 text-white">Password</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        onChange={(e) => setPwd(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="mx-n3" />
                  <div className="px-5 py-4 d-flex justify-content-center">
                    <button
                      onClick={handleSignup}
                      type="submit"
                      className="btn btn-lg"
                      style={{ backgroundColor: '#FDD017' }}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
