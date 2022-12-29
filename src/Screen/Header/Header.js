import { Routes, Route, Link } from 'react-router-dom';

import '../../styles.scss';
import Login from '../Account/Login';
import Product from '../../Screen/Product/Product';
import Home from '../../Screen/Home/Home';
import Profile from '../Account/Profile';
import Details from '../../Screen/Product/Detail';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '../Cart/Cart';
import Register from '../Account/Register';

function Header(props) {
  const [token, setToken] = useState(
    localStorage.getItem('access_token') != null
  );
  return (
    <div>
      <div className="main">
        <div className="header">
          <Link className="header-link" to="/">
            <div className="header-logo">
              <img
                src="https://w.ladicdn.com/s550x400/61c42fca28a08200129130c5/logo_zeno_banner-20221018135739-u33mx.png"
                alt=""
                className="logo"
              />
            </div>
          </Link>

          <ul className="header-list">
            <li className="header-item">
              <Link className="header-link" to="/">
                Home
              </Link>
            </li>
            <li className="header-item">
              <Link className="header-link" to="/product">
                Product
              </Link>
            </li>
            {token ? (
              <li className="header-item">
                <Link className="header-link" to="/profile">
                  Profile
                </Link>
              </li>
            ) : (
              <li className="header-item">
                <Link className="header-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            <li className="header-item">
              <Link className="header-link header-cart" to="/cart">
                <ShoppingCartIcon />
                {/* <span>0</span> */}
              </Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/product/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default Header;
