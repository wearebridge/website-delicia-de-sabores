'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type DeliveryFeeType = {
  whatsapp: number;
  globalType: string;
  createdAt: string;
  updatedAt: string;
  fee: number;
  minPrice: number;
  id: string;
};

type CartContextType = {
  cart: any[];
  addItemToCart: (item: any) => void;
  removeItemFromCart: (index: number) => void;
  clearCart: () => void;
  cartQuantity: number;
  totalPrice: number;
  totalProductsPrice: number;
  deliveryFee: number;
};

export const CartContext = createContext<CartContextType | null>(null);

type CartProviderProps = {
  children: React.ReactNode;
};

export default function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<any[]>([]);
  const [deliveryFeeData, setDeliveryFeeData] = useState<DeliveryFeeType | null>(null);

  // Chama a função fetchDeliveryFee e armazena a taxa de entrega
  useEffect(() => {
    const fetchFee = async () => {
      const result = await fetch ('/api/globals/deliveryFee');
      const data = await result.json();
      setDeliveryFeeData(data);
    };
    fetchFee();
  }, []);

  // Carrega o carrinho da sessionStorage quando o componente é montado
  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Atualiza o sessionStorage sempre que o carrinho muda
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item: any) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItemFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartQuantity = cart.length;

  // Calcula o valor total dos produtos no carrinho
  const totalProductsPrice = cart.reduce(
    (acc, item) => acc + item.productSelect.totalProductsPrice,
    0
  );

  // Calcula a taxa de entrega com base no total dos produtos
  const deliveryFee = deliveryFeeData && totalProductsPrice < deliveryFeeData.minPrice
    ? deliveryFeeData.fee
    : 0;

  // Valor total do pedido, incluindo a taxa de entrega
  const totalPrice = totalProductsPrice + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        cartQuantity,
        totalPrice,
        totalProductsPrice,
        deliveryFee
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
