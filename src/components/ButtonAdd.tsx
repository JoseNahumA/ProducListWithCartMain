import React, { useState, useEffect, useContext } from "react";
import { CartContext, ProductProps } from "../contexts/CartContext";

interface ButtonAddProps {
  id: number;
  name: string;
  category: string;
  price: number;
  thumbnail: string;
}

export const ButtonAdd: React.FC<ButtonAddProps> = ({
  id,
  name,
  category,
  price,
  thumbnail,
}) => {
  const context = useContext(CartContext);
  if (!context) throw new Error("ButtonAdd must be used within a CartProvider");

  const [cart, setCart] = context;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = cart.find((product) => product.id === id);
    setQuantity(item ? item.quantity : 0);
  }, [cart, id]);

  useEffect(() => {
    const cartIndex = cart.findIndex((product) => product.id === id);
    const updatedCart = [...cart];

    if (quantity > 0) {
      const newItem: ProductProps = {
        id,
        name,
        category,
        price,
        quantity,
        thumbnail,
      };
      if (cartIndex !== -1) {
        updatedCart[cartIndex] = newItem;
      } else {
        updatedCart.push(newItem);
      }
    } else {
      if (cartIndex !== -1) {
        updatedCart.splice(cartIndex, 1);
      }
    }
    setCart(updatedCart);
  }, [quantity]);

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() => setQuantity(quantity + 1)}
        className="btn btn-light rounded-pill btn-sm d-flex align-items-center px-3 py-2 shadow-sm"
        style={{
          border: "2px solidrgb(202, 120, 25)", 
          width: 150,
          position: "absolute",
          bottom: -18,
          left: "50%",
          right: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          cursor: "pointer",
          color: "#003366", 
        }}
      >
        <img
          src="/assets/images/icon-add-to-cart.svg"
          alt="Add to cart"
          className="me-2"
          style={{ width: 16 }}
        />
        <div className="fw-bold">Add to cart</div>
      </button>
    );
  }

  return (
    <div
      className="rounded-pill btn-sm d-flex align-items-center justify-content-between px-3 py-2 shadow-sm"
      style={{
        backgroundColor: "hsl(14, 86%, 42%)", 
        width: 150,
        position: "absolute",
        bottom: -18,
        left: "20%",
        zIndex: 2,
      }}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className="btn-outline-light rounded-circle"
        style={{
          border: "2px solidrgb(180, 109, 15)", 
          fontSize: 10,
          cursor: "pointer",
          backgroundColor: "hsl(13, 31%, 94%)",
          color: "#aad8ff",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 6,
          paddingRight: 6,
        }}
        onClick={() => setQuantity(quantity - 1)}
      >
        <img
          src="/assets/images/icon-decrement-quantity.svg"
          alt="Remove"
          className="addRestButtonsImages"
          style={{ width: 8, filter: "invert(83%) sepia(14%) saturate(654%) hue-rotate(170deg) brightness(108%) contrast(97%)" }}
        />
      </button>
      <div
        style={{
          fontSize: 16,
          minWidth: 24,
          textAlign: "center",
          color: "#aad8ff",
          fontWeight: "700",
          userSelect: "none",
        }}
      >
        {quantity}
      </div>
      <button
        type="button"
        aria-label="Increase quantity"
        className="btn-outline-light rounded-circle"
        style={{
          fontSize: 10,
          cursor: "pointer",
          backgroundColor: "hsl(13, 31%, 94%)",
          color: "#aad8ff",
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 6,
          paddingRight: 6,
        }}
        onClick={() => setQuantity(quantity + 1)}
      >
        <img
          src="/assets/images/icon-increment-quantity.svg"
          alt="Add"
          className="addRestButtons"
          style={{ width: 8, filter: "invert(73%) sepia(14%) saturate(654%) hue-rotate(170deg) brightness(108%) contrast(97%)" }}
        />
      </button>
    </div>
  );
};