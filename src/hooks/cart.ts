import { useEffect, useState } from "react";
import db from "../utils/sqlite";

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    db.execAsync(
      `
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        productId TEXT UNIQUE,
        title TEXT,
        price REAL,
        thumbnail TEXT,
        quantity INTEGER
      );
    `
    ).then(fetchItems);
  }, []);

  const fetchItems = async () => {
    const result = await db.getAllAsync<CartItem>("SELECT * FROM cart;");
    setItems(result);
  };

  const addToCart = async (item: CartItem) => {
    try {
      const { productId, title, price, thumbnail, quantity } = item;
      await db.runAsync(
        `INSERT INTO cart (productId, title, price, thumbnail, quantity)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(productId) DO UPDATE SET quantity = quantity + ?;`,
        [productId, title, price, thumbnail, quantity, quantity]
      );

      fetchItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    await db.runAsync(`UPDATE cart SET quantity = ? WHERE productId = ?;`, [
      quantity,
      productId,
    ]);
    fetchItems();
  };

  const removeFromCart = async (productId: string) => {
    await db.runAsync(`DELETE FROM cart WHERE productId = ?;`, [productId]);
    fetchItems();
  };

  const clearCart = async () => {
    await db.runAsync(`DELETE FROM cart;`);
    fetchItems();
  };

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refresh: fetchItems,
  };
};
