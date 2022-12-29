import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import '../../styles.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppContext } from '../../Context/AppContext';

const Product = (props) => {
  const [products, setProduct] = useState([]);
  const [filter, setFilter] = useState(products);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const Globalstate = useContext(AppContext);
  const dispatch = Globalstate.dispatch;

  useEffect(() => {
    document.title = 'Products';
    filterResult();
    getAllProduct();
  }, [offset, limit]);

  const getAllProduct = () => {
    setTimeout(() => {
      return axios
        .get(
          `https://api.escuelajs.co/api/v1/products/?offset=${offset}&limit=${limit}`
        )
        .then((res) => {
          setFilter(res.data);
          setProduct(res.data);
          setTotalCount(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 100);
  };

  function handlePrevPage() {
    if (offset === 0) {
      document.querySelector('#prev-btn').disable = true;
    } else {
      setIsLoading(true);
      setOffset(offset - limit);
    }
  }

  function handleNextPage() {
    if (Math.ceil(offset / limit) > totalCount) {
      document.querySelector('#next-btn').disable = true;
    }
    setIsLoading(true);
    setOffset(offset + limit);
    console.log(offset);
  }

  const filterResult = (catItem) => {
    const result = products.filter((curData) => {
      return curData.category.name === catItem;
    });
    setFilter(result);
    setProduct(products);
  };

  return (
    <div className="product-wrapper">
      <div className="search-container">
        <div className="search-wrapper">
          <div className="search-icon">
            <SearchIcon style={{ fill: '#aaa' }} />
            {/* <button>Search</button> */}
          </div>
          <input
            type="text"
            name=""
            id=""
            className="search-input"
            placeholder="Tìm kiếm sản phẩm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="filter-container">
        <div
          className="filter-list d-flex justify-content-around flex-column
        "
        >
          <button
            style={{ backgroundColor: '#FDD017' }}
            className="btn w-100"
            onClick={() => setFilter(products)}
          >
            All
          </button>
          <button
            style={{ backgroundColor: '#FDD017' }}
            className="btn w-100"
            onClick={() => filterResult('Shoes')}
          >
            Shoes
          </button>
          <button
            style={{ backgroundColor: '#FDD017' }}
            className="btn w-100"
            onClick={() => filterResult('Clothes')}
          >
            Clothes
          </button>
          <button
            style={{ backgroundColor: '#FDD017' }}
            className="btn w-100"
            onClick={() => filterResult('Electronics')}
          >
            Electronics
          </button>
          <button
            style={{ backgroundColor: '#FDD017' }}
            className="btn w-100"
            onClick={() => filterResult('Furniture')}
          >
            Furniture
          </button>
          <button
            style={{ backgroundColor: '#FDD017' }}
            className="btn w-100"
            onClick={() => filterResult('Others')}
          >
            Others
          </button>
        </div>
      </div>
      <div className="container-product">
        <div className="product-list">
          {isLoading ? (
            <>
              <div className="product-item">
                <Skeleton circle={true} height={50} width={50} />
                <div className="card-body">
                  <h5 className="card-title card-titles">
                    <Skeleton count={1} width="100px" />
                  </h5>
                  <p className="card-text">
                    <Skeleton />
                  </p>
                  <div className="btn-cart">
                    {/* <button className="btn btn-sm mt-3 border-primary">
                      <Skeleton width={50} />
                    </button> */}

                    <button className="btn btn-sm btn-add mt-3 border-primary">
                      <Skeleton />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            filter
              .filter((product) =>
                product.title.toLowerCase().includes(searchTerm)
              )
              .map((product, index) => {
                product.quantity = 1;
                return (
                  <div key={index} className="card product-item mb-3">
                    <img src={product.images} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title card-titles">
                        {product.title}
                      </h5>
                      <p>{product.category.name}</p>
                      <p className="card-text">{product.description}</p>
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-sm mt-3 border-primary">
                          <Link to={`/product/${product.id}`}>Detail</Link>
                        </button>
                      </div>
                    </div>
                    <div className="btn-cart">
                      <button
                        className="btn btn-sm btn-add mt-3 border-primary"
                        onClick={() => {
                          dispatch({ type: 'ADD', payload: product });
                          localStorage.setItem('Cart', JSON.stringify(product));
                        }}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
        {isLoading ? (
          <div></div>
        ) : (
          <div className="pagination-container">
            <button className="prev-btn" onClick={handlePrevPage}>
              Prev
            </button>
            <button className="next-btn" onClick={handleNextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
