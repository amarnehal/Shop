import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeItem,
  removeAllItems,
  totalPrice,
  updateQuantity,
} from "../store/features/cartSlice";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { items, quantity, total } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("cart", total);
  useEffect(() => {
    // Check if the user is logged in
    if (auth?.status === true) {
      if (items?.length > 0) {
        setCartItems(items);
        dispatch(totalPrice());
      } else {
        alert("Cart is empty");
      }
    } else {
      alert("Please log in to view your cart.");
      navigate("/login");
    }
  }, [dispatch, auth.status, items, navigate]);

  function handleQuantityChange(productId, newQuantity) {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
    dispatch(totalPrice());
  }

  console.log("cartItems", cartItems);
  return (
    <>
      {quantity > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>

          {cartItems.map((product) => (
            <div
              key={product.id}
              className="border-b border-gray-200 py-4 flex flex-col md:flex-row items-center"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 rounded-md mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-700">
                  Price: ${product.price.toFixed(2)}
                </p>
                <label className="text-md text-orange-600">Qunatity :</label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={4}
                  value={product.quantity}
                  placeholder={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                />
                {product.quantity >= 4 && <p>Maximum quantity reached</p>}
              </div>
              <button
                className="text-sm bg-red-500 text-white mt-2 md:ml-4 px-4 rounded-md mb-2 md:mb-0 md:mr-2"
                onClick={(e) => dispatch(removeItem(product.id))}
              >
                Remove from Cart
              </button>
            </div>
          ))}
          <div className="mt-4 flex flex-col md:flex-row items-center">
            <button className="bg-orange-600 text-white py-2 px-4 rounded-md mb-2 md:mb-0 md:mr-2">
              Buy Now
            </button>
            <button
              className="bg-gray-600 text-white py-2 px-4 rounded-md"
              onClick={() => dispatch(removeAllItems())}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold">Total Price:${total}</p>
          </div>
        </div>
      ) : (
        <h1>Your cart is empty</h1>
      )}
    </>
  );
};

export default Cart;
