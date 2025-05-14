import React, { useContext, useState } from "react";
import { CartContext, ProductProps } from "../contexts/CartContext";

const Cart: React.FC = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart must be used within a CartProvider");

  const [cart, setCart] = context;
  const [showConfirmPanel, setShowConfirmPanel] = useState(false);
  const [showThankYouPanel, setShowThankYouPanel] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPayment = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setShowConfirmPanel(true);
  };

  const handlePurchaseDone = () => {
    setShowConfirmPanel(false);
    setShowThankYouPanel(true);
    setCart([]);
  };

  const handleCloseThankYou = () => {
    setShowThankYouPanel(false);
  };

  if (showThankYouPanel) {
    return (
      <div
        className="bg-white p-3 rounded"
        style={{ width: "20rem", minHeight: "150px" }}
      >
        <h5 className="title mb-3 text-success">Purchase Complete!</h5>
        <p>Thank you for your purchase.</p>
        <button
          type="button"
          className="btn btn-primary mt-3 w-100"
          onClick={handleCloseThankYou}
        >
          Close
        </button>
      </div>
    );
  }

  if (showConfirmPanel) {
    return (
      <div className="bg-white p-3 rounded" style={{ width: "20rem" }}>
        <h5 className="title mb-3 text-danger">Confirm Your Order</h5>
        <ul className="list-group mb-3">
          {cart.map((item: ProductProps) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  style={{ width: 50, marginRight: 10, borderRadius: 8 }}
                />
                <div>
                  <div className="fw-bold" style={{ fontSize: 16 }}>
                    {item.name}
                  </div>
                  <div className="text-muted">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>
              <div>${(item.quantity * item.price).toFixed(2)}</div>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong>Total:</strong>
          <strong>${totalPayment.toFixed(2)}</strong>
        </div>
        <button
          className="btn btn-danger w-100 mb-2"
          onClick={handlePurchaseDone}
        >
          Confirm Purchase
        </button>
        <button
          className="btn btn-secondary w-100"
          onClick={() => setShowConfirmPanel(false)}
        >
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded" style={{ width: "20rem" }}>
      <h5 className="title mb-3 text-danger">
        Your Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
      </h5>
      {cart.length === 0 ? (
        <div className="text-center text-secondary">
          <img
            className="w-50 mb-3"
            src="/assets/images/illustration-empty-cart.svg"
            alt="Empty cart"
          />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item: ProductProps) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-bold">{item.name}</div>
                  <div >{item.quantity}x</div>{" "}
                  <div className="text-secondary">${item.price.toFixed(2)}</div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="btn btn-outline-secondary rounded-circle p-1"
                    style={{ width: 30, height: 30 }}
                    aria-label={`Remove ${item.name}`}
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>Total Price:</div>
            <h4>${totalPayment.toFixed(2)}</h4>
          </div>
          <button className="btn btn-danger w-100" onClick={handleConfirm}>
            Confirm Purchase
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;