import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Sub Question 1: Tính tổng số tiền toàn bộ giỏ hàng
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.quantity * parseFloat(item.cost.substring(1))), 0);
  };

  // Sub Question 8: Nút Continue Shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Sub Question 4: Tăng số lượng (+)
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Sub Question 5: Giảm số lượng (-)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
        dispatch(removeItem(item.name));
    }
  };

  // Sub Question 6: Xóa mục (Delete)
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Sub Question 2: Tính tổng tiền cho từng loại item (Price * Quantity)
  const calculateTotalCost = (item) => {
    return item.quantity * parseFloat(item.cost.substring(1));
  };

  // Sub Question 7: Nút Checkout
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            {/* Sub Question 3: Hiển thị ảnh, tên, giá */}
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Unit Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="continue_shopping_btn">
        <button onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <button onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
