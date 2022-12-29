import { useContext, useEffect } from 'react';
import { AppContext } from '../../Context/AppContext';
import './Cart.css';

const Cart = () => {
  useEffect(() => {
    document.title = 'Cart';
  }, []);

  const { state, dispatch } = useContext(AppContext);
  //   const state = Globalstate.state;
  //   const dispatch = Globalstate.dispatch;

  const total = state.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  return (
    <div className="cart">
      {state.map((item, index) => {
        return (
          <div className="card" key={index}>
            <img src={item.images} alt="" />
            <p>{item.title}</p>
            <p>$ {item.quantity * item.price}</p>
            <div className="quantity">
              <button
                onClick={() => dispatch({ type: 'INCREASE', payload: item })}
              >
                +
              </button>
              <p className="mb-0">{item.quantity}</p>
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    dispatch({ type: 'DECREASE', payload: item });
                  } else {
                    dispatch({ type: 'REMOVE', payload: item });
                  }
                }}
              >
                -
              </button>
            </div>
            <h2
              onClick={() => dispatch({ type: 'REMOVE', payload: item })}
              style={{ cursor: 'pointer' }}
            >
              x
            </h2>
          </div>
        );
      })}
      {state.length > 0 && (
        <div className="total">
          <h2>Total: $ {total}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
