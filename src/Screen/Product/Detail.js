import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Detail.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Skeleton from 'react-loading-skeleton';

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  console.log(product);
  useEffect(() => {
    document.title = 'Detail';
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <>
      <div id="container-wrapper">
        <NavLink className="text-decoration-none text-dark" to={`/product`}>
          <div className="d-flex align-items-center m-3">
            <ArrowBackIosIcon />
            <span className="ml-1">Back</span>
          </div>
        </NavLink>
        <div id="container">
          <div className="product-details ">
            {isLoading && <p>Loading...</p>}

            <h1>{product.title || <Skeleton />}</h1>
            <span className="hint-star star">
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star-half-o" aria-hidden="true"></i>
              <i className="fa fa-star-o" aria-hidden="true"></i>
            </span>

            <p className="information">
              "{product.description || <Skeleton />}"
            </p>

            <div className="control">
              <button className="btn-buy">
                <span className="price">{product.price || <Skeleton />}</span>
                <span className="shopping-cart">
                  <ShoppingCartIcon />
                </span>
                <span className="buy">Buy Now</span>
              </button>
            </div>
          </div>

          <div className="product-image">
            <img src={product.images || <Skeleton />} alt="avatar" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
