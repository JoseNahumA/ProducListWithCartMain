import React, { createContext, useState, useContext, ReactNode } from "react";

export interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export type CartContextType = [
  ProductProps[],
  React.Dispatch<React.SetStateAction<ProductProps[]>>
];

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductProps[]>([]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used within a CartProvider");
  return context;
};