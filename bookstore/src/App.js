import React, { createContext, useState } from "react";
import NavBar from "./component/NavBar";
import Books from "./component/Books";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);

  const increaseQuantity = (id) => {
    const newCartItems = cartItems.map((item) => {
      if (item.stock === item.quantity) {
        toast("out of stock");
      }

      if (item.id === id && item.quantity < item.stock) item.quantity++;
      return item;
    });
    setCartItems(newCartItems);
  };

  const decreaseQuantity = (id) => {
    const newCartItems = cartItems.map((item) => {
      if (item.quantity < 0) return;
      if (item.id === id) item.quantity--;
      return item;
    });
    setCartItems(newCartItems);
  };

  const addBookToCart = (book) => {
    if (cartItems.length > 5) {
      toast("Limit exceeded", {
        type: "error",
        position: "bottom-right",
      });
      return;
    }

    const existingBook = cartItems.find((item) => item.id === book.id);
    if (existingBook) {
      const newCartItems = cartItems.map((item) => {
        if (item.id === existingBook.id) item.quantity++;
        return item;
      });
      setCartItems(newCartItems);
      return;
    }
    setCartItems([...cartItems, book]);
  };

  return (
    <div className="App">
      <ToastContainer />
      <CartContext.Provider
        value={{ addBookToCart, cartItems, increaseQuantity, decreaseQuantity }}
      >
        <NavBar />
        <Books />
      </CartContext.Provider>
    </div>
  );
}
export default App;
