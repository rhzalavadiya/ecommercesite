import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../feature/cartSlice';

const CheckoutPage = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc' }}>Product</th>
                <th style={{ borderBottom: '1px solid #ccc' }}>Price</th>
                <th style={{ borderBottom: '1px solid #ccc' }}>Qty</th>
                <th style={{ borderBottom: '1px solid #ccc' }}>Total</th>
                <th style={{ borderBottom: '1px solid #ccc' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <button onClick={handleClear}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;  
