import { create } from "zustand";
import { CartItem } from "../types";

interface BasketState {
  items: CartItem[];
  addItemQuantity: (item: CartItem) => void;
  removeItemQuantity: (id: number) => void;
  deleteItem: (id: number) => void;
}

const useBasketStore = create<BasketState>((set) => ({
  items: [],
  addItemQuantity: (item) => {
    set((state) => {
      const itemIndex = state.items.findIndex((prod) => prod.id === item.id);
      const existingItems = [...state.items];

      if (itemIndex > -1) {
        const updatedItem: CartItem = {
          ...state.items[itemIndex],
          quantity: state.items[itemIndex].quantity + 1,
        };
        existingItems[itemIndex] = updatedItem;
      } else {
        existingItems.push(item);
      }

      return { ...state, items: existingItems };
    });
  },
  removeItemQuantity: (id) => {
    set((state) => {
      const itemIndex = state.items.findIndex((prod) => prod.id === id);
      const existingItems = [...state.items];

      if (itemIndex > -1) {
        const itemQty = state.items[itemIndex].quantity;

        if (itemQty === 1) {
          existingItems.splice(itemIndex, 1);
        } else {
          const updatedItem: CartItem = {
            ...state.items[itemIndex],
            quantity: itemQty - 1,
          };
          existingItems[itemIndex] = updatedItem;
        }
      }

      return { ...state, items: existingItems };
    });
  },
  deleteItem: (id) => {
    set((state) => {
      const itemIndex = state.items.findIndex((prod) => prod.id === id);
      const existingItems = [...state.items];

      if (itemIndex > -1) {
        existingItems.splice(itemIndex, 1);
      }

      return { ...state, items: existingItems };
    });
  },
}));

export default useBasketStore;
