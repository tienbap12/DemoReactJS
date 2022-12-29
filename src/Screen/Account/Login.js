import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem('access_token') != null
  );
  const nav = useNavigate();
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  useEffect(() => {
    document.title = 'Login';
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
  const handleSubmit = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
      password: pwd,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.escuelajs.co/api/v1/auth/login', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status);
      })
      .then((result) => {
        localStorage.setItem('access_token', result.access_token);
        setIsLogin(true);
        nav('/profile');
        window.location.reload(true);
      })
      .catch((error) => {
        console.log('error', error);
        alert('Email, password are wrong');
      });
  };

  const handleRegister = () => {
    nav('/register');
  };

  return (
    <>
      <div className="loginContainer d-flex justify-content-center">
        {isLogin ? (
          <Profile key={isLogin} />
        ) : (
          <div
            className="d-flex justify-content-center  text-white  mt-2 p-5 rounded"
            style={{ width: 400, backgroundColor: '#2C3E50' }}
          >
            <div>
              <form>
                <h2 className="text-center pb-3">Login</h2>
                <div className="form-outline mb-4">
                  <p className="text-danger">{error}</p>
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    onChange={handleCheckEmail}
                    className="form-control"
                    required
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    className="form-control"
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-block mb-4"
                  style={{ backgroundColor: '#FDD017' }}
                >
                  Sign in
                </button>

                <div className="text-center">
                  <p>
                    Not a member?{' '}
                    <a href="#!" onClick={handleRegister}>
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
