import React, { useEffect, useState } from 'react';
// import './Login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Profile() {
  const [user, setUser] = useState('');
  const AuthStr = 'Bearer ' + localStorage.getItem('access_token');
  // const [isLoading, setIsLoading] = useState(loadDataProfile() == null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  useEffect(() => {
    document.title = 'Profile';
    axios
      .get('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          Authorization: AuthStr,
        },
      })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    alert('logout success');
    nav('/login');
    window.location.reload(true);
  };

  return (
    <div>
      <section
        style={{ backgroundColor: '#fff' }}
        className="profile-container"
      >
        <div className="container py-5">
          <h3>User Profile</h3>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center ">
                  <img
                    src={user.avatar || <Skeleton />}
                    alt=""
                    className=" "
                    style={{ width: 200, borderRadius: '20px', marginLeft: 80 }}
                  />
                  <div className="d-flex justify-content-center mb-2 mt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="logout btn-primary btn"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.name || <Skeleton />}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.email || <Skeleton />}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Role</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {user.role || <Skeleton />}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
