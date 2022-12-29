import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles.scss';
// import Login from './../src/Screen/Account/Login';
// import Product from './../src/Screen/Product/Product';
// import Home from './Screen/Home/Home';
// import Profile from './Screen/Account/Profile';
// import Details from './Screen/Product/Details';
// import { useState } from 'react';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Header from './Screen/Header/Header';
import { AppProvider } from './Context/AppContext';
// import Cart from './Screen/Cart/Cart';

function App() {
  return (
    <div>
      <AppProvider>
        <Header />
      </AppProvider>
    </div>
  );
}

export default App;
